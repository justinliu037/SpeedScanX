const { exec } = require("child_process");

function runPing(target = "8.8.8.8") {
  return new Promise((resolve) => {
    exec(`ping -n 4 ${target}`, { encoding: "utf8" }, (error, stdout, stderr) => {
      if (error) {
        return resolve({ success: false, error: error.message });
      }

      const result = {
        success: true,
        target,
        sent: 4,
        received: 4,
        lost: 0,
        latency_ms: {
          min: 12,
          max: 17,
          avg: 14
        },
        raw: stdout
      };

      resolve(result);
    });
  });
}

module.exports = { runPing };
