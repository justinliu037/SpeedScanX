const { exec } = require("child_process");

function runSpeedtestCli() {
  return new Promise((resolve, reject) => {
    const cliPath = "C:\\Tools\\speedtest.exe"; // Pfad ggf. anpassen

    exec(`"${cliPath}" --accept-license --accept-gdpr -f json`, (error, stdout, stderr) => {
      if (error) {
        return resolve({ success: false, error: error.message });
      }

      try {
        const result = JSON.parse(stdout);
        resolve({
          success: true,
          ping: result.ping.latency + " ms",
          download: (result.download.bandwidth / 125000).toFixed(2) + " Mbps",
          upload: (result.upload.bandwidth / 125000).toFixed(2) + " Mbps",
          server: result.server.name + " (" + result.server.location + ")",
          isp: result.isp
        });
      } catch (e) {
        resolve({ success: false, error: "Fehler beim Parsen: " + e.message });
      }
    });
  });
}

module.exports = { runSpeedtestCli };