import Task from "../models/Task";
import { getPagination } from "../libs/getPagination"

// Crear Tarea
export const crearTarea = async (req, res) => {
    const { titulo, descripcion, hecho } = req.body;

    if (!titulo) {
        return res.status(400).send({ message: "El titulo es requerido" })
    }

    try {
        const nuevaTarea = new Task({
            titulo: titulo,
            descripcion: descripcion,
            hecho: hecho ? hecho : false
        })
        const tareaGuardada = await nuevaTarea.save();
        res.status(200).json({ message: "Tarea creada", tareaGuardada })
    } catch (error) {
        res.status(500).json({
            message: error.message || "Algo salio mal mientras se creaba la tarea"
        })
    }


}

// Obtener todas las tareas
export const obtenerTareas = async (req, res) => {

    // size => Cantidad de elementos  |  page => Cantidad de paginas
    const { size, page, titulo } = req.query

    try {
        // Para usar paginate debemos de pasar dos parametros el primero es una query y segundo son las opciones (cuantos limites de pagina quiere )
        // offset = Cuantas paginas quiero
        // limit = Cantidad de documentos por pagina

        const condicion = titulo
            ? {
                titulo: { $regex: new RegExp(titulo), $options: "i" }
            } : {};

        const { limit, offset } = getPagination(page, size)

        const obtenerTareas = await Task.paginate(condicion, { offset: offset, limit: limit })
        res.status(200).json({
            obtenerTareas
            // totalItems: obtenerTareas.totalDocs,
            // tareas: obtenerTareas.docs,
            // pagianasTotales: obtenerTareas.totalPages,
            // paginaActual: obtenerTareas.page - 1,
            // itemIncial: obtenerTareas.offset,

        })
    } catch (error) {
        res.status(500).json({
            message: error.message || "Algo salio mal mientras obtenia las tareas"
        })
    }


}

// Obtener tarea por Id
export const obtenerTareaId = async (req, res) => {
    const { id } = req.params

    let Tarea;

    try {
        Tarea = await Task.findById(id)
        if (!Tarea) {
            res.status(400).json({
                message: `La tarea con id: ${id} no existe`
            })
        }
        res.status(200).json({ message: "Tarea", Tarea })
    } catch (error) {
        res.status(500).json({
            message: error.message || `Algo salio mal mientras obtenia la tarea con el id: ${id} `
        })
    }



}

// Eliminar tarea
export const eliminarTarea = async (req, res) => {

    const { id } = req.params

    let TareaAEliminar;

    try {

        TareaAEliminar = await Task.findByIdAndDelete(id);

        if (!TareaAEliminar) {
            res.status(400).json({
                message: `La tarea con id: ${id} no existe`
            })
        }
        res.status(200).json({ message: `Tarea: ${TareaAEliminar.titulo}, ha sido eliminada` })
    } catch (error) {
        res.status(500).json({
            message: error.message || `Algo salio mal mientras obtenia la tarea con el id: ${id} `
        })
    }
}

// Obtener tareas realizadas
export const TareasRealizadas = async (req, res) => {
    const obtenerTareasHechas = await Task.find({
        hecho: true
    })
    res.status(200).json({ message: "Tareas Realizadas", obtenerTareasHechas })
}

// Actualizar tarea
export const actualizarTarea = async (req, res) => {
    const { id } = req.params;
    let TareaActualizar;
    try {
        TareaActualizar = await Task.findByIdAndUpdate(id, req.body);
        res.status(200).json({ message: "Tarea actualizada" })
    } catch (error) {
        res.status(400).json({ error: message.error })
    }
}