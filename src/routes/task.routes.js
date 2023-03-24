import { Router } from "express";

const router = Router();

router.get('/', (req, res) => {
    res.send('Tasks')
})

router.post('/', (req, res) => {
    res.status(200).json('guarando una nueva tarea')
})

export default router;