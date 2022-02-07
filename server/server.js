'use strict';
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello World');
});

const MongoClient = require("mongodb").MongoClient;

const url = "mongodb://mongo:27017/";
const mongoClient = new MongoClient(url);
async function run() {
    try {
        // Подключаемся к серверу
        await mongoClient.connect();
        // обращаемся к базе данных admin
        const db = mongoClient.db("admin");
        // выполняем пинг для проверки подключения
        const result = await db.command({ ping: 1 });
        console.log("Подключение с сервером успешно установлено");
        console.log(result);
    }catch(err) {
        console.log("Возникла ошибка");
        console.log(err);
    } finally {
        // Закрываем подключение при завершении работы или при ошибке
        await mongoClient.close();
        console.log("Подключение закрыто");
    }
}
run()

app.listen(8080, "0.0.0.0");
console.log(`Running on https://${"0.0.0.0"}:${8080}`);
