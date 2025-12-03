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

    static getTasksByProject = async (req: Request, res: Response) => {
        try {
            const tasks = await Task.find({ projectId: req.project?._id }).populate('projectId');
            return res.status(200).json({ tasks });
            //# return res.status(200).json({ tasks: req.project?.tasks || [] });
        } catch (error) {
            return res.status(500).json({ message: (error as Error).message });
        }
    }

    static getTaskById = async (req: Request, res: Response) => {
        try {
            const { taskId } = req.params;
            const task = await Task.findById(taskId).populate('projectId');
           
            if (!task) {
                return res.status(404).json({ message: 'Tarea no encontrada' });
            }
                       
            // Normalizar ambos valores por si `projectId` está poblado (document) o es ObjectId
            const taskProjectId = task.projectId
                ? ((task.projectId as any)._id ? (task.projectId as any)._id.toString() : task.projectId.toString())
                : undefined;
            const reqProjectId = req.project?._id ? req.project._id.toString() : undefined;

            if (!taskProjectId || !reqProjectId || taskProjectId !== reqProjectId) {
                const error = new Error('La tarea no pertenece a este proyecto');
                return res.status(400).json({ message: error.message });
            }

            return res.status(200).json({ task });
        } catch (error) {
            return res.status(500).json({ message: (error as Error).message });
        }
    }
}