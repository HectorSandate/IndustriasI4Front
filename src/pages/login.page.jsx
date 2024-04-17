import { useContext, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/auth.context";

import { login } from "../services/auth.service";

export default function LoginPage() {
  const [serverMsg, setServerMsg] = useState("");
  const { user, setUser, setIsAuth, isAuth } = useContext(UserContext);

  const nav = useNavigate();

  useEffect(() => {
    if (isAuth) {
      setTimeout(nav, 2000, "/product");
    }
  }, [isAuth]);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  function submitForm(data) {
    login(data).then(
      (res) => {
        if (res.data.token) {
          setUser(res.data);
          setIsAuth(true);
        }

        if (res.data.mensaje) {
          setServerMsg(res.data.mensaje.toUpperCase());
          setTimeout(setServerMsg, 1500, "");
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div className="bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-zinc-900 dark:border-zinc-700">
        <Link className="ml-2 mt-2 block" to={"/"}>
          Regresar
        </Link>
        {serverMsg !== "" && (
          <span className="text-teal-700 text-center bg-teal-400 mx-5 p-2 border border-teal-400 rounded-sm block">
            {serverMsg}
          </span>
        )}
        <h1 className="text-xl w-full block font-bold lsp text-center tracking-widest">
          INICIAR SESION
        </h1>
        <form
          className="space-y-4 md:space-y-6 px-10 mb-4"
          onSubmit={handleSubmit(submitForm)}
        >
          <div>
            <label
              htmlFor="username"
              className="block mb-1 text-sm font-medium text-gray-900 dark:text-white cursor-pointer"
            >
              Nombre de Usuario
            </label>
            <input
              id="username"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-500 outline-none"
              type="text"
              {...register("username", { required: true })}
            />
            {errors.username && (
              <span className="text-teal-700">Este campo es obligatorio</span>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-1 text-sm font-medium text-gray-900 dark:text-white cursor-pointer"
            >
              Contraseña
            </label>
            <input
              id="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-500 outline-none"
              type="password"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <span className="text-teal-700">Este campo es obligatorio</span>
            )}
          </div>
          <input
            className="w-full text-white bg-teal-700 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            type="submit"
            value={"INICIAR SESION"}
          />
        </form>
      </div>
    </div>
  );
}
