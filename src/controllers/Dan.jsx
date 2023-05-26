import React from "react";

const Dan = ({
  NombreApellido,
  NroDan,
}) => {
  return(
    <>
      <div className="flex flex-col p-4">
        <h4 className="mb-1 text-xl font-medium mt-5">{NombreApellido}</h4>
        <p className="text-lg mb-4">{NroDan}</p>
      </div>
    </>);
}

export default Dan;
