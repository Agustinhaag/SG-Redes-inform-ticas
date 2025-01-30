"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import QRCodeComponent from "../services/QrCodeGenerator";
import ModalDevice from "./ModalDevice";
import { fetchInfoDevice } from "@/helpers/fetchDevice";
import { RootState, IUser } from "@/helpers/types";

const ServiceDevice: React.FC = () => {
  const dataUser: IUser = useSelector((state: RootState) => state.user.user);
  const [viewModalDevice, setViewModalDevice] = useState<boolean>(false);
  const [infoDevice, setInfoDevice] = useState<any>(null);
  const [deviceStatus, setDeviceStatus] = useState<string>("disconnected");
  const [loading, setLoading] = useState<boolean>(true);
  const url = process.env.NEXT_PUBLIC_URL!;
  const token: string = useSelector((state: RootState) => state.user.token);
  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchInfoDevice(dataUser?.id, url, token)
        .then((res) => {
          if (res) {
            setInfoDevice(res);
            setDeviceStatus(res.data.status);
          }
        })
        .catch((err) => {
          console.error("Error al obtener el estado del dispositivo:", err);
        })
        .finally(() => {
          setLoading(false);
        });
    }, 5000);

    return () => clearInterval(intervalId);
  }, [dataUser?.id, token, url]);

  return (
    <section>
      {dataUser && (
        <div className="flex sm:flex-row flex-col sm:gap-0 gap-5 justify-between mx-auto w-11/12 mt-3">
          <div>
            {/* Condición para si no tienes un dispositivo */}
            {!dataUser.device ? (
              <div className="text-custom-white flex flex-col gap-2 mb-2">
                <h2 className="text-xl">
                  Agregue un dispositivo para el envío de mensajes
                </h2>
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col gap-1">
                    <h3 className="text-xl ml-1">Requerimientos:</h3>
                    <ul className="ml-7 list-disc">
                      <li>Contar con un teléfono celular.</li>
                      <li>
                        Disponer de una tarjeta SIM.
                        <ul
                          className="ml-5 mt-1"
                          style={{ listStyleType: "circle" }}
                        >
                          <li>
                            No utilice la misma tarjeta SIM que usa actualmente
                            para comunicarse con sus clientes.
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                  <div className="flex flex-col gap-1 mt-2">
                    <h3 className="text-xl ml-1">Procedimiento:</h3>
                    <ul className="list-disc ml-7">
                      <li> En el teléfono, inserte la tarjeta SIM. </li>
                      <li>
                        En el teléfono, instale la aplicación WhatsApp Business.
                      </li>
                      <li>
                        En esta página, haga clic en el botón Agregar e ingrese
                        el número de teléfono asociado a la tarjeta SIM.
                      </li>
                    </ul>
                    <p className="text-neutral-400">
                      Una vez que haya agregado el número de teléfono,
                      realizaremos un proceso de validación que puede tardar
                      hasta 24 horas. Le notificaremos en cuanto haya sido
                      validado.
                    </p>
                  </div>
                </div>
                <div className="w-1/4">
                  <button
                    className="w-full hover:bg-custom-blue rounded-md py-2 px-3 bg-blue-600"
                    onClick={() => setViewModalDevice(!viewModalDevice)}
                  >
                    Agregar
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* Si tienes un dispositivo */}
                {dataUser.tokenwablas && deviceStatus !== "disconnected" ? (
                  // Si tienes el tokenwablas, mostrar la información del dispositivo y el texto de los mensajes
                  <div className="text-custom-white ">
                    <div className="flex flex-col gap-2 mb-1">
                      <h2 className="sm:text-2xl text-lg">IMPORTANTE:</h2>
                      <p className="text-neutral-400 sm:text-base text-sm">
                        Inicialmente, dispone de 5000 mensajes gratuitos de
                        forma mensual.
                      </p>
                      <p className="text-neutral-400 sm:text-base text-sm">
                        Actualmente, el proceso de envío de mensajes es lento.
                        Una mayor velocidad podría ser interpretada como spam
                        por la empresa WhatsApp, resultando en el bloqueo del
                        número de teléfono. Para evitar esta situación, el envío
                        es de 1 minuto por mensaje.
                      </p>
                      <p className="text-neutral-400 sm:text-base text-sm">
                        Por lo tanto, este software no debe utilizarse para
                        informar emergencias a los clientes (por ejemplo, la
                        caída imprevista de equipos). Su uso está diseñado para
                        comunicaciones anticipadas, como avisos de vencimiento,
                        mantenimientos programados, etc.
                      </p>
                    </div>
                    {infoDevice && infoDevice.status && (
                      // Si tienes el dispositivo y el estado, mostrar la información
                      <div className="flex lg:flex-row flex-col gap-5 w-full my-3">
                        <div className="mb-2 min-w-80">
                          <div className="flex flex-col gap-1">
                            <h2 className="text-2xl mb-2">
                              Información del dispositivo
                            </h2>
                            <p className="text-base text-neutral-400">
                              <span className="text-lg text-custom-white">
                                Dispositivo:{" "}
                              </span>
                              {infoDevice.data.name}
                            </p>
                            <p className="text-base text-neutral-400">
                              <span className="text-lg mr-1 text-custom-white">
                                Número:
                              </span>
                              {infoDevice.data.sender}
                            </p>
                            <p
                              className={`text-base ${
                                deviceStatus === "disconnected"
                                  ? "text-red-600"
                                  : "text-green-600"
                              }`}
                            >
                              <span className="text-lg text-custom-white">
                                Estado:
                              </span>
                              {deviceStatus === "disconnected"
                                ? " Desconectado"
                                : " Conectado"}
                            </p>
                            <p className="text-base text-neutral-400">
                              <span className="text-lg text-custom-white">
                                Venciminento:{" "}
                              </span>
                              {infoDevice.data.expired_date}
                            </p>
                            <p className="text-base text-neutral-400">
                              <span className="text-lg text-custom-white">
                                Mensajes disponibles:{" "}
                              </span>
                              {infoDevice.data.quota}
                            </p>
                          </div>
                        </div>
                        {deviceStatus === "disconnected" && (
                          <div className="text-custom-white flex flex-col gap-1">
                            <h2 className="text-xl">¡Dispositivo validado! </h2>
                            <p>Procedimiento:</p>
                            <ul className="list-decimal ml-4">
                              <li>
                                En el teléfono, abra la aplicación WhatsApp
                                Business.
                              </li>
                              <li>
                                En WhatsApp Business, active la función de
                                escaneo QR.
                              </li>
                              <li>
                                En esta página, presione el botón Generar código
                                QR.
                              </li>
                              <li>
                                Con su teléfono, escanee el código QR generado
                                en esta página. Una vez escaneado el código QR,
                                su teléfono estará habilitado para enviar
                                mensajes masivos a sus clientes.
                              </li>
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  // Si no tienes el tokenwablas, indicar que el dispositivo aún no está disponible
                  <div className="text-custom-white">
                    <p>
                      El dispositivo está en proceso de validación, lo cual
                      puede tardar hasta 24 horas. Le notificaremos en cuanto
                      haya sido validado.
                    </p>
                  </div>
                )}
              </>
            )}
          </div>

          {dataUser.tokenwablas &&
            dataUser.device &&
            deviceStatus === "disconnected" &&
            !loading && <QRCodeComponent />}

          {viewModalDevice && (
            <div className="fixed inset-0 bg-black bg-opacity-55 z-40"></div>
          )}
          <ModalDevice
            setViewModalDevice={setViewModalDevice}
            viewModalDevice={viewModalDevice}
          />
        </div>
      )}
    </section>
  );
};

export default ServiceDevice;
