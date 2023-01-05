import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { getCategorySaleReportData } from "../../Routes/api.routes";
import { FilterMatchMode, FilterOperator } from "primereact/api";

const CategorySale = () => {
  const [date1, setDate1] = useState({
    fechaInicio: "",
    fechaFin: "",
  });
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
    stock: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
    },
    area_solicito: {
      operator: FilterOperator.OR,
      constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
    },
    total_clinica: { value: null, matchMode: FilterMatchMode.BETWEEN },
  });
  const [data, setData] = useState([]);
  const [dataNormal, setDataNormal] = useState([]);
  const cols = [
    { field: "nombre_producto", header: "Nombre del Producto" },
    { field: "unidad_medida", header: "Unidad de Medida" },
    { field: "nombre_categoria", header: "Nombre de Categoria" },
    { field: "fecha_expiracion", header: "Fecha Expiración" },
    { field: "stock", header: "Existencia" },
    { field: "area_solicito", header: "Área Solicito" },
    { field: "total_clinica", header: "Total Solicitado por Clinica" },
    { field: "total_dinero", header: "Total Efectivo" },
  ];

  const hadleChange = (name, values) => {
    setDate1({
      ...date1,
      [name]: values,
    });
  };

  const getDataSaleNormal = async () => {
    const result = await getCategorySaleReportData(date1);
    setDataNormal(result);
    console.log(result);
  };

  const getDataSale = async () => {
    setGeneration(true);
    const result = await getCategorySaleReportData(date1);
    
    if(result.errno == 1064){
      alert('Hubo un error');
    }else{
      setData(result);
      exportPdf(result);
    }
  };

  useEffect(() => {
    getDataSaleNormal();
  }, []);

  const exportPdf = async (result) => {
    import("jspdf").then((jsPDF) => {
      import("jspdf-autotable").then(() => {
        const doc = new jsPDF.default(0, 0);
        doc.autoTable(exportColumns, result);
        setGeneration(false);
        doc.save("Ventas por Categoria.pdf");
      });
    });
  };

  const exportColumns = cols.map((col) => ({
    title: col.header,
    dataKey: col.field,
  }));

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };
    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const header = (
    <div className="table-header">
      <h2>Reporte de Ventas por Categoria</h2>
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
      </div>
    </div>
  );

  return (
    <div>
      <div className="card">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h2>Ventas por Categoria</h2>
        </div>
        <div className="p-fluid grid formgrid">
          &ensp; &ensp; &ensp; &ensp; &ensp; &ensp; &ensp; &ensp; &ensp; &ensp;
          &ensp; &ensp; &ensp; &ensp; &ensp; &ensp; &ensp; &ensp; &ensp;
          &ensp;&ensp; &ensp; &ensp; &ensp; &ensp; &ensp; &ensp;
          <div className="field col-12 md:col-4">
            <InputText
              type="date"
              id="fechaInicio"
              name="fechaInicio"
              onChange={(e) => hadleChange(e.target.name, e.target.value)}
            />
          </div>
          <div className="field col-12 md:col-4">
            <InputText
              type="date"
              id="fechaFin"
              name="fechaFin"
              onChange={(e) => hadleChange(e.target.name, e.target.value)}
            />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button
            label={generation ? 'Generando PDF...' : 'Generar PDF'}
            className="p-button-info"
            onClick={getDataSale}
          />
        </div>
      </div>
      &ensp; &ensp; &ensp; &ensp; &ensp; &ensp; &ensp; &ensp; &ensp; &ensp;
      <div className="datatable-templating-demo">
        <div className="card">
          <DataTable
            value={dataNormal}
            header={header}
            filters={filters}
            filterDisplay="menu"
            responsiveLayout="scroll"
            globalFilterFields={[
              "nombre_producto",
              "unidad_medida",
              "nombre_categoria",
              "fecha_expiracion",
              "area_solicito",
              "total_clinica",
            ]}
            emptyMessage="No se encontro el producto."
          >
            <Column
              sortable
              align="center"
              field="nombre_producto"
              header="Nombre del Producto"
            />
            <Column
              sortable
              align="center"
              field="unidad_medida"
              header="Unidad de Medida"
            />
            <Column
              sortable
              align="center"
              field="nombre_categoria"
              header="Nombre de Categoria"
            />
            <Column
              sortable
              align="center"
              field="fecha_expiracion"
              header="Fecha Expiración"
            />
            <Column sortable align="center" field="stock" header="Existencia" />
            <Column
              sortable
              align="center"
              field="area_solicito"
              header="Área Solicito"
            />
            <Column
              sortable
              align="center"
              field="total_clinica"
              header="Total Solicitado por Clinica"
            />
            <Column
              sortable
              align="center"
              field="total_dinero"
              header="Total Efectivo"
            />
          </DataTable>
        </div>
      </div>
    </div>
  );
};

export default CategorySale;
