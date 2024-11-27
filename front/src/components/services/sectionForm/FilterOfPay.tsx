import { FormValues } from '@/helpers/types';
import { FormikProps } from 'formik';
import React from 'react'

const FilterOfPay:React.FC<{
    formikProps: FormikProps<FormValues>;
    handleFilter: (filters: {
      node_code: any[];
      status: string[];
      debt: string[];
      plan_id: any[];
  }) => void;
  }> = ({formikProps, handleFilter })=> {
  return (
    <div>
    <label>Deuda:</label>
    <div className="flex flex-col">
      {["positive", "negative", "zero"].map((debtType) => (
        <label key={debtType} className="flex items-center gap-2">
          <input
            type="checkbox"
            name="filters.debt"
            value={debtType}
            onChange={(e) => {
              const value = e.target.value;
              const isChecked = e.target.checked;

              const newDebt = isChecked
                ? [...formikProps.values.filters.debt, value]
                : formikProps.values.filters.debt.filter(
                    (d) => d !== value
                  );

              formikProps.setFieldValue("filters.debt", newDebt);
              handleFilter({
                ...formikProps.values.filters,
                debt: newDebt,
              });
            }}
            checked={formikProps.values.filters.debt.includes(
              debtType
            )}
          />
          {debtType === "positive"
            ? "Deudores"
            : debtType === "negative"
            ? "Dinero a favor"
            : "Sin saldo"}
        </label>
      ))}
    </div>
  </div>
  )
}

export default FilterOfPay