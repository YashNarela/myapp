const fs = require("fs");
const path = require("path");

module.exports = {
  jwtSecret: "supersecretjwtkey123",
  qrPrivateKey: fs.readFileSync(path.join(__dirname, "private.pem"), "utf8"),
  qrPublicKey: fs.readFileSync(path.join(__dirname, "public.pem"), "utf8"),
};
