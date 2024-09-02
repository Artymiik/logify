import axios from "axios";
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
  insert: (data) => insert(data),
};

log.insert("This is index.js");
