require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");

const { runPing } = require("./backend/ping");
const { runSpeedtestCli } = require("./backend/speedtest");
const { runScan } = require("./backend/scanner");
const { getDhcpLeases } = require("./backend/dhcp");
const { scanPorts } = require("./backend/ports");
const { getRouterLogs } = require("./backend/logs");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/api/ping", async (req, res) => {
  const result = await runPing();
  res.json(result);
});

app.get("/api/speedtest", async (req, res) => {
  const result = await runSpeedtestCli();
  res.json(result);
});

app.get("/api/scan", async (req, res) => {
  const result = await runScan();
  res.json(result);
});

app.get("/api/dhcp", async (req, res) => {
  const result = await getDhcpLeases();
  res.json(result);
});

app.get("/api/ports", async (req, res) => {
  const host = req.query.host || "127.0.0.1";
  const result = await scanPorts(host);
  res.json(result);
});

app.get("/api/router", async (req, res) => {
  const result = await getRouterLogs();
  res.json(result);
});

app.listen(PORT, () => {
  console.log(`✅ SpeedScanX läuft unter http://localhost:${PORT}`);
});
