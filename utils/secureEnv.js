const crypto = require("crypto");

function decryptEnvValue(encryptedValue, key) {
  const decipher = crypto.createDecipher("aes-256-cbc", key);
  let decrypted = decipher.update(encryptedValue, "base64", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}

module.exports = { decryptEnvValue };