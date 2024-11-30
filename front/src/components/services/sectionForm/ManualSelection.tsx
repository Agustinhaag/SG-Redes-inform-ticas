import React, { useState } from "react";
import ToggleSwitch from "./ToggleSwitch";
import Spinner from "../../spinner/Spinner";
import Pagination from "../Pagination";
import { useSelector } from "react-redux";

const ManualSelection: React.FC<{
  users: any[];
  setManualSelection: React.Dispatch<React.SetStateAction<string[]>>;
  manualSelection: string[];
  showManualSelection: boolean;
  setShowManualSelection: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({
  users,
  manualSelection,
  setManualSelection,
  setShowManualSelection,
  showManualSelection,
}) => {
  const { loading } = useSelector((state: any) => state.ispCube);
  const [productsPage, setProductsPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const lastIndex = currentPage * productsPage;
  const firstIndex = lastIndex - productsPage;
  const filteredUsers = users?.filter((user: any) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalProducts = filteredUsers?.length || 0;
  const toggleManualSelection = (uniqueKey: string) => {
    setManualSelection((prev) =>
      prev.includes(uniqueKey)
        ? prev.filter((key) => key !== uniqueKey)
        : [...prev, uniqueKey]
    );
  };
  return (
    <div>
      <ToggleSwitch onChange={(state) => setShowManualSelection(state)} />

      {showManualSelection && (
        <>
          <div className="w-full flex justify-center my-4">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar usuarios por nombre..."
              className="border text-black rounded px-3 py-2 w-1/2 focus:outline-none focus:ring-2 focus:ring-custom-blue"
            />
          </div>
          {loading ? (
            <Spinner title="Cargando clientes" />
          ) : filteredUsers && filteredUsers.length > 0 ? (
            <>
              <div className="w-full mb-4">
                <h3 className="font-semibold">Selección Manual</h3>

                <div className="overflow-y-scroll max-h-40">
                  {filteredUsers.slice(firstIndex, lastIndex).map((user) => {
                    const phone = user.phones[0]?.number;
                    const uniqueKey = `${user.id}-${phone}`;

                    return (
                      <div key={uniqueKey} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={manualSelection.includes(uniqueKey)}
                          onChange={() => toggleManualSelection(uniqueKey)}
                        />
                        <span>
                          {user.name} - {phone}
                        </span>
                      </div>
                    );
                  })}
                  <Pagination
                    productsPage={productsPage}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    totalProducts={totalProducts}
                  />
                </div>
              </div>
            </>
          ) : (
            <p className="text-center text-gray-500">
              No se encontraron usuarios.
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default ManualSelection;
