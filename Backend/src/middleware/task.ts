import type { Request, Response, NextFunction } from 'express';
import Task, {ITask} from '../models/Task';


declare global {
    namespace Express {
        interface Request {
            task?: ITask;
        }
    }
}

export async function validateTaskExists (req: Request, res: Response, next: NextFunction) {
    try {
        const { taskId } = req.params;
        const task = await Task.findById(taskId);
        if (!task) {
            const error = new Error('Tarea no encontrada');
            return res.status(404).json({ message: error.message });
        }
        req.task = task;
        next();
    } catch (error) {
        return res.status(500).json({ message: "Tarea no encontrada" });
    }
}