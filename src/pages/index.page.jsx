import { Link } from "react-router-dom";

export default function IndexPage() {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">INICIO</h1>
      <div className="flex flex-col space-y-4">
        <Link
          to={"/login"}
          className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
        >
          Ir al Login
        </Link>
        <Link
          to={"/register"}
          className="px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300"
        >
          Ir al Registro
        </Link>
      </div>
    </div>
  );
}
