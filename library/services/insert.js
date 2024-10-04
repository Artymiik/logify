import axios from "axios";

export const insert = async (data, action) => {
  const response = await axios.post(`http://localhost:8080/api/v1/insert`, {
    uniqueClient: data,
    Action: action,
  });

  console.log(response.data);
};
