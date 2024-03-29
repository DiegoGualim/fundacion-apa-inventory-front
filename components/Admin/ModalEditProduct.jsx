import React, { useCallback, useEffect, useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { getAllCategories, updateProducts } from "../../Routes/api.routes";
import "../../public/css/ToolTips.module.css";

const ModalEditProduct = ({ props, getAllDataProducts, categoryElement, getAllDataCategorys }) => {
  const [displayBasic, setDisplayBasic] = useState(false);
  const [categorySave, setCategorySave] = useState(props.id_categoria);
  const [getCategory, setGetCategory] = useState([]);
  const [newDataProduct, setNewDataProduct] = useState({
    nombre_producto: "",
    unidad_medida: "",
    fecha_expiracion: "",
    stock: "",
    cargaStock: 0,
    precio: "",
    codigo_producto: "",
    codigo_barras: "",
    id_categoria: "",
  });
  /* let categoryElement = []; */

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
    if (name == "cargaStock") {
      setNewDataProduct({
        ...newDataProduct,
        cargaStock: values,
        stock: Number(values) + props.stock,
      });
    } else {
      setNewDataProduct({
        ...newDataProduct,
        [name]: values,
      });
    }
  };

  const onCategoryChange = (e) => {
    setCategorySave(e.value);
    setNewDataProduct({
      ...newDataProduct,
      id_categoria: e.value.id,
    });
  };

  const editProduct = async (name) => {
    console.log(newDataProduct);

    const dataSend = {
      id: props.id,
      nombre_producto: newDataProduct.nombre_producto,
      unidad_medida: newDataProduct.unidad_medida,
      fecha_expiracion: newDataProduct.fecha_expiracion,
      stock: newDataProduct.stock,
      cargaStock: newDataProduct.cargaStock,
      precio: newDataProduct.precio,
      codigo_producto: newDataProduct.codigo_producto,
      codigo_barras: newDataProduct.codigo_barras,
      id_categoria: newDataProduct.id_categoria,
    };
    const response = await updateProducts(dataSend);

    /* console.log(dataSend); */
    if (response.success) {
      getAllDataCategorys();
      getAllDataProducts();
      setNewDataProduct({
        id: "",
        nombre_producto: "",
        unidad_medida: "",
        fecha_expiracion: "",
        stock: "",
        cargaStock: 0,
        precio: "",
        codigo_producto: "",
        codigo_barras: "",
        id_categoria: "",
      });
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
          onClick={() => editProduct(name)}
          autoFocus
        />
      </div>
    );
  };
  return (
    <>
      <Button
        className="p-button-info"
        tooltip="Editar Producto"
        tooltipOptions={{
          position: "bottom",
          mouseTrack: true,
          mouseTrackTop: 15,
        }}
        icon="pi pi-pencil"
        onClick={() => onClick("displayBasic")}
      />
      <Dialog
        header="Editar Producto"
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
                placeholder={props.nombre_producto}
              />
            </div>
          </div>

          <div className="col-12 md:col-4">
            <h5>Codigo Barras</h5>
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">
                <i className="pi pi-qrcode"></i>
              </span>
              <InputText
                id="codigo_barras"
                name="codigo_barras"
                onChange={(e) => hadleChange(e.target.name, e.target.value)}
                placeholder={props.codigo_barras}
              />
            </div>
          </div>

          <div className="col-12 md:col-4">
            <h5>Codigo Producto</h5>
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">
                <i className="pi pi-bookmark-fill"></i>
              </span>
              <InputText
                id="codigo_producto"
                name="codigo_producto"
                onChange={(e) => hadleChange(e.target.name, e.target.value)}
                placeholder={props.codigo_producto}
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
                placeholder={props.unidad_medida}
              />
            </div>
          </div>

          <div className="col-12 md:col-4">
            <h5>Entranda Productos</h5>
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">
                <i className="pi pi-inbox"></i>
              </span>
              <InputText
                type="number"
                id="cargaStock"
                name="cargaStock"
                onChange={(e) => hadleChange(e.target.name, e.target.value)}
                placeholder={"0 unidades"}
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
                readOnly
                onChange={(e) => hadleChange(e.target.name, e.target.value)}
                placeholder={
                  Number(newDataProduct.cargaStock) +
                  Number(props.stock) +
                  " unidades"
                }
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
                placeholder={"Q. " + props.precio}
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
            <h5>Fecha de Expiración Actual : {props.fecha_expiracion}</h5>
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">
                <i className="pi pi-calendar"></i>
              </span>
              <InputText
                type="date"
                id="fecha_expiracion"
                name="fecha_expiracion"
                onChange={(e) => hadleChange(e.target.name, e.target.value)}
                placeholder={props.fecha_expiracion}
              />
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default ModalEditProduct;
