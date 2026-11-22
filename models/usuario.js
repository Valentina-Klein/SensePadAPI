class Usuario {
    constructor({ id, username, email, senha_hash, preferencias = "{}", criado_em }) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.senha_hash = senha_hash;
        this.criado_em = criado_em;
    }

    toJSON() {
        return {
            id: this.id,
            username: this.username,
            email: this.email,
            criado_em: this.criado_em
        };
    }
}

module.exports = Usuario;
