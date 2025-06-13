#!/bin/bash
echo "🔧 SpeedScanX Installer (Linux/macOS)"
echo "📦 Prüfe auf Node.js..."
if ! command -v node &> /dev/null
then
    echo "❌ Node.js ist nicht installiert. Bitte zuerst Node.js installieren."
    exit 1
fi

echo "✅ Node.js gefunden: $(node -v)"
echo "📦 Installiere Abhängigkeiten..."
npm install

echo "🚀 Starte SpeedScanX..."
node app.js
