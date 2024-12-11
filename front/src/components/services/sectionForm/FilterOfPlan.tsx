import { FormValues } from "@/helpers/types";
import { Field, FormikProps } from "formik";
import React from "react";

const FilterOfPlan: React.FC<{
  users: any[];
  formikProps: FormikProps<FormValues>;
  handleFilter: (filters: {
    node_code: any[];
    status: string[];
    debt: string[];
    plan_name: string[]; // Cambiado a plan_name
  }) => void;
}> = ({ users, formikProps, handleFilter }) => {
  return (
    <div className="relative sm:w-1/2 sm:h-full w-full flex flex-col">
      <span className="text-custom-white text-sm">Planes</span>

      <div className="flex items-center">
        {/* Input deshabilitado que muestra los plan_name seleccionados */}
        <Field
          type="text"
          name="filters.plan_name"
          disabled
          value={formikProps.values.filters.plan_name.join(", ")}
          className={`border-[1.8px] border-neutral-700 bg-transparent outline-none py-2 px-3 rounded w-full`}
        />
        <button
          type="button"
          onClick={() =>
            formikProps.setFieldValue(
              "filters.showPlanDropdown",
              !formikProps.values.filters.showPlanDropdown
            )
          }
          className="ml-2 bg-custom-red text-white py-2 px-3 rounded bg-black hover:bg-neutral-950"
        >
          {formikProps.values.filters.showPlanDropdown ? "▲" : "▼"}
        </button>
      </div>

      {/* Dropdown con opciones */}
      {formikProps.values.filters.showPlanDropdown && (
        <div className="absolute top-full mt-2 w-full max-h-40 overflow-y-auto bg-[#2b2b2b] border border-neutral-700 rounded z-10">
          {[...new Set(users.flatMap((user) => user.plan_name))]
            .filter((planName) => planName !== null) // Filtrar valores nulos
            .map((planName, index) => (
              <div
                key={index} // Clave única
                className={`p-2 cursor-pointer ${
                  formikProps.values.filters.plan_name.includes(planName)
                    ? "bg-gray-600"
                    : ""
                }`}
                onClick={() => {
                  const updatedPlanName =
                    formikProps.values.filters.plan_name.includes(planName)
                      ? formikProps.values.filters.plan_name.filter(
                          (p) => p !== planName
                        )
                      : [...formikProps.values.filters.plan_name, planName];

                  // Actualiza el estado al hacer clic
                  formikProps.setFieldValue(
                    "filters.plan_name",
                    updatedPlanName
                  );
                  handleFilter({
                    ...formikProps.values.filters,
                    plan_name: updatedPlanName,
                  });
                }}
              >
                {planName}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default FilterOfPlan;
