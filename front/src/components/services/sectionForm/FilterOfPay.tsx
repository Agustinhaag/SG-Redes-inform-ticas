import { FormValues } from "@/helpers/types";
import { FormikProps } from "formik";
import React from "react";

const FilterOfPay: React.FC<{
  formikProps: FormikProps<FormValues>;
  handleFilter: (filters: {
    node_code: any[];
    status: string[];
    debt: string[];
    plan_name: any[];
  }) => void;
}> = ({ formikProps, handleFilter }) => {
  return (
    <div className="sm:w-1/2 w-full text-custom-white">
      <label className="text-sm">Deuda:</label>
      <div className="flex gap-4 flex-wrap">
        {/* Solo mostramos "Deudores" */}
        <label className="flex items-center gap-1 text-neutral-300">
          <input
            type="checkbox"
            name="filters.debt"
            value="positive"
            onChange={(e) => {
              const isChecked = e.target.checked;
              const newDebt = isChecked ? ["positive"] : [];

              formikProps.setFieldValue("filters.debt", newDebt);
              handleFilter({
                ...formikProps.values.filters,
                debt: newDebt,
              });
            }}
            checked={formikProps.values.filters.debt.includes("positive")}
          />
          Deudores
        </label>
      </div>
    </div>
  );
};

export default FilterOfPay;
