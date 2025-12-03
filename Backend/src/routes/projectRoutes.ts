import { Router } from 'express';
import { body, param } from 'express-validator';
import { ProjectController } from '../controllers/ProjectController';
import { habdleValidationErrors } from '../middleware/validation';
import { TaskController } from '../controllers/TaskController';
import { validateProjectExists } from '../middleware/project';


const router = Router();

// Definimos las rutas relacionadas con los proyectos aquí
// Crear un nuevo proyecto
router.post('/', 
    body('projectName').notEmpty().withMessage('El nombre del proyecto es obligatorio'),
    body('clientName').notEmpty().withMessage('El nombre del cliente es obligatorio'),
    body('description').isLength({ min: 10 }).withMessage('La descripción debe tener al menos 10 caracteres'),
    habdleValidationErrors,
    ProjectController.createProject
);

// Obtener todos los proyectos
router.get('/', ProjectController.getProjects);

// Obtener un proyecto por ID y validar el ID
router.get('/:id',
    param('id').isMongoId().withMessage('ID de proyecto inválido'), 
    habdleValidationErrors,
    ProjectController.getProjectById);

// Actualizar un proyecto por ID con validación
router.put('/:id',
    param('id').isMongoId().withMessage('ID de proyecto inválido'),
    body('projectName').optional().notEmpty().withMessage('El nombre del proyecto no puede estar vacío'),
    body('clientName').optional().notEmpty().withMessage('El nombre del cliente no puede estar vacío'),
    body('description').optional().isLength({ min: 10 }).withMessage('La descripción debe tener al menos 10 caracteres'),
    habdleValidationErrors,
    ProjectController.updateProject
);

// Eliminar un proyecto por ID con validación
router.delete('/:id',
    param('id').isMongoId().withMessage('ID de proyecto inválido'),
    habdleValidationErrors,
    ProjectController.deleteProject
);


/** Routes for Tasks */
// Creación de tareas
router.post('/:projectId/tasks',
    validateProjectExists,
    body('title').notEmpty().withMessage('El título de la tarea es obligatorio'),
    body('description').isLength({ min: 5 }).withMessage('La descripción debe tener al menos 5 caracteres'),
    body('dueDate').isISO8601().withMessage('La fecha de vencimiento debe ser una fecha válida'),
    habdleValidationErrors,
    TaskController.createTask
);


router.get('/:projectId/tasks',
    validateProjectExists,
    TaskController.getTasksByProject
);

export default router;