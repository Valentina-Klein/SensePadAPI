const bcrypt = require("bcryptjs");

function gerarHashSenha(senhaPlana) {
    return bcrypt.hashSync(senhaPlana, 10);
}

function verificarSenha(senhaPlana, senhaHash) {
    return bcrypt.compareSync(senhaPlana, senhaHash);
}

module.exports = { gerarHashSenha, verificarSenha };
