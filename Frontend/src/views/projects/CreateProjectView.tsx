import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import ProjectForm from "@/components/projects/ProjectForm";
import type { ProjectFormData } from "@/types/index";
import { createProject } from "@/api/ProjectAPI";

export default function CreateProjectView() {

  const initialValues: ProjectFormData = {
    projectName: '',
    clientName: '',
    description: ''
  };


  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      projectName: initialValues.projectName,
      clientName: initialValues.clientName,
      description: initialValues.description
    }
  });

  const handleForm = (data: ProjectFormData) => {
    createProject(data);
  };


  return (
    <>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl font-black mb-4">Crear Proyecto</h1>
        <p className="text-2xl font-light text-gray-500 mt-5">Llena el siguiente formulario para crear un nuevo proyecto</p>

        <nav className="mt-10 flex justify-between items-center">
          <Link to="/" className="bg-purple-400 hover:bg-purple-600 text-white font-bold py-3 px-10 text-xl cursor-pointer transition-colors duration-300">Volver a Proyectos</Link>
        </nav>

        <form
          className="mt-10 bg-white shadow-jg p-10 rounded-lg"
          onSubmit={handleSubmit(handleForm)}
          noValidate
        >
          <ProjectForm register={register} errors={errors} />

          <input
            type="submit"
            value="Crear Proyecto"
            className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold p-3 px-10 cursor-pointer transition-colors duration-300 w-full uppercase"
          />

        </form>

      </div>
    </>
  )
}
