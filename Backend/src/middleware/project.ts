import type { Request, Response, NextFunction } from 'express';
import Project, { IProject } from '../models/Project';


declare global {
    namespace Express {
        interface Request {
            project?: IProject;
        }
    }
}

export async function validateProjectExists (req: Request, res: Response, next: NextFunction) {
    try {
        const { projectId } = req.params;

        if (!projectId) {
            return res.status(400).json({ message: 'projectId faltante en parámetros' });
        }

        const project = await Project.findById(projectId);
        if (!project) {
            const error = new Error('Proyecto no encontrado');
            return res.status(404).json({ message: error.message });
        }
        req.project = project;
        next();
    } catch (error) {
        return res.status(500).json({ message: "Proyecto no encontrado" });
    }
}