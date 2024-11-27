"use client";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Spinner from "../spinner/Spinner";
import CardUserIspCube from "./CardUserIspCube";
import Pagination from "./Pagination";

const IspCubeUsers: React.FC = () => {
  const { users, loading, error } = useSelector((state: any) => state.ispCube);
  const [productsPage, setProductsPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const lastIndex = currentPage * productsPage;
  const firstIndex = lastIndex - productsPage;

  const filteredUsers = users?.filter((user: any) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalProducts = filteredUsers?.length || 0;

  if (loading) return <Spinner title="Cargando usuarios..." />;
  if (error) return <p>Error: {error}</p>;

  return (
    <section>
      {!users ||
      users.lenght === 0 ||
      !filteredUsers ||
      filteredUsers.lenght === 0 ||
      loading ? (
        <Spinner title="Cargando usuarios..." />
      ) : filteredUsers && filteredUsers.length > 0 ? (
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
            {filteredUsers.slice(firstIndex, lastIndex).map((user: any) => (
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
      ) : (
        <p className="text-center text-gray-500">No se encontraron usuarios.</p>
      )}
    </section>
  );
};

export default IspCubeUsers;
