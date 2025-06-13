@echo off
echo 🔧 SpeedScanX Installer (Windows)
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js ist nicht installiert. Bitte zuerst Node.js installieren.
    pause
    exit /b
)

echo ✅ Node.js gefunden
echo 📦 Installiere Abhängigkeiten...
npm install

echo 🚀 Starte SpeedScanX...
node app.js
pause
