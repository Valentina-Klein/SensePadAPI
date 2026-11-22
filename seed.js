const { db, inicializarBanco } = require("./database/conexao");
const { gerarHashSenha } = require("./security/senhas");

function seed() {
    inicializarBanco();

    const { total } = db.prepare("SELECT COUNT(*) AS total FROM usuarios").get();
    if (total > 0) {
        console.log("Seed ignorado: a tabela 'usuarios' já possui registros.");
        return;
    }

    const insert = db.prepare(`
        INSERT INTO usuarios (username, email, senha_hash)
        VALUES (?, ?, ? )
    `);

    const senhaPadrao = gerarHashSenha("123456");

    const usuariosIniciais = [
        {
            username: "usuario1",
            email: "usuario1@acessibilidade.com",
            senha_hash: senhaPadrao
            
        },
        {
            username: "usuario2",
            email: "usuario2@acessibilidade.com",
            senha_hash: senhaPadrao
            
        },
        {
            username: "admin_teste",
            email: "admin@acessibilidade.com",
            senha_hash: senhaPadrao
            
        }
    ];

    for (const u of usuariosIniciais) {
        insert.run(u.username, u.email, u.senha_hash);
    }

    console.log("Seed concluído: 3 usuários iniciais criados (Senha padrão: 123456).");
}

seed();
