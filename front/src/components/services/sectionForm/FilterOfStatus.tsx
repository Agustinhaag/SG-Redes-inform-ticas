import { FormValues } from '@/helpers/types';
import { FormikProps } from 'formik';
import React from 'react';

const FilterOfStatus: React.FC<{
  users: any[];
  formikProps: FormikProps<FormValues>;
  handleFilter: (filters: {
    node_code: any[];
    status: string[];
    debt: string[];
    plan_id: any[];
  }) => void;
}> = ({ users, formikProps, handleFilter }) => {
  // Obtener los estados únicos
  const uniqueStatuses = [...new Set(users.map((user) => user.status))];

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
    <div>
      <label>Estado:</label>
      <div className="flex flex-col gap-2">
        {uniqueStatuses.map((status) => (
          <div key={status} className="flex items-center">
            <input
              type="checkbox"
              id={`status-${status}`}
              name="filters.status"
              checked={(formikProps.values.filters.status as string[]).includes(
                status
              )}
              onChange={() => handleStatusChange(status)}
            />
            <label htmlFor={`status-${status}`} className="ml-2">
              {status}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterOfStatus;