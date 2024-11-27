import { Form, Formik } from "formik";
import React, { useState } from "react";
import ContainerInput from "../forms/ContainerInput";
import ButtonLogin from "../forms/ButtonLogin";
import Cookies from "js-cookie";
import "../../styles/forms.css";
import { useSelector } from "react-redux";
import ManualSelection from "./sectionForm/ManualSelection";
import { FormValues } from "@/helpers/types";
import FilterOfNodo from "./sectionForm/FilterOfNodo";
import FilterOfStatus from "./sectionForm/FilterOfStatus";
import FilterOfPay from "./sectionForm/FilterOfPay";
import FilterOfPlan from "./sectionForm/FilterOfPlan";
import { validateSendMessage } from "@/helpers/validateForms";
import { validateSendAll } from "@/helpers/fetchSendMessage";

const FormNewMessage: React.FC<{
  setViewModalMessage: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setViewModalMessage }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const users: any[] = useSelector((state: any) => state.ispCube.users);
  const [error, setError] = useState<string | null>(null);
  const [filteredUsers, setFilteredUsers] = useState<any[]>(users);
  const [manualSelection, setManualSelection] = useState<string[]>([]);
  const [showManualSelection, setShowManualSelection] =
    useState<boolean>(false);
    const url = process.env.NEXT_PUBLIC_URL;
    const token = Cookies.get("token");

  const handleFilter = (filters: {
    node_code: any[];
    status: string[];
    debt: string[];
    plan_id: any[];
  }) => {
    const { node_code, status, debt, plan_id } = filters;

    const newFilteredUsers = users.filter((user) => {
      const matchesNode = node_code.length
        ? node_code.includes(user.node_code)
        : true;

      const matchesStatus = status.length ? status.includes(user.status) : true;

      const matchesDebt = debt.length
        ? debt.some((d) =>
            d === "positive"
              ? parseFloat(user.debt) > 0
              : d === "negative"
              ? parseFloat(user.debt) < 0
              : d === "zero"
              ? parseFloat(user.debt) === 0
              : false
          )
        : true;

      const matchesPlan = plan_id.length
        ? user.connections?.some((connection: any) =>
            plan_id.includes(connection.plan_id)
          )
        : true;

      return matchesNode && matchesStatus && matchesDebt && matchesPlan;
    });

    setFilteredUsers(newFilteredUsers);
  };

  return (
    <Formik<FormValues>
      initialValues={{
        addressee: "",
        message: "",
        filters: {
          node_code: [],
          status: [],
          debt: [],
          showNodeDropdown: false,
          plan_id: [],
          showPlanDropdown: false,
        },
      }}
      enableReinitialize
      validate={validateSendMessage}
      onSubmit={async (values, { resetForm }) => {
        try {
          await validateSendAll(
            manualSelection, // Selección manual
            filteredUsers, // Usuarios filtrados
            users, // Todos los usuarios
            values.message, // Mensaje
            setFilteredUsers,
            setManualSelection,
            resetForm,
            setViewModalMessage,
            url!,
            token!,
            setError
          );

          // setLoading(true);
        } catch (err) {
          setLoading(false);
          setError("Error al conectar con el servidor");
        }
      }}
    >
      {(formikProps) => (
        <Form className="flex flex-col items-start text-black">
          <div className="w-full flex flex-wrap gap-3 mb-4">
            {/* Filtro por nodo */}
            <FilterOfNodo
              formikProps={formikProps}
              handleFilter={handleFilter}
              users={users}
            />
            <FilterOfPlan
              formikProps={formikProps}
              handleFilter={handleFilter}
              users={users}
            />
            {/* Filtro por estado */}
            <FilterOfStatus
              formikProps={formikProps}
              handleFilter={handleFilter}
              users={users}
            />
            {/* Filtro por deuda */}
            <FilterOfPay
              formikProps={formikProps}
              handleFilter={handleFilter}
            />
          </div>

          <ManualSelection
            users={users}
            manualSelection={manualSelection}
            setManualSelection={setManualSelection}
            setShowManualSelection={setShowManualSelection}
            showManualSelection={showManualSelection}
          />

          {error && (
            <p className="text-red-600 text-center mb-2 w-full">¡{error}!</p>
          )}
          {formikProps.errors.addressee && (
            <div className="text-[#ff0000]">{formikProps.errors.addressee}</div>
          )}
          <ContainerInput
            error={error}
            formikProps={formikProps}
            nombre="message"
            title="Mensaje"
            type="text"
            textarea={true}
          />
          <div className="cont-btn flex flex-col w-full justify-center mb-5">
            <ButtonLogin loading={loading} name="Enviar" />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default FormNewMessage;
