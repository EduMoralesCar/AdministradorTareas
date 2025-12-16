import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

export default function CreateProjectView() {

    const initialValues = {
        name: '',
        description: ''
    };


    const { register, handleSubmit, formState: { errors } } = useForm({defaultValues: {
        name: '',
        description: ''
    }});

    const onSubmit = (data: any) => {
        console.log(data);
    };

  return (
    <>
    <div className="p-4">
      <h1 className="text-5xl font-black mb-4">Crear Proyecto</h1>
      <p className="text-2xl font-light text-gray-500 mt-5">Llena el siguiente formulario para crear un nuevo proyecto</p>
      
      <nav className="mt-10 flex justify-between items-center">
        <Link to="/" className="bg-purple-400 hover:bg-purple-600 text-white font-bold py-3 px-10 text-xl cursor-pointer transition-colors duration-300">Volver a Proyectos</Link>
      </nav>
    </div>
    </>
  )
}
