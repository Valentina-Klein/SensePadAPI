class ErroAplicacao extends Error {
    constructor(mensagem, statusCode = 400) {
        super(mensagem);
        this.statusCode = statusCode;
    }
}

module.exports = ErroAplicacao;
