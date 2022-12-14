import React, { useCallback, useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { getAllUsers } from "../../Routes/api.routes";
import DeleteUser from "./DeleteUser";

const ListUsers = () => {
  const [user, setUser] = useState([]);

  const getDataAllUsers = useCallback(async () => {
    const response = await getAllUsers();
    setUser(response);
  }, []);

  useEffect(() => {
    getDataAllUsers();
  }, []);

  const buttonD = (props) => {
    return (
      <div className="grid p-fluid">
        <DeleteUser
          id={props.id}
          username={props.username}
          getDataAllUsers={getDataAllUsers}
        />
      </div>
    );
  };

  const bDelete = (props) => {
    return buttonD(props);
  };

  const header = (
    <div className="table-header">
      <h2>Usuarios</h2>
    </div>
  );

  return (
    <div className="datatable-templating-demo">
      <div className="card">
        <DataTable value={user} header={header} responsiveLayout="scroll">
          <Column
            sortable
            align="center"
            field="username"
            header="Nombre Usuario"
          />
          <Column sortable align="center" field="email" header="Correo" />
          <Column sortable align="center" field="type" header="Rol" />
          <Column field="" header="Acciones" body={bDelete} />
        </DataTable>
      </div>
    </div>
  );
};

export default ListUsers;
