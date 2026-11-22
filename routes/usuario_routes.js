const express = require("express");
const router = express.Router();
const usuarioService = require("../services/usuario_services");
const autenticarJWT = require("../security/middleware_auth");
const validarId = require("./validar_id");

// Exige token JWT válido em todas as rotas abaixo
router.use(autenticarJWT);

// GET /api/usuarios/me -> Perfil do usuário autenticado pelo token
router.get("/me", (req, res, next) => {
    try {
        const usuario = usuarioService.buscarPorId(req.usuarioId);
        return res.status(200).json(usuario);
    } catch (err) {
        return next(err);
    }
});

// GET /api/usuarios -> Lista todos os usuários
router.get("/", (req, res, next) => {
    try {
        const lista = usuarioService.listarUsuarios();
        return res.status(200).json(lista);
    } catch (err) {
        return next(err);
    }
});

// GET /api/usuarios/:id -> Busca usuário específico
router.get("/:id", validarId, (req, res, next) => {
    try {
        const usuario = usuarioService.buscarPorId(req.params.id);
        return res.status(200).json(usuario);
    } catch (err) {
        return next(err);
    }
});

// PUT /api/usuarios/:id -> Atualiza dados ou preferências (somente o próprio usuário)
router.put("/:id", validarId, (req, res, next) => {
    try {
        const atualizado = usuarioService.atualizarUsuario(req.params.id, req.usuarioId, req.body);
        return res.status(200).json(atualizado);
    } catch (err) {
        return next(err);
    }
});

// DELETE /api/usuarios/:id -> Remove conta (somente o próprio usuário) -> 204 No Content
router.delete("/:id", validarId, (req, res, next) => {
    try {
        usuarioService.removerUsuario(req.params.id, req.usuarioId);
        return res.status(204).send();
    } catch (err) {
        return next(err);
    }
});

module.exports = router;
