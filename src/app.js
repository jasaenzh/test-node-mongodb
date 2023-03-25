import express from 'express';
import TasksRoutes from './routes/task.routes';
import morgan from 'morgan';
import cors from 'cors';

const app = express();

// Configurando el puerto de escucha
app.set('port', process.env.PORT || 3001);

//! Middlewares
// cors se utiliza para permitir (vacio) o no permitir peticiones de ciertas IP o URL
app.use(cors({
    // origen:"http://localhost"
}))
app.use(morgan('dev'));
app.use(express.json());
/*
express.urlencoded() es un middleware que permite a una aplicación Node.js
 leer los datos enviados desde un formulario HTML codificado en URL en una solicitud HTTP POST o PUT
*/
app.use(express.urlencoded({ extended: false }))

// Rutas
app.get("/", (req, res) => {
    res.status(200).json({ mensaje: 'Bienvenidos a mi aplicacion' });
})

app.use("/api/tasks", TasksRoutes);

export default app;