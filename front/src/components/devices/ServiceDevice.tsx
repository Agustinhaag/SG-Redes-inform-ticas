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
  const url = process.env.NEXT_PUBLIC_URL!;
  const token: string = useSelector((state: RootState) => state.user.token);
  const secret = process.env.NEXT_PUBLIC_SECRET;

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
        });
    }, 5000);

    return () => clearInterval(intervalId);
  }, [dataUser?.id, token, url]);

  return (
    <section>
      {dataUser && (
        <div className="flex sm:flex-row flex-col sm:gap-0 gap-5 justify-between mx-auto w-11/12 mt-3">
          <div>
            {!dataUser.device ? (
              <div>
                <h2>Agregue un dispositivo para el envío de mensajes</h2>
                <button onClick={() => setViewModalDevice(!viewModalDevice)}>
                  Agregar
                </button>
              </div>
            ) : (
              <div>
                {infoDevice && infoDevice.status ? (
                  <div className="text-custom-white">
                    <h2 className="text-2xl mb-2">
                      Información del dispositivo
                    </h2>
                    <div className="flex flex-col gap-1">
                      <p className="text-base text-neutral-400">
                        <span className="text-lg text-custom-white">
                          Dispositivo:{" "}
                        </span>
                        {infoDevice.data.name}
                      </p>
                      <p className="text-base text-neutral-400">
                        <span className="text-lg text-custom-white">
                          Número:{" "}
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
                          Estado:{" "}
                        </span>
                        {deviceStatus}
                      </p>
                      <p className="text-base text-neutral-400">
                        <span className="text-lg text-custom-white">
                          Expiración:{" "}
                        </span>
                        {infoDevice.data.expired_date}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-custom-white">
                    <p>
                      Su dispositivo aún no está disponible para el envío de
                      mensajes
                    </p>
                    <p>Por favor comuníquese con nuestro equipo</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {dataUser.tokenwablas &&
            dataUser.device &&
            deviceStatus === "disconnected" && <QRCodeComponent />}

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
