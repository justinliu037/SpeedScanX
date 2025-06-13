const { exec } = require("child_process");

function getDhcpLeases() {
  return new Promise((resolve, reject) => {
    exec("arp -a", (error, stdout, stderr) => {
      if (error) return resolve({ success: false, error: error.message });

      const entries = stdout
        .split("\n")
        .filter(line => line.includes("dynamic") || line.includes("-"))
        .map(line => {
          const match = line.match(/([0-9]+\.[0-9]+\.[0-9]+\.[0-9]+)\s+([a-f0-9:-]{17}|[a-f0-9-]{12,})/i);
          return match ? { ip: match[1], mac: match[2] } : null;
        })
        .filter(entry => entry !== null);

      resolve({ success: true, leases: entries });
    });
  });
}

module.exports = { getDhcpLeases };