import { FormValues } from "@/helpers/types";
import { FormikProps } from "formik";
import React from "react";

const FilterOfStatus: React.FC<{
  users: any[];
  formikProps: FormikProps<FormValues>;
  handleFilter: (filters: {
    node_code: any[];
    status: string[];
    debt: string[];
    plan_name: any[];
  }) => void;
}> = ({ users, formikProps, handleFilter }) => {
  // Obtener los estados únicos
  const uniqueStatuses = [
    ...new Set(users && users.map((user) => user.status)),
  ];

  // Manejar cambios en los checkboxes
  const handleStatusChange = (status: string) => {
    const currentStatuses = formikProps.values.filters.status as string[];

    const updatedStatuses = currentStatuses.includes(status)
      ? currentStatuses.filter((s) => s !== status) // Remover si está seleccionado
      : [...currentStatuses, status]; // Agregar si no está seleccionado

    // Actualizar valores en Formik y ejecutar filtro
    formikProps.setFieldValue("filters.status", updatedStatuses);
    handleFilter({
      ...formikProps.values.filters,
      status: updatedStatuses,
    });
  };

  return (
    <div className="sm:w-1/2 w-full text-custom-white ">
      <label className="text-sm">Estado:</label>
      <div className="flex flex-wrap gap-4">
        {uniqueStatuses.map((status) => (
          <div key={status} className="flex items-center gap-1">
            <input
              type="checkbox"
              id={`status-${status}`}
              name="filters.status"
              checked={(formikProps.values.filters.status as string[]).includes(
                status
              )}
              onChange={() => handleStatusChange(status)}
            />
            <label htmlFor={`status-${status}`} className="text-neutral-300">
              {status}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterOfStatus;
