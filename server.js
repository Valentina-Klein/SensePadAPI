require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { inicializarBanco } = require("./database/conexao");
const ErroAplicacao = require("./services/erro_aplicacao");

const authRoutes = require("./routes/auth_routes");
const usuarioRoutes = require("./routes/usuario_routes");

const app = express();
const PORT = process.env.PORT || 3000;

// 1. Inicialização do banco SQLite
inicializarBanco();

// 2. Middlewares globais (antes das rotas)
app.use(cors());
app.use(express.json());

// 3. Rota pública de verificação para o app Flutter
app.get("/api/status", (req, res) => {
    return res.status(200).json({ status: "online", app: "Acessibilidade API" });
});

// 4. Rotas modulares
app.use("/api/auth", authRoutes);
app.use("/api/usuarios", usuarioRoutes);

// 5. Middleware para rota não encontrada (sempre após as rotas válidas)
app.use((req, res) => {
    return res.status(404).json({ erro: "Rota não encontrada." });
});

// 6. Middleware global de tratamento de erros
app.use((err, req, res, next) => {
    if (err instanceof ErroAplicacao) {
        return res.status(err.statusCode).json({ erro: err.message });
    }
    console.error(err);
    return res.status(500).json({ erro: "Erro interno do servidor." });
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Servidor rodando em http://0.0.0:${PORT}`);
});
