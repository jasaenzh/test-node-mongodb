import express from 'express';
import TasksRoutes from './routes/task.routes'

const app = express();

// Configurando el puerto de escucha
app.set('port', process.env.PORT || 3001)

// Rutas
app.get("/", (req, res) => {
    res.status(200).json({ mensaje: 'Bienvenidos a mi aplicacion' })
})

app.use("/api/tasks", TasksRoutes)

export default app;