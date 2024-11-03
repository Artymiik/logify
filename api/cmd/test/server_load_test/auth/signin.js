const Client = require("../cmd/client");
const fs = require("fs");

async function main() {
  const read = await reader();
  const client = new Client(route, "POST", null, read.data, read.count);

  // ---------------
  // START TEST
  // ---------------
  client.sendRequest().then((_) => {
    const response = client.getResponse();

    fs.writeFile(
      "../temp/tokens.json",
      JSON.stringify(
        response.map((user) => ({ token: user.response.token })),
        null,
        2
      ),
      (err) => {
        if (err) {
          console.error(`${Date.now()} ${err}`);
        }
      }
    );
  });
}

async function reader() {
  try {
    const data = await fs.promises.readFile("../temp/users.json", "utf8");
    const users = JSON.parse(data);

    return {
      count: users.length,
      data: users,
    };
  } catch {
    return "error open file | or file empty.";
  }
}

const route = "signin";

main();
