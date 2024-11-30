import { FormValues } from "@/helpers/types";
import { Field, FormikProps } from "formik";
import React from "react";

const FilterOfNodo: React.FC<{
  users: any[];
  formikProps: FormikProps<FormValues>;
  handleFilter: (filters: {
    node_code: any[];
    status: string[];
    debt: string[];
    plan_name: any[];
  }) => void;
}> = ({ users, formikProps, handleFilter }) => {
  return (
    <div className="relative w-full flex flex-col">
      <span className="text-custom-white text-sm">Nodos</span>

      <div className="flex items-center">
        <Field
          type="text"
          name="filters.node_code"
          disabled
          value={formikProps.values.filters.node_code.join(", ")}
          className={`border-[1.8px] border-neutral-700 bg-transparent outline-none py-2 px-3 rounded w-full
        `}
        />
        <button
          type="button"
          onClick={() =>
            formikProps.setFieldValue(
              "filters.showNodeDropdown",
              !formikProps.values.filters.showNodeDropdown
            )
          }
          className="ml-2 bg-custom-red text-white p-2 rounded"
        >
          {formikProps.values.filters.showNodeDropdown ? "▲" : "▼"}
        </button>
      </div>

      {/* Dropdown con opciones */}
      {formikProps.values.filters.showNodeDropdown && (
        <div className="absolute top-full mt-2 w-full max-h-40 overflow-y-auto bg-[#2b2b2b] border border-neutral-700 rounded z-10">
          {[
            ...new Set(
              users.map((user) => user.node_code).filter((node) => node?.trim())
            ),
          ].map((node) => (
            <div
              key={node}
              className={`p-2 cursor-pointer ${
                formikProps.values.filters.node_code.includes(node)
                  ? "bg-gray-600"
                  : ""
              }`}
              onClick={() => {
                const updatedNodeCode =
                  formikProps.values.filters.node_code.includes(node)
                    ? formikProps.values.filters.node_code.filter(
                        (n) => n !== node
                      )
                    : [...formikProps.values.filters.node_code, node];

                formikProps.setFieldValue("filters.node_code", updatedNodeCode);
                handleFilter({
                  ...formikProps.values.filters,
                  node_code: updatedNodeCode,
                });
              }}
            >
              {node}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterOfNodo;
