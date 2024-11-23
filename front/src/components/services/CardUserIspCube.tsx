import React from "react";

const CardUserIspCube: React.FC<{ user: any }> = ({ user }) => {
  const formatdate = (input: string) => {
    const date = new Date(input);
    const formattedDate = date.toISOString().split("T")[0];
    return formattedDate;
  };
  return (
    <div className="flex">
      <p>{user.name}</p>
      <p>{user.address}</p>
      <p>{formatdate(user.created_at)}</p>
      <button>Ver más</button>
    </div>
  );
};

export default CardUserIspCube;
