const crypto = require("crypto");
const { qrPrivateKey } = require("../config/keys");
function generateQR(siteId, lat, lng, radius){
  const data = `${siteId}|${lat}|${lng}|${radius}`;
  const signer = crypto.createSign("RSA-SHA256");
  signer.update(data);
  const sig = signer.sign(qrPrivateKey, "base64");
  return { siteId, lat, lng, radius, sig };
}
module.exports = { generateQR };
