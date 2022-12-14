import React, { useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { deleteCategory } from "../../Routes/api.routes";
import "../../public/css/ToolTips.module.css";

const ModalDelete = ({ id, getAllDataCategorys, nameCategory }) => {
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

  const deleteDataCategory = async (name) => {
    const response = await deleteCategory(id);
    if (response.code == "ER_ROW_IS_REFERENCED") {
      alert(
        "Esta Categoria le pertenece a algunos productos, por favor cambie la categoria o elimine los productos."
      );
      onHide(name);
    } else {
      try {
        getAllDataCategorys();
        onHide(name);
      } catch (error) {
        console.log(error);
        alert(response.message);
      }
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
          onClick={() => deleteDataCategory(name)}
          autoFocus
        />
      </div>
    );
  };
  return (
    <>
      <Button
        className="p-button-danger"
        tooltip="Eliminar Categoría"
        tooltipOptions={{
          position: "bottom",
          mouseTrack: true,
          mouseTrackTop: 15,
        }}
        icon="pi pi-trash"
        onClick={() => onClick("displayBasic")}
      />
      <Dialog
        header="Eliminar Categoria"
        visible={displayBasic}
        style={{ width: "50vw" }}
        footer={renderFooter("displayBasic")}
        onHide={() => onHide("displayBasic")}
      >
        Desea eliminar la categoria: {nameCategory}
      </Dialog>
    </>
  );
};

export default ModalDelete;
