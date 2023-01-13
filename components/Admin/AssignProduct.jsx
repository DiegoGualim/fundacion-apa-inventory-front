import React, { useState, useEffect, useCallback, useRef } from "react";
import { Dropdown } from "primereact/dropdown";
import { createRequest, getAllProducts } from "../../Routes/api.routes";
import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";

const AssignProduct = () => {
  const [products, setProducts] = useState([]);
  const [auxProducts, setAuxProducts] = useState([]);
  const [dataSend, setDataSend] = useState([]);
  const [checked, setChecked] = useState(false);
  const [selectClinic, setSelectClinic] = useState({
    name: "",
    tipo_clinica: "",
  });
  const [nameProv, setNameProv] = useState({
    area_solicito: "",
    usuario_solicito: "",
  });
  const [valid, setValid] = useState(false);
  const [dataTotal, setDatatotal] = useState();
  const [productSave, setProductSave] = useState("");
  const [getProduct, setGetProduct] = useState([]);
  const dt = useRef(null);
  const [changes, setChanges] = useState(false);
  let productElement = [];
  let stockSaliente = 0;
  const clinicType = [
    { name: "Oftalmología", tipo_clinica: "Oftalmologia" },
    { name: "Fisioterapia", tipo_clinica: "Fisioterapia" },
    { name: "Audiología", tipo_clinica: "Audiologia" },
    { name: "Medicina General", tipo_clinica: "Medicina General" },
    { name: "Ecocardiograma", tipo_clinica: "Ecocardiograma" },
    { name: "Odontología", tipo_clinica: "Odontología" },
  ];
  const cols = [
    { field: "nombre_producto", header: "Nombre producto" },
    { field: "cantidad", header: "Cantidad" },
    { field: "precio", header: "Precio" },
    { field: "total", header: "Total" },
  ];

  const getAllDataProducts = useCallback(async () => {
    const response = await getAllProducts();
    setGetProduct(response);
  }, []);

  for (let i = 0; i < getProduct.length; i++) {
    productElement.push({
      id: getProduct[i].id,
      id_categoria: getProduct[i].id_categoria,
      nombre_producto: getProduct[i].nombre_producto,
      precio: getProduct[i].precio,
      stock: getProduct[i].stock,
      variableStock: getProduct[i].stock,
      cantidad: 0,
      total: 0,
      codigo_barras: getProduct[i].codigo_barras,
      usuario_solicito: "",
    });
  }

  const list = () => {
    if (products.length == 0) {
      let _products = [];
      let _product = { ...productSave };
      _products.push(_product);
      setProducts(_products);
      setAuxProducts(_products);
    } else {
      let _products = [...products];
      let _product = { ...productSave };
      _products.push(_product);
      setProducts(_products);
      setAuxProducts(_products);
    }
  };

  const hadleChange = (values, properties) => {
    const index = products.map((product) => product.id).indexOf(properties.id);
    if (values == "") {
      products[index].variableStock = products[index].stock;
    }
    let stockEntrante = products[index].stock;

    let totals =
      Number(values).toFixed(2) * Number(products[index].precio).toFixed(2);
    products[index].cantidad = values;
    products[index].total = totals;
    let newStock = Number(stockEntrante).toFixed(2) - Number(values).toFixed(2);

    if (newStock < 0) {
      setValid(false);
      alert("No hay suficiente");
    } else {
      products[index].variableStock = newStock;
      setValid(true);
    }
    let _products = [...products];
    setProducts(_products);
    click();
  };

  const hadleChangeInput = (name, values) => {
    setNameProv({
      ...nameProv,
      [name]: values,
    });
  };

  const onProductChange = (e) => {
    setProductSave(e.value);
  };

  const click = () => {
    var finalTotal = 0;
    let _products = [];
    for (let i = 0; i < products.length; i++) {
      let _product = {
        id_prod: products[i].id,
        cantidad: products[i].cantidad,
        new_stock: products[i].variableStock,
      };
      _products.push(_product);
    }
    setDataSend(_products);

    for (let i = 0; i < products.length; i++) {
      const element = products[i].total;
      finalTotal += element;
    }
    setDatatotal(finalTotal);
  };

  const inputPrice = (props) => {
    return <a>{"Q " + props.precio}</a>;
  };

  const inputUnits = (props) => {
    return (
      <div className="grid p-fluid">
        <InputText
          id="cantidad"
          name="cantidad"
          onChange={(e) => hadleChange(e.target.value, props)}
        />
      </div>
    );
  };

  const inputTotal = (props) => {
    return (
      <a>
        {"Q " +
          products[products.map((product) => product.id).indexOf(props.id)]
            .total}
      </a>
    );
  };

  const inputStock = (props) => {
    return (
      <a>
        {products[products.map((product) => product.id).indexOf(props.id)]
          .variableStock + " Unidades"}
      </a>
    );
  };

  const exportPdf = async () => {
    try {
      if (selectClinic.tipo_clinica == "") {
        alert("Llenar área de solicitud");
      } else if (nameProv.usuario_solicito == "") {
        alert("Llenar el nombre del solicitante");
      } else if (valid == false) {
        alert("Revisar campos de unidades en bodega");
      } else if (products.length == 0) {
        alert("No hay elementos");
      } else {
        const data = {
          usuario_solicito: nameProv.usuario_solicito,
          total: dataTotal,
          area_solicito: selectClinic.tipo_clinica,
          detalleSolicitud: dataSend,
        };
        const result = await createRequest(data);
        console.log(result);
        if (result.success) {
          import("jspdf").then((jsPDF) => {
            import("jspdf-autotable").then(() => {
              const doc = new jsPDF.default(0, 0);
              doc.autoTable(exportColumns, products);
              doc.save("products.pdf");
              alert("Salida de productos procesada de manera correcta!");
              setTimeout(() => {
                window.location.reload();
              }, 1000);
            });
          });
          setDatatotal();
          setNameProv({
            area_solicito: "",
            usuario_solicito: "",
          });
          setProducts([]);
        } else {
          alert(
            "Ocurrio un error favor de tomar captura y eviar al supervisor"
          );
        }
      }
    } catch (e) {
      alert("Debe de Seleccionar un área");
    }
  };

  const exportColumns = cols.map((col) => ({
    title: col.header,
    dataKey: col.field,
  }));

  const deleteElement = (id) => {
    let list = products;
    let a = products.map((product) => product.id).indexOf(id);
    list.splice(a, 1);
    let _products = [...list];
    setProducts(_products);
    click();
  };

  const buttonDelete = (props) => {
    return (
      <Button
        className="p-button-danger"
        tooltip="Eliminar Producto"
        tooltipOptions={{
          position: "bottom",
          mouseTrack: true,
          mouseTrackTop: 15,
        }}
        icon="pi pi-trash"
        onClick={() => deleteElement(props.id)}
      />
    );
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

  const bActionsPrice = (props) => {
    return inputPrice(props);
  };

  const bActionsUnit = (props) => {
    return inputUnits(props);
  };

  const bStock = (props) => {
    return inputStock(props);
  };

  const bTotal = (props) => {
    return inputTotal(props);
  };

  const header = (
    <div className="flex align-items-center export-buttons">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <div className="col-12 md:col-6">
          <div className="field-checkbox">
            <Checkbox
              inputId="binary"
              checked={checked}
              onChange={(e) => setChecked(e.checked)}
            />
            <label htmlFor="binary">Cambiar por Codigo de Barras</label>
          </div>
          <div className={checked ? "p-inputgroup hidden" : "p-inputgroup"}>
            <Dropdown
              value={productSave}
              options={productElement}
              onChange={onProductChange}
              optionLabel="nombre_producto"
              filter
              showClear
              filterBy="nombre_producto"
              placeholder="Seleccionar Producto"
            />
            <Button
              className="p-button-success"
              tooltip="Agregar Producto"
              tooltipOptions={{
                position: "bottom",
                mouseTrack: true,
                mouseTrackTop: 15,
              }}
              icon="pi pi-plus"
              onClick={list}
            />
          </div>
          <div className={checked ? "p-inputgroup" : "p-inputgroup hidden"}>
            <Dropdown
              value={productSave}
              options={productElement}
              onChange={onProductChange}
              optionLabel="nombre_producto"
              filter
              showClear
              filterBy="codigo_barras"
              placeholder="Seleccionar Producto"
            />
            <Button
              className="p-button-success"
              tooltip="Agregar Producto"
              tooltipOptions={{
                position: "bottom",
                mouseTrack: true,
                mouseTrackTop: 15,
              }}
              icon="pi pi-plus"
              onClick={list}
            />
          </div>
        </div>
        &ensp; &ensp; &ensp; &ensp;
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
        &ensp; &ensp; &ensp; &ensp;
        <InputText
          id="usuario_solicito"
          name="usuario_solicito"
          placeholder="Nombre Solicitante"
          onChange={(e) => hadleChangeInput(e.target.name, e.target.value)}
        />
        &ensp; &ensp; &ensp; &ensp;
        <Button
          tooltip="PDF"
          tooltipOptions={{
            position: "bottom",
            mouseTrack: true,
            mouseTrackTop: 15,
          }}
          label="Registrar"
          type="button"
          icon="pi pi-file-pdf"
          onClick={exportPdf}
          className="p-button-warning mr-2"
          data-pr-tooltip="Dar Producto"
        />
      </div>
    </div>
  );

  useEffect(() => {
    getAllDataProducts();
  }, []);

  return (
    <>
      <div className="datatable-templating-demo">
        <div className="card">
          <DataTable value={products} header={header} ref={dt}>
            <Column align="center" body={buttonDelete} />
            <Column align="center" field="nombre_producto" header="Producto" />
            <Column align="center" header="Unidades" body={bActionsUnit} />
            <Column
              align="center"
              field="stock"
              header="En bodega"
              body={bStock}
            />
            <Column
              align="center"
              field="precio"
              header="Precio"
              body={bActionsPrice}
            />
            <Column align="center" header="Total" body={bTotal} />
          </DataTable>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "end",
          height: "5vh",
          width: "200vh",
        }}
      >
        <h3>TOTAL:</h3>
        &ensp; &ensp;
        <a>{"Q " + Number(dataTotal ? dataTotal : "0.00").toFixed(2)}</a>
      </div>
    </>
  );
};

export default AssignProduct;
