LOGS
Конструкция: log-email[nameLog]-number(1)

Пример: temp / log-aou9qf009q2[fojq8398fjoifd]-2.json

## S3 storage

url: https://my.selectel.ru/storage

<--users-->
пользователь: admin::logify
пароль: hM4@mX3i

<--project storage-->
название контейнера: logify-storage
хост: s3.ru-1.storage.selcloud.ru
регион: ru-1
контейнер: logify-storage.s3.ru-1.storage.selcloud.ru

<--key-->
имя: Admin
access_key: 7473cb7bcdeb473fbd4c6d9d628ac976
secret_key: 2950ff80ecbc478c8adbe0054f383882


TODO
1) Сделать фильтрацию по timestamp | StatusCode
2) Удаление старых лог файлов < 1 года
3) Сделать категории
    - Authenticate (Session, Authenticate)
    - Safety (IPAddress and GPS)
    - Customizable (custom)
