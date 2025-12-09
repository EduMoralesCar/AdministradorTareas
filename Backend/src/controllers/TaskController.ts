import type { Request, Response } from 'express';
import Task from '../models/Task';
import mongoose from 'mongoose';


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


    // Método para obtener todas las tareas de un proyecto
    static getTasksByProject = async (req: Request, res: Response) => {
        try {
            const tasks = await Task.find({ projectId: req.project?._id }).populate('projectId');
            return res.status(200).json({ tasks });
            //# return res.status(200).json({ tasks: req.project?.tasks || [] });
        } catch (error) {
            return res.status(500).json({ message: (error as Error).message });
        }
    }


    // Método para obtener una tarea por ID
    static getTaskById = async (req: Request, res: Response) => {
        try {
            // Normalizar ambos valores por si `projectId` está poblado (document) o es ObjectId
            const taskProjectId = req.task?.projectId
                ? ((req.task.projectId as any)._id ? (req.task.projectId as any)._id.toString() : req.task.projectId.toString())
                : undefined;
            const reqProjectId = req.project?._id ? req.project._id.toString() : undefined;

            if (!taskProjectId || !reqProjectId || taskProjectId !== reqProjectId) {
                const error = new Error('La tarea no pertenece a este proyecto');
                return res.status(400).json({ message: error.message });
            }

            return res.status(200).json({ task: req.task });
        } catch (error) {
            return res.status(500).json({ message: (error as Error).message });
        }
    }


    // Método para actualizar una tarea
    static updateTask = async (req: Request, res: Response) => {
        try {
            // Verificar que la tarea pertenece al proyecto
            if (req.task!.projectId.toString() !== req.project?._id.toString()) {
                const error = new Error('La tarea no pertenece a este proyecto');
                return res.status(400).json({ message: error.message });
            }
            // Actualizar los campos de la tarea
            req.task!.title = req.body.title || req.task!.title;
            req.task!.description = req.body.description || req.task!.description;
            if (req.body.dueDate) {
                req.task!.dueDate = req.body.dueDate;
            }
            await req.task!.save();

            return res.status(200).json({ task: req.task });
        } catch (error) {
            return res.status(500).json({ message: (error as Error).message });
        }
    }


    // Método para eliminar una tarea
    static deleteTask = async (req: Request, res: Response) => {
        try {
            // Verificar que la tarea pertenece al proyecto
            if (req.task!.projectId.toString() !== req.project?._id.toString()) {
                const error = new Error('La tarea no pertenece a este proyecto');
                return res.status(400).json({ message: error.message });
            }
            // Eliminar 1 tarea de la referencia de la tarea del proyecto
            req.project!.tasks = req.project!.tasks.filter(tid => tid.toString() !== req.task!._id.toString());
            await Promise.all([req.task!.deleteOne(), req.project?.save()]);
            return res.status(200).json({ message: 'Tarea eliminada correctamente' });

        } catch (error) {
            return res.status(500).json({ message: (error as Error).message });
        }
    }


    // Método para actualizar el estado de una tarea
    static updateTaskStatus = async (req: Request, res: Response) => {
        try {
            const { status } = req.body;

            // Verificar que la tarea pertenece al proyecto
            if (req.task!.projectId.toString() !== req.project?._id.toString()) {
                const error = new Error('La tarea no pertenece a este proyecto');
                return res.status(400).json({ message: error.message });
            }
            // Actualizar el estado de la tarea
            req.task!.status = status;
            await req.task!.save();
            return res.status(200).json({ task: req.task });
        } catch (error) {
            return res.status(500).json({ message: (error as Error).message });
        }
    }
}