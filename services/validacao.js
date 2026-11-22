const ErroAplicacao = require("./erro_aplicacao");

function validarCamposObrigatorios(dados, campos) {
    for (const campo of campos) {
        if (!dados || dados[campo] === undefined || String(dados[campo]).trim() === "") {
            throw new ErroAplicacao(`O campo '${campo}' é obrigatório.`, 400);
        }
    }
}

function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(String(email))) {
        throw new ErroAplicacao("Formato de e-mail inválido.", 400);
    }
}

function validarSenha(senha) {
    if (String(senha).length < 6) {
        throw new ErroAplicacao("A senha deve ter pelo menos 6 caracteres.", 400);
    }
}

module.exports = { validarCamposObrigatorios, validarEmail, validarSenha };
