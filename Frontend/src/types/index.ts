import { z } from 'zod'

/** Project schema */
export const ProjectSchema = z.object({
    _id: z.string(),
    projectName: z.string().min(1, 'El Titulo del Proyecto es obligatorio'),
    clientName: z.string().min(1, 'El Nombre del Cliente es obligatorio'),
    description: z.string().min(1, 'Una descripción del proyecto es obligatoria'),
})

export type Project = z.infer<typeof ProjectSchema>
export type ProjectFormData = Pick<Project, 'projectName' | 'clientName' | 'description'>