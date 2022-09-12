# DHBW-ExamMonitor Frontend

## Abhängigkeiten & Technologien

- Electron.js (Cross-Plattform-Framework für installierbare Web-Anwendungen)
  - Build von Anwendungen für Windows, macOS und Linux
- React.js
  - Web-Frontend-Framework
- TailwindCSS
  - Styling der React-Anwendung mit Hilfe von vorgefertigten CSS-Klassen
- Electron-Builder (für die Erstellung der gepackten Datei)
- NodeJS > v14

## Installation

Node Modules installieren:

```bash
npm install
```

## Entwicklungs-Anwendung

Die Anwendung kann im Entwicklungsmodus gestartet werden und erlaubt somit einen automatischen Hot-Reload bei getätigten Änderungen nach dem Speichern.

Anwendung im Entwicklungsmodus starten:

```bash
npm start
```

## Produktiv-Anwendung

Anwendung für die lokale Plattform erstellen:

```bash
npm run package
```

Anwendung spezifisch für Windows erstellen:

```bash
npm run package-win
```
