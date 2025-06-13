# Security Policy

Wir nehmen die Sicherheit dieses Projekts sehr ernst.  
Diese Richtlinie beschreibt, wie potenzielle Schwachstellen gemeldet, analysiert und behoben werden.

---

## 📅 Unterstützte Versionen

| Version         | Unterstützt | Status      |
|-----------------|-------------|-------------|
| 1.x             | ✅ Ja        | aktiv       |

---

## 📣 Sicherheitslücken melden

Bitte **berichte Sicherheitsprobleme vertraulich** über die folgende E-Mail-Adresse:

📧 **security@bylickilabs.io**  
(oder via GitHub [Security Advisories](https://github.com/bylickilabs/SpeedScanX/security/advisories))

⚠️ Bitte veröffentliche keine Schwachstellen in Issues oder Pull Requests.

<br>

---

<br>

## 🔍 Informationen zur Meldung

Bei deiner Sicherheitsmeldung gib bitte (wenn möglich) Folgendes an:

- Beschreibung der Schwachstelle
- Reproduktionsschritte oder Proof-of-Concept (PoC)
- Betroffene Komponenten (z. B. `logs.js`, `speedtest.js`, etc.)
- Versionsnummer von SpeedScanX oder Commit-Hash
- Vorschlag zur Eindämmung oder Behebung (optional)

---

## 🔄 Reaktionsprozess

1. Eingangsbestätigung innerhalb von **48 Stunden**
2. Analyse und Reproduktion (max. **5 Werktage**)
3. Behebung und Vorbereitung eines Patches
4. Veröffentlichung des Fixes **mit Danksagung (wenn gewünscht)**

---

## ✅ Sicherheit in SpeedScanX

- **Keine Datenübertragung** an Dritte
- **Lokale Ausführung** ohne Online-Komponenten (außer Speedtest CLI)
- `.env`-Datei für sichere Passwortverwaltung
- Nutzung von `dotenv`, `puppeteer`, `exec`, `ping`, `arp`, aber **keine Remote-Schnittstellen**
- Aktives Monitoring auf npm-Audit-Warnings und GitHub Security Alerts

---

## 🧩 Open-Source-Verantwortung

SpeedScanX ist ein quelloffenes Projekt, das auf Vertrauen, Transparenz und Sicherheit basiert.  
Wenn du bei der Sicherung helfen willst, sind **Pull Requests mit Security-Fixes** jederzeit willkommen.

---
