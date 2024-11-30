import ViewMessagesWablas from "@/components/services/ViewMessagesWablas";
import React from "react";

const Services: React.FC = () => {
  return (
    <main className="flex h-full md:flex-row flex-col w-11/12 mx-auto text-custom-white">
      <ViewMessagesWablas />
    </main>
  );
};

export default Services;
