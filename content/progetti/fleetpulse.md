---
title: "FleetPulse"
date: "2026-08-17"
highlight: true
periodo: "Lug 2026 — in corso"
periodo_totale: "Luglio 2026 — in corso"
descrizione: "Piattaforma distribuita per acquisire, elaborare e consultare la telemetria sintetica di una flotta di veicoli."
competenze:
  - "Java 21"
  - "Spring Boot"
  - "TCP/IP"
  - "Virtual Threads"
  - "Apache Kafka"
  - "PostgreSQL"
  - "Flyway"
  - "Testcontainers"
  - "Docker Compose"
slug: "fleetpulse"
highlights:
  - "Protocollo TCP length-prefixed e connessioni persistenti"
  - "Gateway concorrente con virtual threads, backpressure, timeout e graceful shutdown"
  - "Pipeline asincrona Kafka con ACK confermati dal broker"
  - "Processor con persistenza idempotente, retry e dead-letter topic"
  - "Test d'integrazione del flusso TCP → Kafka → PostgreSQL"
---

FleetPulse è un progetto personale che uso per approfondire **sviluppo backend, networking, concorrenza e sistemi distribuiti**. Simula la raccolta della telemetria di una flotta di veicoli, senza utilizzare dati reali o protocolli automotive proprietari.

Nel repository pubblico raccolgo il codice, le scelte architetturali, i contratti tra i servizi e i relativi test.

## Architettura

FleetPulse è diviso in servizi con responsabilità diverse. Il gateway si occupa delle connessioni TCP, Kafka fa da coda tra acquisizione ed elaborazione, il processor applica le regole e aggiorna i dati, mentre Fleet API è il punto di accesso per dashboard e client esterni.

Nel diagramma è rappresentato il progetto completo. Le frecce continue indicano le parti già implementate, quelle tratteggiate ciò che deve ancora essere completato.

![Architettura e flusso applicativo di FleetPulse](/diagrams/fleetpulse-architecture.svg)

**PostgreSQL** conserva veicoli, storico della telemetria e alert. **Redis** mantiene invece l'ultima rilevazione di ogni veicolo, così da rendere più veloce la consultazione dello stato corrente. Se Redis non è disponibile, Fleet API può ricostruire la risposta partendo dallo storico in PostgreSQL.

## Protocollo TCP

Il protocollo applicativo utilizza framing **length-prefixed**:

```text
4 byte payload length, big-endian
+
JSON UTF-8 payload
```

La libreria condivisa `tcp-protocol` contiene il framing e le costanti usate sia dal gateway sia dal simulator.

Il gateway mantiene connessioni persistenti e gestisce più client in parallelo tramite **virtual threads**. Un `Semaphore` limita il numero di connessioni attive; sono presenti anche timeout di lettura e arresto controllato delle connessioni ancora aperte.

Dopo la validazione, il gateway converte il messaggio in un `TelemetryEvent` e lo pubblica su Kafka usando l'ID del veicolo come chiave. In questo modo gli eventi dello stesso veicolo restano ordinati. Il gateway invia l'ACK `ACCEPTED` solo dopo la conferma del broker; in caso di timeout o errore di pubblicazione invia invece un NACK. La lettura degli ACK da parte del simulator non è ancora collegata al suo ciclo di invio.

## Fleet API

La Fleet API espone le operazioni REST di gestione della flotta e utilizza **Spring Boot, JPA/Hibernate, PostgreSQL e Flyway**.

Le richieste vengono validate e gli errori applicativi o di database restituiscono risposte coerenti. I vincoli principali sono applicati anche a livello di schema.

## Vehicle Simulator

Il simulator è un'applicazione Spring Boot senza server web. Crea e recupera i veicoli tramite Fleet API, senza accedere direttamente al database.

I veicoli usano codici prevedibili, da `FP-SIM-001` in poi. A ogni avvio il simulator recupera quelli già presenti e crea solo quelli mancanti; gestisce anche il caso in cui due istanze provino a creare lo stesso veicolo contemporaneamente.

Ogni veicolo mantiene il proprio stato e genera campioni con profilo `NORMAL`, numero di sequenza crescente e ID univoco. La connessione TCP resta aperta tra un invio e l'altro e, se cade, il client prova a ristabilirla aumentando gradualmente l'attesa tra i tentativi.

