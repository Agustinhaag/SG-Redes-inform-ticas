import ContactoForm from "@/components/contact/ContactoForm";
import ContactoImg from "@/components/contact/ContactoImg";
import ContactoInfo from "@/components/contact/ContactoInfo";
import "../../styles/forms.css";

const Contact: React.FC = () => {
  return (
    <main className="flex flex-col mx-10">
      {/* Encabezado centrado */}
      <h1 className="text-white text-4xl font-bold text-center mb-10 mt-[30px]">
        CONTACTANOS
      </h1>

      {/* Sección superior con ContactoForm y ContactoInfo */}
      <section className="flex flex-col md:flex-row w-full justify-center space-y-4 md:space-y-0 md:space-x-4">
        <div className="w-full md:max-w-[550px] flex-grow flex items-stretch">
          <ContactoForm />
        </div>
        <div className="w-full md:max-w-[550px] flex-grow flex items-stretch">
          <ContactoInfo />
        </div>
      </section>
      {/* Sección inferior con ContactoImg */}
      <div className="w-full my-8">
        <ContactoImg />
      </div>
    </main>
  );
};

export default Contact;
