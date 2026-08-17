---
title: "HomeLab & Operations"
date: "2026-08-12"
highlight: true
periodo: "Nov 2025 — in corso"
periodo_totale: "Novembre 2025 — in corso"
descrizione: "Laboratorio personale per virtualizzazione, container, networking, CI e gestione operativa di servizi self-hosted."
competenze:
  - "Proxmox VE"
  - "Linux"
  - "Docker"
  - "Docker Compose"
  - "GitHub Actions"
  - "Cloudflare Tunnel"
  - "Networking"
slug: "homelab"
highlights:
  - "Proxmox VE con VM Linux dedicata ai workload Docker"
  - "Servizi infrastrutturali e monitoring separati su Raspberry Pi"
  - "Accesso remoto e pubblicazione selettiva dei servizi"
  - "Evoluzione verso deployment e backup standardizzati"
---

Il mio HomeLab è un ambiente di studio e sperimentazione usato per approfondire **Linux, virtualizzazione, containerizzazione, networking e operations** attraverso servizi realmente utilizzati nella rete domestica.

## Architettura attuale

L'infrastruttura è organizzata attorno a **Proxmox VE** come hypervisor principale. I workload applicativi containerizzati sono concentrati in una VM Linux dedicata, `docker-main`, invece di creare una VM o un container Proxmox per ogni singola applicazione.

```text
Proxmox VE
└── docker-main
    └── applicazioni e servizi Docker / Docker Compose

Raspberry Pi
├── servizi DNS e di rete
├── Unbound
├── monitoring con Uptime Kuma
├── Cloudflare Tunnel
└── utility e servizi infrastrutturali leggeri
```

Questa separazione mantiene **compute applicativo** e **servizi infrastrutturali** distinti, lasciando a Proxmox il ruolo di livello di virtualizzazione e alla VM Docker quello di runtime principale per le applicazioni.

## Networking & accesso remoto

L'HomeLab viene utilizzato per sperimentare configurazione e troubleshooting di **TCP/IP, DNS, VPN, reverse proxy e accesso remoto**.

Per i servizi che devono essere raggiungibili dall'esterno utilizzo **Cloudflare Tunnel**, evitando di esporre direttamente porte amministrative sulla rete pubblica. Il monitoraggio dei servizi è centralizzato tramite Uptime Kuma.

## Container & deployment

Le applicazioni vengono eseguite tramite **Docker Compose**. GitHub Actions viene usato per workflow CI e automazione dei repository; la parte di deployment viene progressivamente standardizzata per eliminare script ad hoc specifici per ogni applicazione.

La direzione architetturale è avere un repository operativo privato, `homelab-ops`, come **source of truth** per configurazioni e procedure di deploy, mantenendo separati il codice applicativo e l'orchestrazione dell'infrastruttura.

```text
repository applicativo
        │
        ├── CI / build
        ▼
artefatto o immagine
        │
        ▼
homelab-ops
        │
        ▼
docker-main
```

## Evoluzione in corso

Le prossime evoluzioni sono trattate come progetto separato dall'infrastruttura già operativa:

- standardizzazione dei deployment senza migrare inutilmente i workload esistenti;
- repository `homelab-ops` come punto centrale per stack e procedure;
- control plane dedicato per stato applicazioni, deploy, restart e consultazione log;
- nodo di backup basato su Lenovo ThinkCentre, pensato per accendersi durante una finestra notturna, eseguire i backup e spegnersi al termine;
- revisione periodica delle risorse della VM Docker e della strategia di backup Proxmox.

Queste parti sono **in progettazione o implementazione progressiva** e non vengono considerate funzionalità già completate.

## Obiettivo tecnico

Il valore del progetto non è soltanto il self-hosting: l'HomeLab viene usato per studiare problemi tipici delle operations reali, come separazione delle responsabilità, health check, deployment ripetibili, accesso remoto, gestione dei failure, backup e osservabilità dei servizi.
