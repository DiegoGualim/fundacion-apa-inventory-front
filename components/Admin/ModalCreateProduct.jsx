import React, { useCallback, useEffect, useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import "../../public/css/ToolTips.module.css";
import { createProduct, getAllCategories } from "../../Routes/api.routes";

const ModalCreateProduct = ({ getAllDataProducts }) => {
  const [displayBasic, setDisplayBasic] = useState(false);
  const [categorySave, setCategorySave] = useState();
  const [getCategory, setGetCategory] = useState([]);
  const [newDataProduct, setNewDataProduct] = useState({
    nombre_producto: "",
    unidad_medida: "",
    fecha_expiracion: "",
    stock: "",
    precio: "",
    codigo_producto: "",
    codigo_barras: "",
    id_categoria: "",
  });
  let categoryElement = [];

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
    setNewDataProduct({
      ...newDataProduct,
      [name]: values,
    });
  };

  const onCategoryChange = (e) => {
    setCategorySave(e.value);
    setNewDataProduct({
      ...newDataProduct,
      id_categoria: e.value.id,
    });
  };

  const getAllDataCategorys = useCallback(async () => {
    const response = await getAllCategories();
    setGetCategory(response);
  }, []);

  for (let i = 0; i < getCategory.length; i++) {
    categoryElement.push({
      id: getCategory[i].id,
      nombre_categoria: getCategory[i].nombre_categoria,
    });
  }

  const createNewProduct = async (name) => {
    const response = await createProduct(newDataProduct);
    console.log(response);
    if (response.success) {
      getAllDataCategorys();
      getAllDataProducts();
      onHide(name);
    } else {
      alert(response.message);
    }
  };

  useEffect(() => {
    getAllDataCategorys();
  }, []);

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
          onClick={() => createNewProduct(name)}
          autoFocus
        />
      </div>
    );
  };
  return (
    <>
      <Button
        className="p-button-success"
        tooltip="Crear Producto"
        tooltipOptions={{
          position: "bottom",
          mouseTrack: true,
          mouseTrackTop: 15,
        }}
        label = "Crear Producto"
        icon="pi pi-plus"
        onClick={() => onClick("displayBasic")}
      />
      <Dialog
        header="Crear Producto"
        visible={displayBasic}
        style={{ width: "50vw" }}
        footer={renderFooter("displayBasic")}
        onHide={() => onHide("displayBasic")}
      >
        <div className="grid p-fluid">
          <div className="col-12 md:col-12">
            <h5>Nombre Producto</h5>
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">
                <i className="pi pi-box"></i>
              </span>
              <InputText
                id="nombre_producto"
                name="nombre_producto"
                onChange={(e) => hadleChange(e.target.name, e.target.value)}
                placeholder="Nombre del Producto"
              />
            </div>
          </div>

          <div className="col-12 md:col-6">
            <h5>Codigo Barras</h5>
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">
                <i className="pi pi-qrcode"></i>
              </span>
              <InputText
                id="codigo_barras"
                name="codigo_barras"
                onChange={(e) => hadleChange(e.target.name, e.target.value)}
                placeholder="Codigo de Barras"
              />
            </div>
          </div>

          <div className="col-12 md:col-6">
            <h5>Codigo Producto</h5>
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">
                <i className="pi pi-bookmark-fill"></i>
              </span>
              <InputText
                id="codigo_producto"
                name="codigo_producto"
                onChange={(e) => hadleChange(e.target.name, e.target.value)}
                placeholder="Codigo del Producto"
              />
            </div>
          </div>

          <div className="col-12 md:col-4">
            <h5>Unidad de Medida</h5>
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">
                <i className="pi pi-bookmark-fill"></i>
              </span>
              <InputText
                id="unidad_medida"
                name="unidad_medida"
                onChange={(e) => hadleChange(e.target.name, e.target.value)}
                placeholder="Unidad de Medida"
              />
            </div>
          </div>

          <div className="col-12 md:col-4">
            <h5>Existencia</h5>
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">
                <i className="pi pi-eye"></i>
              </span>
              <InputText
                type="number"
                id="stock"
                name="stock"
                onChange={(e) => hadleChange(e.target.name, e.target.value)}
                placeholder="Stock"
              />
            </div>
          </div>

          <div className="col-12 md:col-4">
            <h5>Precio</h5>
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">
                <i className="pi pi-money-bill"></i>
              </span>
              <InputText
                type="number"
                id="precio"
                name="precio"
                onChange={(e) => hadleChange(e.target.name, e.target.value)}
                placeholder="Precio"
              />
            </div>
          </div>

          <div className="col-12 md:col-6">
            <h5>Categoria</h5>
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">
                <i className="pi pi-book"></i>
              </span>
              <Dropdown
                value={categorySave}
                options={categoryElement}
                onChange={onCategoryChange}
                optionLabel="nombre_categoria"
                placeholder="Seleccionar Categoria"
              />
            </div>
          </div>

          <div className="col-12 md:col-6">
            <h5>Fecha de Expiración</h5>
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">
                <i className="pi pi-calendar"></i>
              </span>
              <InputText
                type="date"
                id="fecha_expiracion"
                name="fecha_expiracion"
                onChange={(e) => hadleChange(e.target.name, e.target.value)}
              />
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default ModalCreateProduct;
