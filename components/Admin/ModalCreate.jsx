import React, { useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { createCategory } from "../../Routes/api.routes";
import "../../public/css/ToolTips.module.css";

const ModalCreate = ({ getAllDataCategorys }) => {
  const [displayBasic, setDisplayBasic] = useState(false);
  const [selectClinic, setSelectClinic] = useState({
    name: "",
    tipo_clinica: "",
  });
  const [newCategory, setNewCategory] = useState({
    nombre_categoria: "",
  });

  const clinicType = [
    { name: "Oftalmologia", tipo_clinica: "Oftalmologia" },
    { name: "Fisioterapia", tipo_clinica: "Fisioterapia" },
    { name: "Audiologia", tipo_clinica: "Audiologia" },
    { name: "Medicina General", tipo_clinica: "Medicina General" },
    { name: "Ecocardiograma", tipo_clinica: "Ecocardiograma" },
  ];

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
    try {
      if (selectClinic.tipo_clinica == "") {
        alert("El área esta vacia");
      } else {
        const data = {
          nombre_categoria: newCategory.nombre_categoria,
          tipo_clinica: selectClinic.tipo_clinica,
        };
        const response = await createCategory(data);
        if (response.success) {
          getAllDataCategorys();
          onHide(name);
        } else {
          console.log(response)
          alert(response.message);
        }
      }
    } catch (e) {
      alert("Por favor seleccione un área");
    }
  };

  const onClinicChange = (e) => {
    setSelectClinic(e.value);
  };

  const selectClinicTemplate = (option, props) => {
    if (option) {
      return (
        <div className="country-item country-item-value">
          <div>{option.name}</div>
        </div>
      );
    }

    return <span>{props.placeholder}</span>;
  };

  const clinicOptionTemplate = (option) => {
    return (
      <div className="country-item">
        <div>{option.name}</div>
      </div>
    );
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
        label="Agregar Categoría"
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
          <div className="col-12 md:col-12">
            <div className="p-inputgroup">
              <Dropdown
                value={selectClinic}
                options={clinicType}
                onChange={onClinicChange}
                optionLabel="name"
                filter
                showClear
                filterBy="name"
                placeholder="Seleccionar Área"
                valueTemplate={selectClinicTemplate}
                itemTemplate={clinicOptionTemplate}
              />
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default ModalCreate;