## Telemetry Processor

Il processor legge gli eventi da `telemetry.raw.v1`, controlla che il veicolo esista e sia attivo e salva il campione in PostgreSQL. Dopo il salvataggio aggiorna lo stato corrente in Redis e valuta le regole di manutenzione, per esempio una temperatura del motore troppo alta o il raggiungimento della soglia chilometrica del tagliando.

Sample e alert vengono salvati nella stessa transazione. Ogni alert mantiene tipo, severità e stato; il flusso previsto consente di passare da `OPEN` ad `ACKNOWLEDGED` e infine a `CLOSED`. Redis non è la fonte principale dei dati: può essere svuotato e ricostruito dallo storico.

La consegna Kafka è **at-least-once**. L'offset viene confermato solo al termine dell'elaborazione e il `messageId` impedisce che una riconsegna generi due campioni. Anche gli alert sono protetti dai duplicati tramite la coppia composta dal messaggio sorgente e dal tipo di alert.

Gli errori temporanei vengono ritentati con attese progressivamente più lunghe. Gli eventi relativi a veicoli sconosciuti o disabilitati finiscono su `telemetry.rejected.v1`; i messaggi non leggibili o ancora in errore dopo tutti i tentativi vengono pubblicati su `telemetry.dead-letter.v1`. Prima di confermare l'offset originale, il processor aspetta che Kafka abbia ricevuto anche questi eventi.

## Consultazione della flotta

Fleet API raccoglie tutte le funzioni usate dagli operatori e dai client esterni. Oltre alla registrazione e all'abilitazione dei veicoli, il progetto prevede endpoint per:

- consultare l'ultima telemetria disponibile;
- leggere lo storico per intervallo temporale e con paginazione;
- filtrare gli alert per veicolo, tipo, severità e stato;
- aggiornare lo stato di un alert;
- ottenere una panoramica della flotta.

Il **Fleet Dashboard** usa soltanto queste API. Mostra il numero e lo stato dei veicoli, quelli che hanno trasmesso di recente, gli alert aperti e il dettaglio della telemetria. I dati vengono aggiornati periodicamente tramite chiamate REST; il frontend non accede direttamente a Kafka, PostgreSQL o Redis.

## Osservabilità e avvio locale

Gateway, processor e Fleet API espongono health check e metriche. Prometheus raccoglie dati come connessioni attive, frame rifiutati, tempi di pubblicazione, duplicati, retry e latenza di elaborazione; Grafana è riservato al monitoraggio tecnico e rimane separato dalla dashboard usata dagli operatori.

L'intera topologia locale è descritta con Docker Compose e comprende i servizi applicativi, PostgreSQL, Redis, Kafka, Prometheus e Grafana. Le migration Flyway vengono applicate prima dell'avvio dei servizi che usano il database.

## Affidabilità e test

Ho dedicato particolare attenzione ai casi di errore:

- framing incompleto e stream troncati;
- limiti di payload;
- backpressure sulle connessioni;
- timeout di lettura;
- cleanup dei permit;
- graceful shutdown;
- provisioning idempotente;
- distinzione tra errori HTTP e TCP;
- consegna at-least-once senza duplicare i dati;
- retry e gestione dei messaggi non elaborabili;
- conferma degli offset solo a elaborazione conclusa.

Oltre ai test unitari, ci sono test con socket reali e container Kafka/PostgreSQL avviati tramite **Testcontainers**. Un test d'integrazione copre l'intero percorso, dalla ricezione del frame TCP fino al salvataggio del campione nel database.

## Stato del progetto

Oggi è funzionante il flusso che parte dal simulator, passa per il gateway e Kafka e arriva al processor, che salva la telemetria in PostgreSQL. Sono già presenti anche la gestione dei veicoli tramite Fleet API, le migration Flyway, i contratti condivisi, le metriche dei servizi e la gestione di retry, eventi rifiutati e dead-letter topic.

Il test di pipeline copre socket TCP, ACK del gateway, pubblicazione Kafka, ordinamento per veicolo, consumo, persistenza e riconsegna dello stesso messaggio senza duplicati.

Restano da completare la lettura degli ACK nel simulator, l'aggiornamento di Redis, la generazione degli alert, gli endpoint di consultazione della Fleet API e il Fleet Dashboard.

Repository: **github.com/val3riot/FleetPulse**
