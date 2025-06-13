async function runPing() {
  const res = await fetch("/api/ping");
  const data = await res.json();

  if (!data.success) {
    document.getElementById("output").innerText = "❌ Fehler: " + data.error;
    return;
  }

  const latency = data.latency_ms || { min: "-", max: "-", avg: "-" };

  const output = `
📡 Ping-Test zu ${data.target}

📦 Pakete:
   → Gesendet:   ${data.sent}
   → Empfangen:  ${data.received}
   → Verlust:    ${data.lost}

⏱️ Latenz (ms):
   → Minimum:    ${latency.min}
   → Maximum:    ${latency.max}
   → Durchschnitt: ${latency.avg}

<details>
  <summary>📄 Rohdaten anzeigen</summary>
  <pre>${data.raw}</pre>
</details>
  `;

  document.getElementById("output").innerHTML = output;
}

async function runSpeedtest() {
  const res = await fetch("/api/speedtest");
  const data = await res.json();
  document.getElementById("output").innerText = JSON.stringify(data, null, 2);
}

async function runScan() {
  const res = await fetch("/api/scan");
  const data = await res.json();

  if (!data.success || !data.devices || data.devices.length === 0) {
    document.getElementById("output").innerText = "🔍 Keine aktiven Geräte im Netzwerk gefunden.";
    return;
  }

  let output = `🖧 Aktive Geräte im Netzwerk (${data.devices.length}):\n\n`;

  data.devices.forEach((device, index) => {
    output += `#${index + 1}	IP: ${device.ip}	MAC: ${device.mac}\n`;
  });

  document.getElementById("output").innerText = output;
}

async function runDhcp() {
  const res = await fetch("/api/dhcp");
  const data = await res.json();
  document.getElementById("output").innerText = JSON.stringify(data, null, 2);
}

async function runPortscan() {
  const host = prompt("Ziel-IP oder Host eingeben (z. B. 192.168.2.1):", "127.0.0.1");
  if (!host) return;
  const res = await fetch(`/api/ports?host=${host}`);
  const data = await res.json();
  document.getElementById("output").innerText = JSON.stringify(data, null, 2);
}

async function runRouterLogs() {
  const res = await fetch("/api/router");
  const data = await res.json();
  document.getElementById("output").innerText = JSON.stringify(data, null, 2);
}
