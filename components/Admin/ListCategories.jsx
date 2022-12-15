import React, { useCallback, useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { getAllCategories } from "../../Routes/api.routes";
import ModalEdit from "./ModalEdir";
import ModalDelete from "./ModalDelete";
import ModalCreate from "./ModalCreate";

const ListCategories = () => {
  const [category, setCategory] = useState([]);

  const getAllDataCategorys = useCallback(async () => {
    const response = await getAllCategories();
    setCategory(response);
  }, []);

  useEffect(() => {
    getAllDataCategorys();
  }, []);

  const buttons = (props) => {
    return (
      <div className="grid p-fluid">
        <ModalEdit
          id={props.id}
          nameCategory={props.nombre_categoria}
          clinic={props.tipo_clinica}
          getAllDataCategorys={getAllDataCategorys}
        />
        &ensp; &ensp;
        <ModalDelete
          id={props.id}
          nameCategory={props.nombre_categoria}
          getAllDataCategorys={getAllDataCategorys}
        />
      </div>
    );
  };

  const bActions = (props) => {
    return buttons(props);
  };

  const header = (
    <div className="table-header">
      Tabla de Categorias
      <div
        style={{
          display: "flex",
          justifyContent: "end",
        }}
      >
        <ModalCreate getAllDataCategorys={getAllDataCategorys} />
        &ensp; &ensp;
      </div>
    </div>
  );

  return (
    <div className="datatable-templating-demo">
      <div className="card">
        <DataTable value={category} header={header}>
          <Column sortable align="center" field="id" header="No." />
          <Column
            sortable
            align="center"
            field="nombre_categoria"
            header="Nombre de Categoria"
          />
          <Column
            sortable
            align="center"
            field="tipo_clinica"
            header="Área"
          />
          <Column field="" align="left" header="Acciones" body={bActions} />
        </DataTable>
      </div>
    </div>
  );
};

export default ListCategories;
