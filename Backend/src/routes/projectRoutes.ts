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
router.param('projectId', validateProjectExists);

// Crear una nueva tarea dentro de un proyecto
router.post('/:projectId/tasks',
    body('title').notEmpty().withMessage('El título de la tarea es obligatorio'),
    body('description').isLength({ min: 5 }).withMessage('La descripción debe tener al menos 5 caracteres'),
    body('dueDate').isISO8601().withMessage('La fecha de vencimiento debe ser una fecha válida'),
    habdleValidationErrors,
    TaskController.createTask
);


// Obtener todas las tareas de un proyecto
router.get('/:projectId/tasks',
    TaskController.getTasksByProject
);


// Obtener una tarea específica por ID dentro de un proyecto
router.get('/:projectId/tasks/:taskId',
    param('taskId').isMongoId().withMessage('ID de tarea inválido'),
    habdleValidationErrors,
    TaskController.getTaskById
);


// Actualizar una tarea específica por ID dentro de un proyecto
router.put('/:projectId/tasks/:taskId',
    param('taskId').isMongoId().withMessage('ID de tarea inválido'),
    body('title').notEmpty().withMessage('El título de la tarea es obligatorio'),
    body('description').isLength({ min: 5 }).withMessage('La descripción debe tener al menos 5 caracteres'),
    habdleValidationErrors,
    TaskController.updateTask
);


// Eliminar una tarea específica por ID dentro de un proyecto
router.delete('/:projectId/tasks/:taskId',
    param('taskId').isMongoId().withMessage('ID de tarea inválido'),
    habdleValidationErrors,
    TaskController.deleteTask
);

export default router;