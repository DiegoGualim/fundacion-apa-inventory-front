import React, { useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { updateCategory } from "../../Routes/api.routes";
import "../../public/css/ToolTips.module.css";

const ModalEdit = ({ id, nameCategory, getAllDataCategorys }) => {
  const [displayBasic, setDisplayBasic] = useState(false);
  const [newDataCategory, setNewDataCategory] = useState({
    id: id,
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
    setNewDataCategory({
      ...newDataCategory,
      [name]: values,
    });
  };

  const editCategory = async (name) => {
    const response = await updateCategory(newDataCategory);
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
          label="Editar"
          icon="pi pi-check"
          onClick={() => editCategory(name)}
          autoFocus
        />
      </div>
    );
  };
  return (
    <>
      <Button
        className="p-button-info"
        tooltip="Editar Categoría"
        tooltipOptions={{
          position: "bottom",
          mouseTrack: true,
          mouseTrackTop: 15,
        }}
        icon="pi pi-pencil"
        onClick={() => onClick("displayBasic")}
      />
      <Dialog
        header="Editar Categoría"
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
                placeholder={nameCategory}
              />
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default ModalEdit;
