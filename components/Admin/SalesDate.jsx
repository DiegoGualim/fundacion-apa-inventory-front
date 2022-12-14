import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { getSaleReportData } from "../../Routes/api.routes";
import { FilterMatchMode, FilterOperator } from "primereact/api";

const SalesDate = () => {
  const [date1, setDate1] = useState({
    fechaInicio: "",
    fechaFin: "",
  });
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [generation, setGeneration] = useState(false);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    Numero_Solicitud: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    area_solicito: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    fecha_solicitud: { value: null, matchMode: FilterMatchMode.IN },
    precio: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
    },
    total: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
    },
    usuario_solicito: {
      operator: FilterOperator.OR,
      constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
    },
  });
  const [data, setData] = useState([]);
  const [dataNormal, setDataNormal] = useState([]);
  const cols = [
    { field: "Numero_Solicitud", header: "No. Solicitud" },
    { field: "area_solicito", header: "Area de la Solicitud" },
    { field: "fecha_solicitud", header: "Fecha de la Solicitud" },
    { field: "total", header: "Total" },
    { field: "usuario_solicito", header: "Usuario Solicitante" },
  ];

  const hadleChange = (name, values) => {
    setDate1({
      ...date1,
      [name]: values,
    });
  };

  const getDataSaleNormal = async () => {
    const result = await getSaleReportData(date1);
    setDataNormal(result);
  };

  const getDataSale = async () => {
    setGeneration(true);
    const result = await getSaleReportData(date1);
    setData(result);
    exportPdf(result);
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
        doc.save("Ventas por Rango de Fechas.pdf");
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
      <h2>Reporte de Ventas</h2>
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
          <h2>Ventas por Rango de Fechas</h2>
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
              "Numero_Solicitud",
              "area_solicito",
              "fecha_solicitud",
              "usuario_solicito",
            ]}
          >
            <Column
              sortable
              align="center"
              field="Numero_Solicitud"
              header="Numero de Solicitud"
            />
            <Column
              sortable
              align="center"
              field="area_solicito"
              header="Area Solicitud"
            />
            <Column
              sortable
              align="center"
              field="fecha_solicitud"
              header="Fecha"
            />
            <Column sortable align="center" field="total" header="Total" />
            <Column
              sortable
              align="center"
              field="usuario_solicito"
              header="Usuario que solicito"
            />
          </DataTable>
        </div>
      </div>
    </div>
  );
};

export default SalesDate;
