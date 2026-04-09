const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const path = require("path");

const app = express();
const url = "mongodb://localhost:27017";
const dbName = "rgr_db";
const collectionName = "user_profiles"; // Твоя унікальна колекція

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Маршрут для головної сторінки
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// API: Отримати всіх користувачів
app.get("/api/users", async (req, res) => {
    const client = new MongoClient(url);
    await client.connect();
    const users = await client.db(dbName).collection(collectionName).find({}).toArray();
    res.send(users);
    await client.close();
});

// API: Додати нового (якщо захочеш через форму)
app.post("/api/users", async (req, res) => {
    const client = new MongoClient(url);
    await client.connect();
    const result = await client.db(dbName).collection(collectionName).insertOne(req.body);
    res.send(result);
    await client.close();
});

app.listen(3000, () => console.log("Сервер: http://localhost:3000"));