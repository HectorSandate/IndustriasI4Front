import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { UserContext } from "../context/auth.context";
import { logout } from "../services/auth.service";
import NavBar from "../components/nav.component";
import { newProduct } from "../services/product.service";
import { getSupplierInfo } from "../services/supplier.service";

export default function NewProductPage() {
  const { setUser, setIsAuth } = useContext(UserContext);
  const [options, setOptions] = useState(null);
  const nav = useNavigate();
  const arr = [];

  useEffect(() => {
    getSupplierInfo().then((res) => {
      for (let i = 0; i < res.data.proveedores.length; i++) {
        arr.push(res.data.proveedores[i].supplier_id);
      }
      setOptions(arr);
    });
  }, []);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  function submitNewProduct(data) {
    console.log(data);
    newProduct(data).then((res) => console.log(res.data));
  }

  function onLogout() {
    logout().then(
      async (data) => {
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
    <>
      <NavBar api_name={"PRODUCTOS"} api_uri={"/product"}>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none"
          onClick={() => onLogout()}
        >
          CERRAR SESIÓN
        </button>
      </NavBar>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <form
          onSubmit={handleSubmit(submitNewProduct)}
          autoComplete="off"
          className="bg-white p-8 rounded-md shadow-md w-full max-w-md"
        >
          <h1 className="text-center text-black text-3xl font-bold mb-8">
            Nuevo Producto
          </h1>
          <div className="mb-4 text-black" >
            <label htmlFor="productCode" className="block mb-2">
              Código del Producto
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              id="productCode"
              type="text"
              {...register("productCode", { required: true })}
            />
          </div>
          <div className="mb-4 text-black">
            <label htmlFor="productName" className="block mb-2">
              Nombre del Producto
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              id="productName"
              type="text"
              {...register("productName", { required: true })}
            />
          </div>
          <div className="mb-4 text-black">
            <label htmlFor="productDesc" className="block mb-2">
              Descripción del Producto
            </label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              id="productDesc"
              rows="3"
              {...register("productDesc", { required: true })}
            ></textarea>
          </div>
          <div className="mb-4 text-black">
            <label htmlFor="productStatus" className="block mb-2">
              Estado del Producto
            </label>
            <select
              id="productStatus"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              {...register("productStatus", { required: true })}
            >
              <option value="agotado">AGOTADO</option>
              <option value="disponible">DISPONIBLE</option>
            </select>
          </div>
          <div className="mb-4 text-black">
            <label htmlFor="productProvider" className="block mb-2">
              Proveedor
            </label>
            <select
              id="productProvider"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              {...register("productProvider", { required: true })}
            >
              <option disabled>Selecciona un Proveedor</option>
              {options !== null ? (
                options.map((item, i) => {
                  return (
                    <option key={i} value={item}>
                      {item}
                    </option>
                  );
                })
              ) : (
                <option disabled>No hay proveedores</option>
              )}
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
          >
            Crear Producto
          </button>
        </form>
      </div>
    </>
  );
}
