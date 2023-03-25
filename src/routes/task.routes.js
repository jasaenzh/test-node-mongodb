import { Router } from "express";

import { obtenerTareas, crearTarea, obtenerTareaId, eliminarTarea, TareasRealizadas, actualizarTarea } from "../controllers/task.controller"

const router = Router();

// Crear Tarea
router.post('/', crearTarea);

// Obtener todas las tareas
router.get('/', obtenerTareas);

// Obtener todas las tareas realizadas
router.get('/realizadas', TareasRealizadas)

// Obtener tareas por Id
router.get('/:id', obtenerTareaId)

// Eliminar una tarea
router.delete('/:id', eliminarTarea)

// Actualizar Tarea
router.put('/:id', actualizarTarea)

export default router;