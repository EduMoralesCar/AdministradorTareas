import type { Request, Response } from 'express';
import Task from '../models/Task';


export class TaskController {
    // Método para crear una nueva tarea
    static createTask = async (req: Request, res: Response) => {
        try {
            const project = req.project;

            if (!project) {
                return res.status(400).json({ message: 'Proyecto no encontrado en la solicitud' });
            }

            // Asegurar que la tarea tenga el projectId asociado
            const task = new Task({ ...req.body, projectId: project._id });
            /** await task.save(); */

            // Asociar la tarea al proyecto
            project.tasks.push(task._id);
            /** await project.save();*/

            // Guardar ambos documentos
            await Promise.all([task.save(), project.save()]);


            return res.status(201).json({ task });
        } catch (error) {
            return res.status(500).json({ message: (error as Error).message });
        }
    }

    static getTasksByProject = async (req: Request, res: Response) => {
        try {
            const tasks = await Task.find({ projectId: req.project?._id });
            return res.status(200).json({ tasks });
            //# return res.status(200).json({ tasks: req.project?.tasks || [] });
        } catch (error) {
            return res.status(500).json({ message: (error as Error).message });
        }
    }
}