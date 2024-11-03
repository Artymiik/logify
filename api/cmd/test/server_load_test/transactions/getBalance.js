const Client = require("../cmd/client");
const fs = require("fs");

async function main() {
  const read = await reader();
  // console.log(read);
  const client = new Client(route, "GET", read.data, read.data, read.count);

  client.sendRequest();
}

async function reader() {
  try {
    const data = await fs.promises.readFile("../temp/tokens.json", "utf8");
    const tokens = JSON.parse(data);
    // console.log(tokens[3].token);

    return {
      count: tokens.length,
      data: tokens,
    };
  } catch {
    return "error open file | or file empty.";
  }
}

const route = "transaction/getBalance";
main();
