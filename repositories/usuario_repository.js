class UsuarioRepository {
    constructor() {
        if (new.target === UsuarioRepository) throw new Error("Classe abstrata.");
    }
    criar(usuario) { throw new Error("Método não implementado"); }
    buscarTodos() { throw new Error("Método não implementado"); }
    buscarPorId(id) { throw new Error("Método não implementado"); }
    buscarPorEmail(email) { throw new Error("Método não implementado"); }
    buscarPorUsername(username) { throw new Error("Método não implementado"); }
    atualizar(id, dados) { throw new Error("Método não implementado"); }
    remover(id) { throw new Error("Método não implementado"); }
}

module.exports = UsuarioRepository;
