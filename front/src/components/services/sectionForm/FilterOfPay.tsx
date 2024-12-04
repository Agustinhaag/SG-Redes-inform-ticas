import { FormValues } from '@/helpers/types';
import { FormikProps } from 'formik';
import React from 'react'

const FilterOfPay:React.FC<{
    formikProps: FormikProps<FormValues>;
    handleFilter: (filters: {
      node_code: any[];
      status: string[];
      debt: string[];
      plan_name: any[];
  }) => void;
  }> = ({formikProps, handleFilter })=> {
  return (
    <div className='w-1/2 text-custom-white'>
    <label className='text-sm'>Deuda:</label>
    <div className="flex gap-4">
      {["positive", "negative", "zero"].map((debtType) => (
        <label key={debtType} className="flex items-center gap-1 text-neutral-300">
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