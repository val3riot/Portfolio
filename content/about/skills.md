---
title: "Technical Skills"
slug: "skills"
date: "2026-08-17"
category: "skills"
periodo_totale: "Aggiornato ad agosto 2026"
backend:
  - "Java 21"
  - "Java 8"
  - "Java EE"
  - "Spring Boot"
  - "Spring Framework"
  - "Spring MVC"
  - "Spring Data JPA"
  - "Spring Security"
  - "Spring Cloud OpenFeign"
  - "REST APIs"
  - "SOAP / JAX-WS"
  - "Apache CXF"
  - "JPA / Hibernate"
  - "Maven"
  - "TCP Socket Programming"
  - "Java Concurrency"
  - "Apache Kafka"
  - "Event-Driven Systems"
frontend:
  - "Angular"
  - "TypeScript"
  - "RxJS"
  - "React"
  - "JSP"
  - "JSTL / Apache Tiles"
  - "jQuery"
  - "Bootstrap"
  - "JavaScript"
  - "HTML"
  - "CSS"
database:
  - "PostgreSQL"
  - "Oracle"
  - "SQL"
  - "Flyway"
  - "Redis"
tools:
  - "Linux"
  - "Git"
  - "GitHub Actions"
  - "Jenkins"
  - "Docker"
  - "Docker Compose"
  - "JBoss EAP"
  - "Swagger"
  - "Testcontainers"
  - "Prometheus"
  - "Grafana"
  - "Bruno"
  - "DBeaver"
networking:
  - "TCP/IP"
  - "Proxmox VE"
  - "Cloudflare Tunnel"
  - "VPN"
  - "DNS"
  - "Reverse Proxy"
---

## Profilo tecnico

Mi occupo principalmente di sviluppo **backend Java**: API, logica applicativa, integrazioni e persistenza. Negli ultimi progetti sto lavorando anche su sistemi distribuiti, networking e infrastruttura Linux.

Con FleetPulse sono andato oltre il classico sviluppo REST, lavorando direttamente con socket TCP, connessioni persistenti, virtual threads, limiti di capacità, timeout e arresto controllato dei servizi.

## Backend & Software Engineering

Lavoro principalmente con **Java, Spring Boot e Spring Framework**. Sviluppo API REST, gestisco validazione ed errori e uso JPA/Hibernate con database versionati tramite Flyway. Nei progetti professionali ho lavorato anche con Spring MVC, Spring Security, Spring Data JPA e OpenFeign per la comunicazione tra microservizi.

In FleetPulse ho suddiviso queste responsabilità tra servizi e librerie dedicate, evitando di mescolare protocollo di rete, logica applicativa e persistenza.

## Messaging & Reliability

In FleetPulse ho realizzato una pipeline asincrona con **Apache Kafka**. Ho gestito l'ordinamento degli eventi, le conferme del broker, gli offset, i retry e i messaggi che non possono essere elaborati, facendo in modo che una seconda consegna dello stesso evento non duplichi i dati.

## Data & Persistence

Ho lavorato professionalmente con **Oracle SQL e Hibernate/JPA** e uso **PostgreSQL** nei progetti personali. In FleetPulse PostgreSQL conserva i dati persistenti e Flyway gestisce le modifiche allo schema. Redis è tra le tecnologie che sto approfondendo.

## Infrastructure & Networking

Gestisco un HomeLab basato su **Proxmox VE**, Linux, Docker e Docker Compose. I container girano su una VM dedicata, mentre un Raspberry Pi ospita alcuni servizi di rete e monitoraggio. Per esporre all'esterno solo i servizi necessari uso Cloudflare Tunnel.

Mi occupo anche di TCP/IP, DNS, VPN, reverse proxy e risoluzione dei problemi sui servizi self-hosted. Uso GitHub Actions per la CI e Testcontainers per eseguire i test d'integrazione con istanze reali di Kafka e PostgreSQL. Per metriche e monitoraggio uso Micrometer, Prometheus e Grafana.

## Integrazioni enterprise

Ho sviluppato e mantenuto integrazioni **SOAP** basate su contratti WSDL/XSD, JAX-WS e Apache CXF. Ho lavorato su applicazioni Maven multi-modulo distribuite come EAR/WAR su JBoss EAP, con build e rilasci supportati da Jenkins e Docker.

## Esperienza frontend

In ambito professionale ho lavorato su SPA **Angular** con TypeScript, RxJS, Router e Forms, oltre che su applicazioni server-side basate su JSP, JSTL, Apache Tiles, jQuery e Bootstrap. Ho utilizzato React nei progetti personali; oggi il mio interesse principale è il backend.
