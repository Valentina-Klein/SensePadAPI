const { DatabaseSync } = require("node:sqlite");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const dbPath = process.env.DB_PATH || path.join(__dirname, "../dados/acessibilidade.sqlite");
const dbDir = path.dirname(dbPath);

if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
}

const db = new DatabaseSync(dbPath);
db.exec("PRAGMA foreign_keys = ON");

function inicializarBanco() {
    const schemaPath = path.join(__dirname, "schema.sql");
    const schema = fs.readFileSync(schemaPath, "utf8");
    db.exec(schema);
}

module.exports = { db, inicializarBanco };
