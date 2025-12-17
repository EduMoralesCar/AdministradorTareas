import type { ProjectFormData } from "@/types/index";
import api from "@/lib/axios";

export async function createProject(formData: ProjectFormData) {
    
    try {
    const  { data } = await api.post("/projects", formData);
    return data;
    } catch (error) {
        console.error("Error creating project:", error);
        throw error;
    }
}