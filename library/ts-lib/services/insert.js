import axios from "axios";
import { Config } from "../core/config.js";

const config = new Config();

export const insert = async (data, args) => {
  const response = await axios.post(
    `${config.ReturnConfig().SERVER_URL}insert`,
    {
      uniqueClient: data,
      args: args,
    }
  );

  console.log(response.data);
};
