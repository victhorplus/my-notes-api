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
        res.status(401).json({error});
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try{
        const result = await userService.deleteUser(id);
        res.status(202).json({
            message: `User ${id} deleted successfully`
        });
    }catch(error){
        res.status(401).json({error});
    }
})

router.get("/drop", () => {
    userService.drop()
})

module.exports = router;