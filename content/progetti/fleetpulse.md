---
title: "FleetPulse"
date: "2026-11-08"
highlight: true
periodo: "Lug 2026 — in corso"
periodo_totale: "Luglio 2026 — in corso"
descrizione: "Acquisizione TCP e pipeline a eventi per telemetria sintetica, con storico, stato corrente e alert."
competenze:
  - "Java 21 / Spring Boot"
  - "TCP / Virtual Threads"
  - "Apache Kafka"
  - "PostgreSQL / Redis"
  - "Testcontainers"
  - "Docker Compose"
slug: "fleetpulse"
highlights:
  - "Gateway TCP con risorse limitate e ACK dopo conferma Kafka"
  - "Persistenza idempotente, proiezioni Redis e alert transazionali"
  - "API REST per stato, storico, alert e riepilogo flotta"
  - "Test di integrazione e strumenti di verifica end-to-end del backend"
---

FleetPulse raccoglie ed elabora **telemetria sintetica di veicoli**. È un progetto personale per studiare networking, concorrenza e affidabilità dei sistemi distribuiti; non utilizza dati reali né protocolli automotive proprietari.

## Architettura e acquisizione

Il simulator registra o recupera i veicoli tramite Fleet API e invia campioni al gateway su connessioni TCP persistenti. Kafka separa l'acquisizione dall'elaborazione; il processor salva lo storico, valuta gli alert e aggiorna lo stato corrente. Due librerie condividono contratti degli eventi e protocollo TCP.

![Architettura e flusso applicativo di FleetPulse](/diagrams/fleetpulse-architecture.svg)

Il protocollo usa un prefisso di lunghezza di quattro byte big-endian seguito da JSON UTF-8. Il gateway impiega virtual threads, un limite alle connessioni concorrenti, limiti di payload, timeout e arresto controllato per contenere l'uso delle risorse.

Gli eventi sono pubblicati su Kafka con l'ID del veicolo come chiave per mantenerne l'ordinamento nella partizione. Il gateway invia l'ACK solo dopo la conferma del broker; gli errori di pubblicazione producono un NACK. Il simulator gestisce la riconnessione con attesa crescente, ma **non legge ancora gli ACK nel ciclo di invio**.

## Elaborazione e persistenza

Il processor verifica che il veicolo esista e sia attivo. Campione e alert di manutenzione vengono salvati nella stessa transazione PostgreSQL; i vincoli sul messaggio sorgente impediscono duplicati in caso di riconsegna. Le regole comprendono temperatura del motore e soglia chilometrica del tagliando.

La pipeline adotta consegna **at-least-once**, retry con backoff e topic distinti per eventi rifiutati e messaggi non elaborabili. L'offset viene confermato al termine dell'elaborazione o dopo la pubblicazione confermata dell'evento terminale.

Redis conserva una proiezione ricostruibile dell'ultima telemetria. PostgreSQL rimane la fonte persistente; Fleet API ricorre allo storico quando la proiezione manca o Redis non è disponibile. Flyway gestisce lo schema.

## Consultazione

Le API REST implementano gestione dei veicoli, stato corrente, storico paginato per intervallo temporale, ricerca degli alert e riepilogo della flotta. Gli alert seguono le transizioni da aperto a riconosciuto e chiuso, con controllo degli aggiornamenti concorrenti.

Il **Fleet Dashboard è ancora da sviluppare**: è presente una base Angular con routing e client HTTP predisposti, senza pagine funzionali o servizi REST applicativi.

## Test e operatività

Sono presenti test unitari, test con socket reali e integrazioni Testcontainers per Kafka, PostgreSQL e Redis. I test della pipeline verificano acquisizione, persistenza e riconsegne senza duplicati; gli script end-to-end coprono anche alert e scenari di guasto.

Docker Compose descrive lo stack backend con migration, infrastruttura e monitoraggio. Health check, metriche Micrometer raccolte da Prometheus, dashboard Grafana e log strutturati supportano la diagnosi. Il deployment è orientato all'ambiente locale: non è una piattaforma già validata per l'esposizione pubblica.

Il backend include acquisizione, elaborazione e consultazione. Restano incompleti il ciclo ACK/NACK del simulator e il frontend operativo.

[Repository FleetPulse](https://github.com/val3riot/FleetPulse)
