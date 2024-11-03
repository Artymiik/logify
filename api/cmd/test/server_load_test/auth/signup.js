const Client = require("../cmd/client");
const fs = require("fs");

function main(stream) {
  console.log("-------------- PREPARE --------------");

  data = [];

  async function generateUsersWithDelay() {
    for (let i = 0; i < stream; i++) {
      data.push(generateUser());
      await new Promise((resolve) => setTimeout(resolve, 60));
      console.log(`user ${i + 1} has been ready!`);
    }

    return data;
  }

  generateUsersWithDelay().then((users) => {
    if (users.length >= stream) {
      // 1) router 2) method 3) токен 4) данные 5) потоки
      const client = new Client(route, "POST", null, data, stream);
      // ---------------
      // START TEST
      // ---------------
      client.sendRequest().then((result) => {
        const jsonData = JSON.stringify(
          users.map((user) => ({ email: user.email, password: user.password })),
          null,
          2
        );

        fs.writeFile("../temp/users.json", jsonData, (err) => {
          if (err) {
            console.error(`${Date.now()} err`);
          }
        });
      });
    }
  });
}

const route = "signup";
function generateUser() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
  const consonants = "bcdfghjklmnpqrstvwxyz";
  const vowels = "aeiou";

  let firstName = "";
  let lastName = "";
  for (let i = 0; i < 6; i++) {
    if (i % 2 === 0) {
      firstName += consonants.charAt(
        Math.floor(Math.random() * consonants.length)
      );
      lastName += consonants.charAt(
        Math.floor(Math.random() * consonants.length)
      );
    } else {
      firstName += vowels.charAt(Math.floor(Math.random() * vowels.length));
      lastName += vowels.charAt(Math.floor(Math.random() * vowels.length));
    }
  }

  let password = "";
  for (let i = 0; i < 15; i++) {
    password += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }

  return {
    firstName: firstName.charAt(0).toUpperCase() + firstName.slice(1),
    lastName: lastName.charAt(0) + lastName.slice(1),
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
    password: password,
  };
}

main(500);
