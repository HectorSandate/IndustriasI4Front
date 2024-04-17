import { useContext } from "react";
import { Link } from "react-router-dom";

import NavBar from "../components/nav.component";
import { UserContext } from "../context/auth.context";
import { logout } from "../services/auth.service";

export default function ProductPage() {
  const { setUser, setIsAuth } = useContext(UserContext);

  function onLogout() {
    logout().then(
      (data) => {
        console.log(data.data);
        setUser(null);
        setIsAuth(false);
        setTimeout(nav, 2000, "/");
      },
      (err) => {
        console.log(err);
      }
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar api_name={"proveedores"} api_uri={"/supplier"}>
        <button
          className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none"
          onClick={() => onLogout()}
        >
          CERRAR SESIÓN
        </button>
      </NavBar>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-8">PRODUCTOS</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
            <svg
              className="w-12 h-12 text-blue-500 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            <Link
              to={"/product/new"}
              className="text-lg font-semibold text-blue-500 hover:text-blue-600"
            >
              AÑADIR PRODUCTOS
            </Link>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
            <svg
              className="w-12 h-12 text-green-500 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
            <Link
              to={"/product/view"}
              className="text-lg font-semibold text-green-500 hover:text-green-600"
            >
              VER PRODUCTOS
            </Link>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
            <svg
              className="w-12 h-12 text-yellow-500 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
            <Link
              to={"/product/update"}
              className="text-lg font-semibold text-yellow-500 hover:text-yellow-600"
            >
              MODIFICAR PRODUCTOS
            </Link>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
            <svg
              className="w-12 h-12 text-red-500 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
            <Link
              to={"/product/delete"}
              className="text-lg font-semibold text-red-500 hover:text-red-600"
            >
              ELIMINAR PRODUCTOS
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
