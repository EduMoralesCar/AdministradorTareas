import { Request, Response } from 'express';
import Project from '../models/Project';

export class ProjectController {

    // Crear un nuevo proyecto
    static createProject = async (req: Request, res: Response) => {

        const project = new Project(req.body);

        try {
            await project.save();
            res.status(201).json({ message: 'Proyecto creado exitosamente', project });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al crear el proyecto' });
        }
    }


    // Obtener todos los proyectos
    static getProjects = async (req: Request, res: Response) => {

        try {
            const projects = await Project.find({});
            res.json(projects);
        } catch (error) {
            console.error(error);
        }

        res.send('Lista de proyectos desde el controlador');
    }


    // Obtener un proyecto por ID y validar el ID
    static getProjectById = async (req: Request, res: Response) => {
        const projectId = req.params.id;
        try {
            const project = await Project.findById(projectId).populate('tasks');
            if (!project) {
                return res.status(404).json({ message: 'Proyecto no encontrado' });
            }
            res.json(project);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al obtener el proyecto' });
        }
    }


    // Actualizar un proyecto por ID con validación
    static updateProject = async (req: Request, res: Response) => {
        const projectId = req.params.id;
        try {
            const updatedProject = await Project.findById(projectId, { new: true });
            if (!updatedProject) {
                return res.status(404).json({ message: 'Proyecto no encontrado' });
            }

            updatedProject.projectName = req.body.projectName
            updatedProject.description = req.body.description
            updatedProject.clientName = req.body.clientName

            await updatedProject.save();
            res.json(updatedProject); // Enviar el proyecto actualizado como respuesta
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al actualizar el proyecto' });
        }
    }


    // Eliminar un proyecto por ID con validación
    static deleteProject = async (req: Request, res: Response) => {
        const projectId = req.params.id;
        try {
            const deletedProject = await Project.findById(projectId);
            await deletedProject.deleteOne();

            if (!deletedProject) {
                return res.status(404).json({ message: 'Proyecto no encontrado' });
            }
            res.json({ message: 'Proyecto eliminado exitosamente' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al eliminar el proyecto' });
        }
    }
}