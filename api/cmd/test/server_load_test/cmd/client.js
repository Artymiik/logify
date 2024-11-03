// зависимости
const https = require("http");
const fs = require("fs");

// класс клиент для нагрузки сервера
class Client {
  // инийиализация переменных
  // файл вывода результатов тестирования
  OUTPUT_FILE = "../temp/testing.txt";
  results = [];

  // конструктор класса
  constructor(router, method, token, body, stream) {
    this.url = `http://localhost:8080/api/v1/${router}`;
    this.method = method;
    this.token = token;
    this.body = body;
    this.stream = stream != null ? stream : 1;
  }

  // определение опций запроса
  options() {
    // получаем опции из URL
    return {
      hostname: new URL(this.url).hostname,
      port: new URL(this.url).port,
      path: new URL(this.url).pathname,
      method: this.method,
      headers: {
        "Content-Type": "application/json",
        Authorization: this.token,
      },
    };
  }

  // подгатовка запроса к серверу
  async request(bodyFormat) {
    // Замеряем начало запроса
    const startTime = Date.now();

    return new Promise((resolve, rejects) => {
      const request = https.request(this.options(), (response) => {
        let data = "";

        // Получение данных из запроса
        response.on("data", (chunk) => {
          data += chunk;
        });

        // Конец запроса
        response.on("end", () => {
          // Замеряем время окончания, общее время
          const endTime = Date.now();
          const elapsedTime = endTime - startTime;

          console.log(`${Date.now()} server response: ${data}`);
          const parseData = JSON.parse(data);

          // Если запрос был успешным, добавляем результат result
          const result = {
            status: response.statusCode,
            elapsedTime: elapsedTime,
            response: parseData,
          };

          // results.push(parseData);

          // Возвращяем результат
          resolve(result);
        });

        // Если произошло ошибку во время соединения с сервером
        response.on("error", (err) => {
          console.error(`server has error: ${err}`);
          rejects(err);
        });
      });

      // Записываем тело запроса
      request.write(JSON.stringify(bodyFormat));
      request.end();
    });
  }
  // отпарвка запроса к серверу
  async sendRequest() {
    console.log("-------------- TESTING --------------");
    // Засекаем время начала тестирования
    const startTime = Date.now();
    // массив для хранения результата запросов
    // const results = [];
    // переменная для хранения запроса
    let promises;

    // Если массив или объект, создаем массив промисов для всех запросов
    if (Array.isArray(this.body) && this.body.length > 0) {
      // Создаем массив промисов для всех запросов
      promises = this.body.map((bodyFormat) =>
        this.request(bodyFormat).then((result) => this.results.push(result))
      );
    } else if (typeof this.body === "object" && this.body.length > 0) {
      // Создаем массив промисов для всех запросов
      promises = [];
      // Для каждого объекта в массиве создаем промис и добавляем его в массив promises
      for (let i = 0; i < this.stream; i++) {
        promises.push(
          this.request(this.body).then((result) => this.results.push(result))
        );
      }
    } else {
      // Если не массив и не объект, выводим предупреждение
      console.log("data not available array ot object");
    }

    // Выполняем все промисы параллельно с помощью Promise.all
    try {
      // Выводим информацию о тестировании
      await Promise.all(promises);
      console.log("All request sending");
    } catch (error) {
      // Выводим ошибку при отправке запроса
      console.error("Error request send:", error);
    }

    // Выводим информацию о затраченном времени на тестирование
    const endTime = Date.now();
    const elapsedTime = endTime - startTime;
    console.log(`Time testing: ${elapsedTime} mm`);

    this.saveToFile(elapsedTime); // , results
  }

  // сохранение запроса в файл
  saveToFile(elapsedTime) {
    // , results
    const output = [
      // Заголовки колонок
      "Время выполнения, мс",
      "Статус ответа",
      "Ответ сервера",
    ];

    this.results.forEach((result) => {
      output.push(
        `${result.elapsedTime}mm,${result.status},${JSON.stringify(
          result.response
        )}`
      );
    });

    fs.appendFileSync(this.OUTPUT_FILE, output.join("\n") + "\n");
  }

  getResponse() {
    if (!this.results.length > 0) {
      console.error("get response failed! empty data");
      return;
    }
    return this.results;
  }
}

module.exports = Client;
