import Task from "../models/Task";


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

export const obtenerTareas = async (req, res) => {

    try {
        const obtenerTareas = await Task.find()
        res.status(200).json({ message: "Tareas", obtenerTareas })
    } catch (error) {
        res.status(500).json({
            message: error.message || "Algo salio mal mientras obtenia las tareas"
        })
    }


}


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

export const TareasRealizadas = async (req, res) => {
    const obtenerTareasHechas = await Task.find({
        hecho: true
    })
    res.status(200).json({ message: "Tareas Realizadas", obtenerTareasHechas })
}

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