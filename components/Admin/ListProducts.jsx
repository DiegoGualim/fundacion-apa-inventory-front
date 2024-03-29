import React, { useCallback, useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { getAllProducts, getAllCategories } from "../../Routes/api.routes";
import ModalEditProduct from "./ModalEditProduct";
import ModalDeleteProduct from "./ModalDeleteProduct";
import ModalCreateProduct from "./ModalCreateProduct";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import RenderListProduct from "./RenderListProduct";

const ListProducts = () => {
  let n = 0;
  const [product, setProduct] = useState([]);
  const [getCategory, setGetCategory] = useState([]);
  let categoryElement = [];
  const [isLoading, setLoading] = useState(true);
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [generation, setGeneration] = useState(false);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    nombre_producto: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    unidad_medida: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    fecha_expiracion: { value: null, matchMode: FilterMatchMode.IN },
    precio: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
    },
    codigo_producto: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
    },
    status: {
      operator: FilterOperator.OR,
      constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
    },
    codigo_barras: { value: null, matchMode: FilterMatchMode.BETWEEN },
    nombre_categoria: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
  });
  const cols = [
    { field: "id", header: "No." },
    { field: "nombre_producto", header: "Nombre Producto" },
    { field: "nombre_categoria", header: "Categoria" },
    { field: "tipo_clinica", header: "Área" },
    { field: "unidad_medida", header: "Unidad Medida" },
    { field: "fecha_expiracion", header: "Fecha de Expiración" },
    { field: "stock", header: "Stock" },
    { field: "precio", header: "Precio" },
    { field: "codigo_producto", header: "Codigo Producto" },
    { field: "codigo_barras", header: "Codigo de Barras" },
  ];

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

  const getAllDataProducts = useCallback(async () => {
    try {
      const response = await getAllProducts();
      if (response.errno == 1135) {
        n++;
        console.log("Intentando: " + n);
        setTimeout(() => {
          getAllDataProducts();
        }, 10000);
      } else {
        setProduct(response);
        setLoading(false);
      }
    } catch (error) {
      window.location.reload(true);
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      getAllDataProducts();
    }, 10000);
    getAllDataCategorys();
  }, []);

  const buttons = (props) => {
    return (
      <div className="grid p-fluid">
        <ModalEditProduct
          props={props}
          getAllDataProducts={getAllDataProducts}
          categoryElement={categoryElement}
          getAllDataCategorys={getAllDataCategorys}
        />
        &ensp; &ensp;
        <ModalDeleteProduct
          id={props.id}
          productName={props.nombre_producto}
          getAllDataProducts={getAllDataProducts}
        />
      </div>
    );
  };

  const exportColumns = cols.map((col) => ({
    title: col.header,
    dataKey: col.field,
  }));

  const exportPdf = () => {
    setGeneration(true);
    import("jspdf").then((jsPDF) => {
      import("jspdf-autotable").then(() => {
        const doc = new jsPDF.default(0, 0);
        doc.autoTable(exportColumns, product, {
          styles: {
            fontSize: 6,
          },
        });
        setGeneration(false);
        doc.save("Productos en Existencia.pdf");
      });
    });
  };

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };
    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const prices = (props) => {
    return <a>{"Q. " + props.precio}</a>;
  };

  const bActions = (props) => {
    return buttons(props);
  };

  const renderPrice = (props) => {
    return prices(props);
  };

  const header = (
    <div className="table-header">
      <h2>Inventario</h2>
      <div
        style={{
          display: "flex",
          justifyContent: "end",
        }}
      >
        <InputText
          value={globalFilterValue}
          onChange={onGlobalFilterChange}
          placeholder="Buscar Producto"
        />
        &ensp; &ensp;
        <ModalCreateProduct getAllDataProducts={getAllDataProducts} />
        &ensp; &ensp;
        <Button
          label={generation ? "Generando PDF..." : ""}
          tooltip="PDF"
          tooltipOptions={{
            position: "bottom",
            mouseTrack: true,
            mouseTrackTop: 15,
          }}
          type="button"
          icon="pi pi-file-pdf"
          onClick={exportPdf}
          className="p-button-warning mr-2"
          data-pr-tooltip="PDF"
        />
      </div>
    </div>
  );

  if (isLoading) {
    return <div>Cargando...</div>;
  } else {
    return (
      <RenderListProduct
        product={product}
        header={header}
        filters={filters}
        renderPrice={renderPrice}
        bActions={bActions}
      />
    );
  }

  return <></>;
};

export default ListProducts;
