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
  console.log(users);
  const [error, setError] = useState<string | null>(null);
  const [filteredUsers, setFilteredUsers] = useState<any[]>(users);
  const [manualSelection, setManualSelection] = useState<string[]>([]);
  const [showManualSelection, setShowManualSelection] =
    useState<boolean>(false);
  const url = process.env.NEXT_PUBLIC_URL;
  const token = Cookies.get("token");
  const userVariables = [
    { key: "{{name}}", description: "Nombre " },
    { key: "{{debt}}", description: "Saldo" },
    { key: "{{address}}", description: "Dirección" },
    { key: "{{plan_name}}", description: "Plan" },
  ];

  const handleFilter = (filters: {
    node_code: any[];
    status: string[];
    debt: string[];
    plan_name: string[]; // Cambiado a plan_name
  }) => {
    const { node_code, status, debt, plan_name } = filters;

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

      const matchesPlan = plan_name.length
        ? plan_name.includes(user.plan_name)
        : true;

      return matchesNode && matchesStatus && matchesDebt && matchesPlan;
    });

    setFilteredUsers(newFilteredUsers);
  };

  const personalizeMessage = (template: string, user: any) => {
    return template
      .replace(/{{name}}/g, user.name)
      .replace(/{{debt}}/g, user.debt || "N/A")
      .replace(/{{address}}/g, user.address || "N/A")
      .replace(/{{plan_name}}/g, user.plan_name || "N/A");
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
          plan_name: [],
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
            filteredUsers.map((user) =>
              personalizeMessage(values.message, user)
            ), // Generar un mensaje personalizado para cada usuario
            setFilteredUsers,
            setManualSelection,
            resetForm,
            setViewModalMessage,
            url!,
            token!,
            setError
          );

          setLoading(false);
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

          {/* Botones para agregar variables */}

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

          <div className="variable-list flex gap-2 mb-4">
            {userVariables.map((variable) => (
              <button
                key={variable.key}
                type="button"
                onClick={() =>
                  formikProps.setFieldValue(
                    "message",
                    formikProps.values.message + " " + variable.key
                  )
                }
                className="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
              >
                {variable.description}
              </button>
            ))}
          </div>

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
