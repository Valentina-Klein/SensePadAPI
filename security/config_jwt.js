const jwt = require("jsonwebtoken");
require("dotenv").config();

const SECRET = process.env.JWT_SECRET;
const EXPIRES_IN = process.env.JWT_EXPIRES_IN || "8h";

if (!SECRET) {
    throw new Error("ERRO FATAL: Variável de ambiente JWT_SECRET não configurada.");
}

function gerarToken(usuarioId) {
    return jwt.sign({}, SECRET, {
        subject: String(usuarioId),
        expiresIn: EXPIRES_IN,
        algorithm: "HS256"
    });
}

function verificarToken(token) {
    return jwt.verify(token, SECRET, { algorithms: ["HS256"] });
}

module.exports = { gerarToken, verificarToken };
