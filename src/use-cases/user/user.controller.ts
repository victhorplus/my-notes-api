import { CookieOptions } from "express";
import { authenticateToken } from "../../middlewares/authenticate.middleware";
import { UserService } from "./user.service";

const express = require('express')
const router = express.Router()
const userService = new UserService();

router.get('/', (req, res) => {
    res.send('User main')
});

router.post('/', async (req, res) => {
    const body = req.body;
    try{
        const result = await userService.createUser(body)
        res.status(201).json(result);
    }catch(error){
        res.status(401).json({ error });
    }
});

router.delete('/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    const { userId } = req.body;
    if(id !== userId) {
        res.status(401).json({
            error: "Requisição de usuário inválido"
        });
        return;
    }
    try{
        await userService.deleteUser(id);
        res.status(202).json({
            message: `User ${id} deleted successfully`
        });
    }catch(error){
        res.status(401).json({ error });
    }
});


module.exports = router;