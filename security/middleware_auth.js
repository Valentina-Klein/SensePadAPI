const { verificarToken } = require("./config_jwt");

function autenticarJWT(req, res, next) {
    const cabecalho = req.get("Authorization") || "";
    const [tipo, token] = cabecalho.split(" ");

    if (tipo !== "Bearer" || !token) {
        return res.status(401).json({ erro: "Token ausente ou mal formatado." });
    }

    try {
        const dados = verificarToken(token);
        req.usuarioId = Number(dados.sub);
        return next();
    } catch (erro) {
        return res.status(401).json({ erro: "Token inválido ou expirado." });
    }
}

module.exports = autenticarJWT;
