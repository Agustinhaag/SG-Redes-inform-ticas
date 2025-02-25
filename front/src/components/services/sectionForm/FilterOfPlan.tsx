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
    plan_name: string[];
  }) => void;
}> = ({ users, formikProps, handleFilter }) => {
  
  const uniquePlans = [
    ...new Set(
      users.flatMap((user) =>
        user.plan_name
          ? user.plan_name.split("|").map((plan:any) => plan.trim()) // Dividir y limpiar espacios
          : []
      )
    ),
  ];

  return (
    <div className="relative text-custom-white sm:w-1/2 sm:h-full w-full flex flex-col">
      <span className="text-sm">Planes</span>

      <div className="flex items-center">
        <Field
          type="text"
          name="filters.plan_name"
          disabled
          value={formikProps.values.filters.plan_name.join(", ")}
          className="border-[1.8px] border-neutral-700 bg-transparent outline-none py-2 px-3 rounded w-full"
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

      {formikProps.values.filters.showPlanDropdown && (
        <div className="absolute top-full mt-2 w-full max-h-40 overflow-y-auto bg-[#2b2b2b] border border-neutral-700 rounded z-10">
          {uniquePlans.map((planName, index) => (
            <div
              key={index}
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

                formikProps.setFieldValue("filters.plan_name", updatedPlanName);
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
