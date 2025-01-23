import ContactoForm from "@/components/contact/ContactoForm";

import "../../styles/forms.css";

const Contact: React.FC = () => {
  return (
    <main className="flex flex-col xs:mx-10 mx-3 min-w-72">
      <h1 className="text-white text-4xl font-bold text-center mb-10 mt-[30px]">
        CONTACTO
      </h1>

      <section className="flex  w-full justify-center mb-3">
        <div className="w-full md:max-w-[550px] flex-grow flex items-stretch">
          <ContactoForm />
        </div>
      </section>
    </main>
  );
};

export default Contact;
