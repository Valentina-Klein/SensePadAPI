const usuarioRepo = require("../repositories/usuario_repository_sqlite");
const { verificarSenha } = require("../security/senhas");
const { gerarToken } = require("../security/config_jwt");
const ErroAplicacao = require("./erro_aplicacao");
const { validarCamposObrigatorios } = require("./validacao");

class AuthService {
    login({ email, password }) {
        validarCamposObrigatorios({ email, password }, ["email", "password"]);

        const usuario = usuarioRepo.buscarPorEmail(email);
        if (!usuario) {
            throw new ErroAplicacao("E-mail ou senha inválidos.", 401);
        }

        const senhaValida = verificarSenha(password, usuario.senha_hash);
        if (!senhaValida) {
            throw new ErroAplicacao("E-mail ou senha inválidos.", 401);
        }

        const token = gerarToken(usuario.id);

        return {
            token,
            usuario: usuario.toJSON()
        };
    }
}

module.exports = new AuthService();
