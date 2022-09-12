# DHBW-ExamMonitor Frontend

Projekt: https://github.com/DHBW-ExamMonitor/client-app

## Abhängigkeiten & Technologien

- Electron.js (Cross-Plattform-Framework für installierbare Web-Anwendungen mit HTML, JS und CSS (https://www.electronjs.org))
  - Build von Anwendungen für die Plattformen Windows, macOS und Linux
  - Einbindung systemspezifischer Funktionalitäten in Web-Anwendungen
  - Aufbau in Anlehnung an https://electron-react-boilerplate.js.org
- React.js (https://reactjs.org)
  - JavaScript-Library zur Entwicklung von Benutzeroberflächen
  - Unterstützung von atomarem Design durch Function-Components
- TailwindCSS (https://tailwindcss.com)
  - CSS-Framework
  - Styling der React-Components mit Hilfe von durch Tailwind bereitgestellten CSS-Klassen
- Electron-Builder (für die Erstellung der gepackten Datei (https://www.electron.build))
- TypeScript (JavaScript mit Syntax zur Typisierung (https://www.typescriptlang.org))
- NodeJS > v14 (https://nodejs.dev)

## Installation

Node Modules installieren:

```bash
$ npm install
```

## Entwicklungs-Anwendung

Die Anwendung kann im Entwicklungsmodus gestartet werden und erlaubt somit einen automatischen Hot-Reload bei getätigten Änderungen nach dem Speichern.

Anwendung im Entwicklungsmodus starten:

```bash
$ npm start
```

## Produktiv-Anwendung

Anwendung für die lokale Plattform erstellen:

```bash
$ npm run package
```

Anwendung spezifisch für Windows erstellen:

```bash
$ npm run package-win
```

## Verzeichnis

```
.
├── .erb                # Electron-React-Boilerplate-Skripte
├── release             # Output der produktiven Anwendung
├── package.json        # NodeJS-Projekt-Datei mit allen Abhängigkeiten und Befehlen
├── tailwind.config.js  # Einstellungen für das TailwindCSS-Framework
├── assets              # Icons für die Anwendung
└── src                 # Quellcode
    ├── main            # Code auf System-Ebene von Electron.js
    └── renderer        # Code der Benutzeroberfläche
```
