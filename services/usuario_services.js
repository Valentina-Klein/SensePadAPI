const usuarioRepo = require("../repositories/usuario_repository_sqlite");
const { gerarHashSenha } = require("../security/senhas");
const ErroAplicacao = require("./erro_aplicacao");
const { validarCamposObrigatorios, validarEmail, validarSenha } = require("./validacao");

class UsuarioService {
    criarUsuario({ username, email, password, preferencias }) {
        validarCamposObrigatorios({ username, email, password }, ["username", "email", "password"]);
        validarEmail(email);
        validarSenha(password);

        if (usuarioRepo.buscarPorEmail(email)) {
            throw new ErroAplicacao("E-mail já cadastrado.", 409);
        }
        if (usuarioRepo.buscarPorUsername(username)) {
            throw new ErroAplicacao("Nome de usuário já está em uso.", 409);
        }

        const senha_hash = gerarHashSenha(password);
        const usuario = usuarioRepo.criar({ username, email, senha_hash });
        return usuario.toJSON();
    }

    listarUsuarios() {
        return usuarioRepo.buscarTodos().map(u => u.toJSON());
    }

    buscarPorId(id) {
        const usuario = usuarioRepo.buscarPorId(id);
        if (!usuario) {
            throw new ErroAplicacao("Usuário não encontrado.", 404);
        }
        return usuario.toJSON();
    }

    atualizarUsuario(idAlvo, idAutenticado, { username, email, password }) {
        if (idAlvo !== idAutenticado) {
            throw new ErroAplicacao("Você não tem permissão para alterar outro usuário.", 403);
        }

        const existente = usuarioRepo.buscarPorId(idAlvo);
        if (!existente) {
            throw new ErroAplicacao("Usuário não encontrado.", 404);
        }

        if (email && email !== existente.email) {
            validarEmail(email);
            if (usuarioRepo.buscarPorEmail(email)) {
                throw new ErroAplicacao("E-mail já cadastrado.", 409);
            }
        }

        if (username && username !== existente.username) {
            if (usuarioRepo.buscarPorUsername(username)) {
                throw new ErroAplicacao("Nome de usuário já está em uso.", 409);
            }
        }

        let senha_hash;
        if (password) {
            validarSenha(password);
            senha_hash = gerarHashSenha(password);
        }

        const atualizado = usuarioRepo.atualizar(idAlvo, { username, email, senha_hash });
        return atualizado.toJSON();
    }

    removerUsuario(idAlvo, idAutenticado) {
        if (idAlvo !== idAutenticado) {
            throw new ErroAplicacao("Você não tem permissão para remover outro usuário.", 403);
        }

        const removido = usuarioRepo.remover(idAlvo);
        if (!removido) {
            throw new ErroAplicacao("Usuário não encontrado.", 404);
        }
    }
}

module.exports = new UsuarioService();
