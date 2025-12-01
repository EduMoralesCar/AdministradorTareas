import mongoose from 'mongoose';
import colors from 'colors';
import { exit } from 'node:process';

export const connectDB = async () => {
    try {
        const mongoUri = process.env.DATABASE_URL;
        if (!mongoUri) {
            console.error(colors.red('Error: DATABASE_URL no está definida en el entorno'));
            exit(1);
        }

        const {connection} = await mongoose.connect(mongoUri);
        const url = `${connection.host}`;
        console.log(colors.yellow.bold(`MongoDB Conectado en: ${url}`));
    } catch (error) {
        console.error(colors.red(`Error al conectar a MongoDB: ${(error as Error).message}`));
        exit(1);
    }
}