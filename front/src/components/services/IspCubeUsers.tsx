"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Spinner from "../spinner/Spinner";
import CardUserIspCube from "./CardUserIspCube";
import Pagination from "./Pagination";
import Cookies from "js-cookie";
import { fetchAllUsersIspCube } from "@/helpers/fetchIspCube";
import { IUser } from "@/helpers/types";

const IspCubeUsers: React.FC = () => {
  const tokenIspCube: string = useSelector(
    (state: any) => state.user.tokenIspCube
  );
  const [users, setUsers] = useState<any[]>([]);
  const [usersFilter, setUsersFilter] = useState<any[]>([]);
  const [productsPage, setProductsPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const url = process.env.NEXT_PUBLIC_URL;
  const token = Cookies.get("token");
  const dataUser: IUser = useSelector((state: any) => state.user.user);

  const lastIndex = currentPage * productsPage;
  const firstIndex = lastIndex - productsPage;

  useEffect(() => {
    fetchAllUsersIspCube(url!, dataUser.email, token!, tokenIspCube!).then(
      (res) => {
        setUsers(res);
        setUsersFilter(res); // Inicia con todos los usuarios visibles.
      }
    );
  }, [url, dataUser, token, tokenIspCube]);

  useEffect(() => {
    const filtered = users.filter((user: any) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setUsersFilter(filtered);
  }, [users, searchTerm]);

  const totalProducts = usersFilter.length;

  return (
    <>
      {tokenIspCube ? (
        <section>
          <h2>Lista de clientes</h2>
          {!users || users.length === 0 ? (
            <Spinner title="Cargando usuarios..." />
          ) : (
            <div>
              <div className="w-full flex justify-center my-4">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Buscar usuarios por nombre..."
                  className="border text-black rounded px-3 py-2 w-1/2 focus:outline-none focus:ring-2 focus:ring-custom-blue"
                />
              </div>
              <div>
                {/* Usuarios filtrados y paginados */}
                {usersFilter.slice(firstIndex, lastIndex).map((user: any) => (
                  <CardUserIspCube user={user} key={user.id} />
                ))}

                {/* Paginación */}
                <Pagination
                  productsPage={productsPage}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  totalProducts={totalProducts}
                />
              </div>
            </div>
          )}
        </section>
      ) : (
        <h2>Debe ingresar en un sistema para poder operar</h2>
      )}
    </>
  );
};

export default IspCubeUsers;
