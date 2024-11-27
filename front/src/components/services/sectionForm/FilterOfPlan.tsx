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
    plan_id: any[];
  }) => void;
}> = ({ users, formikProps, handleFilter }) => {
  return (
    <div className="relative w-full flex flex-col">
      <span className="text-custom-white text-sm">Planes</span>

      <div className="flex items-center">
        {/* Input deshabilitado que muestra los plan_id seleccionados */}
        <Field
          type="text"
          name="filters.plan_id"
          disabled
          value={formikProps.values.filters.plan_id.join(", ")}
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
          className="ml-2 bg-custom-red text-white p-2 rounded"
        >
          {formikProps.values.filters.showPlanDropdown ? "▲" : "▼"}
        </button>
      </div>

      {/* Dropdown con opciones */}
      {formikProps.values.filters.showPlanDropdown && (
        <div className="absolute top-full mt-2 w-full max-h-40 overflow-y-auto bg-[#2b2b2b] border border-neutral-700 rounded z-10">
          {[
            ...new Set(
              users.flatMap((user) =>
                user.connections?.map((connection: any) => connection.plan_id)
              )
            ),
          ]
            .filter((planId) => planId !== null) // Filtrar valores nulos
            .map((planId) => (
              <div
                key={planId}
                className={`p-2 cursor-pointer ${
                  formikProps.values.filters.plan_id.includes(planId)
                    ? "bg-gray-600"
                    : ""
                }`}
                onClick={() => {
                  const updatedPlanId =
                    formikProps.values.filters.plan_id.includes(planId)
                      ? formikProps.values.filters.plan_id.filter(
                          (p) => p !== planId
                        )
                      : [...formikProps.values.filters.plan_id, planId];

                  formikProps.setFieldValue("filters.plan_id", updatedPlanId);
                  handleFilter({
                    ...formikProps.values.filters,
                    plan_id: updatedPlanId,
                  });
                }}
              >
                {`Plan ${planId}`}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default FilterOfPlan;
