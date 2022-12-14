import React, { useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { createCategory } from "../../Routes/api.routes";
import "../../public/css/ToolTips.module.css";

const ModalCreate = ({ getAllDataCategorys }) => {
  const [displayBasic, setDisplayBasic] = useState(false);
  const [newCategory, setNewCategory] = useState({
    nombre_categoria: "",
  });

  const dialogFuncMap = {
    displayBasic: setDisplayBasic,
  };

  const onClick = (name) => {
    dialogFuncMap[`${name}`](true);
  };

  const onHide = (name) => {
    dialogFuncMap[`${name}`](false);
  };

  const hadleChange = (name, values) => {
    setNewCategory({
      ...newCategory,
      [name]: values,
    });
  };

  const createNewuser = async (name) => {
    const response = await createCategory(newCategory);
    if (response.success) {
      getAllDataCategorys();
      onHide(name);
    } else {
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
          label="Crear"
          icon="pi pi-check"
          onClick={() => createNewuser(name)}
          autoFocus
        />
      </div>
    );
  };
  return (
    <>
      <Button
        className="p-button-success"
        tooltip="Crear Categoría"
        tooltipOptions={{
          position: "bottom",
          mouseTrack: true,
          mouseTrackTop: 15,
        }}
        label = "Agregar Categoría"
        icon="pi pi-plus"
        onClick={() => onClick("displayBasic")}
      />
      <Dialog
        header="Crear Nueva Categoría"
        visible={displayBasic}
        style={{ width: "50vw" }}
        footer={renderFooter("displayBasic")}
        onHide={() => onHide("displayBasic")}
      >
        <div className="grid p-fluid">
          <div className="col-12 md:col-12">
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">
                <i className="pi pi-bookmark-fill"></i>
              </span>
              <InputText
                id="nombre_categoria"
                name="nombre_categoria"
                onChange={(e) => hadleChange(e.target.name, e.target.value)}
                placeholder="Nueva Categoria"
              />
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default ModalCreate;
