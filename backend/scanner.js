const { exec } = require("child_process");

function pingHost(ip) {
  return new Promise((resolve) => {
    exec(`ping -n 1 -w 100 ${ip}`, (error, stdout, stderr) => {
      if (stdout.includes("Antwort von") || stdout.includes("bytes=")) {
        resolve(ip);
      } else {
        resolve(null);
      }
    });
  });
}

function parseArpTable() {
  return new Promise((resolve) => {
    exec("arp -a", (error, stdout, stderr) => {
      const entries = stdout
        .split("\n")
        .filter(line => line.includes("dynamic") || line.includes("statisch") || line.includes("-"))
        .map(line => {
          const match = line.match(/(\d+\.\d+\.\d+\.\d+)\s+([a-fA-F0-9:-]+)/);
          return match ? { ip: match[1], mac: match[2] } : null;
        })
        .filter(Boolean);

      resolve(entries);
    });
  });
}

async function runScan() {
  const baseIp = "192.168.2.";
  const pingPromises = [];

  for (let i = 1; i <= 254; i++) {
    pingPromises.push(pingHost(baseIp + i));
  }

  const pingResults = await Promise.all(pingPromises);
  const activeIps = pingResults.filter(Boolean);
  const arpEntries = await parseArpTable();

  const devices = activeIps.map(ip => {
    const entry = arpEntries.find(e => e.ip === ip);
    return {
      ip: ip,
      mac: entry ? entry.mac : "unbekannt"
    };
  });

  return { success: true, devices: devices };
}

module.exports = { runScan };
