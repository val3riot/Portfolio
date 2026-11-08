---
title: "HomeLab & Operations"
date: "2026-11-08"
highlight: true
periodo: "Nov 2025 — in corso"
periodo_totale: "Novembre 2025 — in corso"
descrizione: "Infrastruttura personale per servizi self-hosted, accesso remoto, automazione e backup."
competenze:
  - "Proxmox VE / Linux"
  - "Docker Compose"
  - "Nginx / TLS"
  - "Tailscale"
  - "Cloudflare Access / Tunnel"
  - "Ansible"
slug: "homelab"
highlights:
  - "VM applicativa e laboratorio separati su Proxmox"
  - "DNS, proxy e accesso remoto su nodo di rete dedicato"
  - "Configurazioni versionate e pubblicazione controllata della documentazione"
  - "Backup applicativi e VM attivi, con copertura ancora parziale"
---

Ambiente personale per gestire **servizi self-hosted** e approfondire virtualizzazione, networking e operatività su Linux.

## Infrastruttura

Proxmox VE ospita una VM Debian per i workload Docker e una VM laboratorio distinta. Le applicazioni usano progetti Compose con reti e dati separati; l'inventario attuale non prevede workload LXC.

La VM applicativa ospita strumenti come Gitea con PostgreSQL, Portainer e Open WebUI. L'inferenza AI dipende da una workstation GPU separata. Il laboratorio contiene K3s e Jenkins, viene avviato manualmente e resta spento quando non utilizzato; le pipeline di esercizio sono ancora da configurare.

Un Raspberry Pi separa i servizi infrastrutturali dai workload applicativi: DNS, reverse proxy, accesso remoto, condivisione file e monitoraggio. Questa concentrazione è anche una dipendenza operativa: un suo guasto interrompe l'accesso a più servizi.

## Rete e accesso

Nginx gestisce l'ingresso ai servizi locali con HTTPS e CA privata. Tailscale consente l'accesso remoto alla rete autorizzata con split DNS; Cloudflare Access e Tunnel pubblicano soltanto servizi selezionati, senza port forwarding sul router. Il password manager e la condivisione file restano accessibili da LAN o VPN.

## Automazione e gestione

Il repository privato delle operations conserva inventario, configurazioni e procedure. Ansible gestisce il reverse proxy con verifica delle differenze prima dell'applicazione e controlli successivi di convergenza.

Una pipeline esporta la documentazione condivisibile tramite allowlist e controlli anti-leak, aprendo una pull request per revisione manuale. La precedente pipeline applicativa è stata dismessa: non rappresenta un deployment automatico attualmente operativo.

Uptime Kuma controlla la disponibilità; log nativi, stato dei servizi e health check dei container supportano la diagnosi. Il monitoraggio centralizzato con Prometheus e Grafana resta da implementare nell'HomeLab.

## Backup e limiti attuali

Un disco separato ospita backup giornalieri del password manager e settimanali della VM applicativa. I job verificano il filesystem di destinazione prima di scrivere; le copie applicative includono checksum e riavvio controllato del servizio.

Sono documentate verifiche di integrità dell'archivio VM e un ripristino isolato del database con avvio del password manager. Il ripristino completo della VM non è ancora stato provato. Condivisione file, copertura completa delle configurazioni e copie off-site restano da completare; Proxmox Backup Server su un nodo separato è pianificato.

[Documentazione pubblica HomeLab](https://github.com/val3riot/homelab)
