function validarId(req, res, next) {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({ erro: "ID inválido. Deve ser um número inteiro positivo." });
    }
    req.params.id = id;
    return next();
}

module.exports = validarId;
