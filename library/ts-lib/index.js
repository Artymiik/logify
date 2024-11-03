import { insert } from "./services/insert.js";

// const api = async () => {
//   const response = await axios.get("https://api.ipify.org?format=json");
//   console.log(await response.data.ip);
// };

// api();

// ------------------------------
// Главная функция для работы с log
// ------------------------------
export const log = {
  insert: (data, args) => insert(data, args),
};

log.insert(
  "0293b2a8698b03ad200d2c96b44049cb00a84937efdf4a2bbda44976cef649d1d47b6d80e55ffcc2541e45dda2cffaf87827ae49a663a260c4ef9b75b89d7f221f24f1e8a06cef017d2208dcb62ee0200008e60b0de612d75eb87443daf3e9",
  {
    statusCode: "500",
    email: "artemiik@gmail.com",
    ip_address: "192.168.0.1",
    gps: "st-103-10",
    authenticate: "jwt-v1",
  }
);
