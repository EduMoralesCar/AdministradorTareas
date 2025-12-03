import mongoose, { Schema, Document } from "mongoose";

const taskStatus = {
    PENDING: 'pending',
    ON_HOLD: 'onHold',
    IN_PROGRESS: 'inProgress',
    UNDER_REVIEW: 'underReview',
    COMPLETED: 'completed',
}

export type TaskStatus = typeof taskStatus[keyof typeof taskStatus];

export interface ITask extends Document {
    title: string;
    description: string;
    status: TaskStatus;
    dueDate: Date;
    projectId: mongoose.Types.ObjectId;
}

export const TaskSchema: Schema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        enum: Object.values(taskStatus),
        default: taskStatus.PENDING, // Estado por defecto, cada vez que se crea una tarea es 'pending'
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    },
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    }
}, { timestamps: true }); // Cada vez que se crea un registro, se guardan createdAt y updatedAt

// Definimos el modelo Task
const Task = mongoose.model<ITask>('Task', TaskSchema);
export default Task;