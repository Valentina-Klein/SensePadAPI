const { db } = require("../database/conexao");
const Usuario = require("../models/usuario");
const UsuarioRepository = require("./usuario_repository");

class UsuarioRepositorySQLite extends UsuarioRepository {
    criar({ username, email, senha_hash }) {
        const stmt = db.prepare(`
            INSERT INTO usuarios (username, email, senha_hash)
            VALUES (?, ?, ?)
        `);
        
        const info = stmt.run(username, email, senha_hash);
        const novoId = Number(info.lastInsertRowid);
        return this.buscarPorId(novoId);
    }

    buscarTodos() {
        const rows = db.prepare("SELECT * FROM usuarios").all();
        return rows.map(row => new Usuario(row));
    }

    buscarPorId(id) {
        const row = db.prepare("SELECT * FROM usuarios WHERE id = ?").get(id);
        return row ? new Usuario(row) : null;
    }

    buscarPorEmail(email) {
        const row = db.prepare("SELECT * FROM usuarios WHERE email = ?").get(email);
        return row ? new Usuario(row) : null;
    }

    buscarPorUsername(username) {
        const row = db.prepare("SELECT * FROM usuarios WHERE username = ?").get(username);
        return row ? new Usuario(row) : null;
    }

    atualizar(id, { username, email, senha_hash }) {
        const atual = this.buscarPorId(id);
        if (!atual) return null;

        const novoUsername = username ?? atual.username;
        const novoEmail = email ?? atual.email;
        const novaSenha = senha_hash ?? atual.senha_hash;
        

        const stmt = db.prepare(`
            UPDATE usuarios
            SET username = ?, email = ?, senha_hash = ?
            WHERE id = ?
        `);
        stmt.run(novoUsername, novoEmail, novaSenha, id);
        return this.buscarPorId(id);
    }

    remover(id) {
        const info = db.prepare("DELETE FROM usuarios WHERE id = ?").run(id);
        return info.changes > 0;
    }
}

module.exports = new UsuarioRepositorySQLite();
