const midtransClient = require("midtrans-client");

const isProduction = process.env.MIDTRANS_IS_PRODUCTION === "true";

//core API instance
const coreApi = new midtransClient.CoreApi({
  isProduction,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY,
});

//SNAP API Instance
const snap = new midtransClient.Snap({
  isProduction,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY,
});

module.exports = { coreApi, snap };
