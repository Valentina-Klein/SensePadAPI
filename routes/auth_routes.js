const express = require("express");
const router = express.Router();
const authService = require("../services/auth_services");
const usuarioService = require("../services/usuario_services");

// POST /api/auth/register -> 201 Created
router.post("/register", (req, res, next) => {
    try {
        const usuario = usuarioService.criarUsuario(req.body);
        return res.status(201).json(usuario);
    } catch (err) {
        return next(err);
    }
});

// POST /api/auth/login -> 200 OK + JWT
router.post("/login", (req, res, next) => {
    try {
        const resultado = authService.login(req.body);
        return res.status(200).json(resultado);
    } catch (err) {
        return next(err);
    }
});

module.exports = router;
