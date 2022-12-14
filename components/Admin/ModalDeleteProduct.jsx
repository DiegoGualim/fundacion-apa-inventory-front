import React, { useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { deleteProduct } from "../../Routes/api.routes";
import "../../public/css/ToolTips.module.css";

const ModalDeleteProduct = ({ id, getAllDataProducts, productName }) => {
  const [displayBasic, setDisplayBasic] = useState(false);
  const dialogFuncMap = {
    displayBasic: setDisplayBasic,
  };

  const onClick = (name) => {
    dialogFuncMap[`${name}`](true);
  };

  const onHide = (name) => {
    dialogFuncMap[`${name}`](false);
  };

  const deleteDataProduct = async (name) => {
    const response = await deleteProduct(id);
    try {
      getAllDataProducts();
      onHide(name);
    } catch (error) {
      console.log(error);
      alert(response.message);
    }
  };

  const renderFooter = (name) => {
    return (
      <div>
        <Button
          label="Cancelar"
          icon="pi pi-times"
          onClick={() => onHide(name)}
          className="p-button-text"
        />
        <Button
          label="Eliminar"
          icon="pi pi-check"
          onClick={() => deleteDataProduct(name)}
          autoFocus
        />
      </div>
    );
  };
  return (
    <>
      <Button
        className="p-button-danger"
        tooltip="Eliminar Producto"
        tooltipOptions={{
          position: "bottom",
          mouseTrack: true,
          mouseTrackTop: 15,
        }}
        icon="pi pi-trash"
        onClick={() => onClick("displayBasic")}
      />
      <Dialog
        header="Eliminar Producto"
        visible={displayBasic}
        style={{ width: "50vw" }}
        footer={renderFooter("displayBasic")}
        onHide={() => onHide("displayBasic")}
      >
        ¿Desea eliminar este producto: {productName}?
      </Dialog>
    </>
  );
};

export default ModalDeleteProduct;
