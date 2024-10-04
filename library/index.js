import { insert } from "./services/insert.js";

// const api = async () => {
//   const response = await axios.get("https://api.ipify.org?format=json");
//   console.log(await response.data.ip);
// };

// api();

// ------------------------------
// Главная функция для работы с log
// ------------------------------
// export const log = {
//   insert: (data) => insert(data),
// };

export const log = {
  insert: (data, action) => insert(data, action),
};

log.insert(
  "0293b2a8698b03ad200d2c96b44049cb00a84937efdf4a2bbda44976cef649d0dd7b6d89e55ffdc2551c45dfafcff8fe7a27a74fa363a260c4ef9b75b89d7f221f24f1e8aa73f602702305ddb428e11a64b5662aa77527401b0cfd760710a1ba",
  {
    StatusCode: "500",
    ResponseMessage: "This is library!!!",
  }
);
