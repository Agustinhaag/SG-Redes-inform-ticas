import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import ContainerInput from "../forms/ContainerInput";
import ButtonLogin from "../forms/ButtonLogin";
import Cookies from "js-cookie";
import "../../styles/forms.css";
import { useSelector } from "react-redux";
import ManualSelection from "./sectionForm/ManualSelection";
import { FormValues, IUser, RootState } from "@/helpers/types";
import FilterOfNodo from "./sectionForm/FilterOfNodo";
import FilterOfStatus from "./sectionForm/FilterOfStatus";
import FilterOfPay from "./sectionForm/FilterOfPay";
import FilterOfPlan from "./sectionForm/FilterOfPlan";
import { validateSendMessage } from "@/helpers/validateForms";
import { validateSendAll } from "@/helpers/fetchSendMessage";
import { fetchAllUsersIspCube } from "@/helpers/fetchIspCube";
import { fetchUserInvoices } from "@/helpers/fetchInvoices";

const FormNewMessage: React.FC<{
  setViewModalMessage: React.Dispatch<React.SetStateAction<boolean>>;
  onNewCampaign: (newCampaign: any) => void;
}> = ({ setViewModalMessage, onNewCampaign }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [users, setUsers] = useState<any[]>([]);
  const [invoices, setInvoices] = useState<Record<number, string>>({});
  const dataUser: IUser = useSelector((state: RootState) => state.user.user);
  const [error, setError] = useState<string | null>(null);
  const [filteredUsers, setFilteredUsers] = useState<any[]>(users);
  const [manualSelection, setManualSelection] = useState<string[]>([]);
  const [showManualSelection, setShowManualSelection] =
    useState<boolean>(false);
  const url = process.env.NEXT_PUBLIC_URL;
  const token = Cookies.get("token");
  const tokenIspCube: string = useSelector(
    (state: any) => state.user.tokenIspCube
  );

  const userVariables = [
    { key: "{{name}}", description: "Nombre" },
    { key: "{{debt}}", description: "Saldo" },
    { key: "{{address}}", description: "Dirección" },
    { key: "{{plan_name}}", description: "Plan" },
    { key: "{{invoices}}", description: "Factura" },
  ];

  useEffect(() => {
    fetchAllUsersIspCube(url!, dataUser.email, token!, tokenIspCube!).then(
      (res) => {
        setUsers(res);
      }
    );
  }, []);

  const handleFilter = (filters: {
    node_code: any[];
    status: string[];
    debt: string[];
    plan_name: string[];
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

  const handleSubmit = async (values: FormValues, resetForm: () => void) => {
    try {
      setLoading(true);

      const selectedUsers =
        manualSelection.length > 0
          ? manualSelection.map((key) => {
              const [userId] = key.split("-");
              return users.find((user) => user.id === parseInt(userId, 10));
            })
          : filteredUsers;

      const response: any = await validateSendAll(
        manualSelection,
        filteredUsers,
        users,
        values.message,
        setFilteredUsers,
        setManualSelection,
        resetForm,
        setViewModalMessage,
        url!,
        token!,
        setError,
        dataUser.id,
        setLoading,
        tokenIspCube,
        dataUser.email
      );
      onNewCampaign(response.campaign);
    } catch (err) {
      setLoading(false);
      setError("Error al conectar con el servidor");
    }
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
        await handleSubmit(values, resetForm);
      }}
    >
      {(formikProps) => (
        <Form className="flex flex-col items-start text-black">
          <div className="w-full flex flex-col gap-5 mb-4">
            {/* Filtro por nodo */}
            <div className="flex sm:flex-row flex-col gap-5">
              <FilterOfNodo
                formikProps={formikProps}
                handleFilter={handleFilter}
                users={users}
              />
              <FilterOfStatus
                formikProps={formikProps}
                handleFilter={handleFilter}
                users={users}
              />
            </div>
            <div className="flex sm:flex-row flex-col gap-5">
              <FilterOfPlan
                formikProps={formikProps}
                handleFilter={handleFilter}
                users={users}
              />

              <FilterOfPay
                formikProps={formikProps}
                handleFilter={handleFilter}
              />
            </div>
          </div>
          {/* Botones para agregar variables */}
          <ManualSelection
            users={users}
            manualSelection={manualSelection}
            setManualSelection={setManualSelection}
            setShowManualSelection={setShowManualSelection}
            showManualSelection={showManualSelection}
          />
          {formikProps.errors.addressee && (
            <div className="text-[#ff0000]">{formikProps.errors.addressee}</div>
          )}
          <div className="variable-list flex gap-2 my-3 justify-start w-full flex-wrap">
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
          <div className="sm:w-4/5 w-full">
            <ContainerInput
              error={error}
              formikProps={formikProps}
              nombre="message"
              title="Mensaje"
              type="text"
              textarea={true}
              message={true}
            />
          </div>

          <div className="cont-btn flex flex-col w-full justify-center mb-5">
            <ButtonLogin loading={loading} name="Enviar" />
          </div>
          {error && (
            <p className="text-red-600 text-center mb-2 w-full">¡{error}!</p>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default FormNewMessage;
