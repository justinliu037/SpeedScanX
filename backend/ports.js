const net = require("net");

function scanPorts(host = "127.0.0.1", ports = [22, 80, 443, 8080, 3306, 3389, 139, 21]) {
  const openPorts = [];

  const checks = ports.map(port => new Promise(resolve => {
    const socket = new net.Socket();
    socket.setTimeout(1000);

    socket.on("connect", () => {
      openPorts.push(port);
      socket.destroy();
      resolve();
    });

    socket.on("timeout", () => {
      socket.destroy();
      resolve();
    });

    socket.on("error", () => {
      socket.destroy();
      resolve();
    });

    socket.connect(port, host);
  }));

  return Promise.all(checks).then(() => ({
    success: true,
    host,
    openPorts
  })).catch(err => ({
    success: false,
    error: err.message
  }));
}

module.exports = { scanPorts };