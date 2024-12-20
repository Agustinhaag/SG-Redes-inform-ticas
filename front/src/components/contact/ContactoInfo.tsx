import React from "react";
import {
  FaEnvelope,
  FaWhatsapp,
  FaMapMarkerAlt,
} from "react-icons/fa";

const ContactoInfo: React.FC = () => {
  return (
    <section className="p-6 bg-black rounded-xl text-white ">
      <p className="text-sm text-gray-500 mb-8">
        Te acercamos algunos de nuestros medios de comunicación alternativa, te
        invitamos a comunicarte también por aqui.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="flex items-center transform transition-transform duration-300 hover:scale-105 hover:translate-y-1">
          <FaWhatsapp size={30} className="mr-3 text-custom-blue min-w-5" />
          <div>
            <h4 className="font-bold">Whatsapp</h4>
            <p>543435066999</p>
          </div>
        </div>

        <div className="flex items-center transform transition-transform duration-300 hover:scale-105 hover:translate-y-1">
          <FaMapMarkerAlt size={30} className="mr-3 text-custom-blue min-w-5" />
          <div>
            <h4 className="font-bold lg:text-base text-sm">Nuestra sede</h4>
            <p className="lg:text-sm ">Calle 123, Bs As, Arg </p>
          </div>
        </div>
        <div className="flex items-center transform transition-transform duration-300 hover:scale-105 hover:translate-y-1">
          <FaEnvelope size={30} className="mr-3 text-custom-blue min-w-5" />
          <div>
            <h4 className="font-bold">Correo Electrónico</h4>
            <p className="text-sm">contacto@sgredesinformaticas.com.ar</p>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26278.902748740837!2d-58.44585683138387!3d-34.60756800518426!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccafeaed4d1f1%3A0xe4f0a7995126d209!2sBuenos%20Aires%2C%20Argentina!5e0!3m2!1sen!2sus!4v1646009736347!5m2!1sen!2sus"
          width="300"
          height="350"
          loading="lazy"
          className="border-0 w-full rounded"
        ></iframe>
      </div>
    </section>
  );
};

export default ContactoInfo;
