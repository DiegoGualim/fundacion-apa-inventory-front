import React, { useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { deleteUser } from "../../Routes/api.routes";
import "../../public/css/ToolTips.module.css";

const DeleteUser = ({ id, username, getDataAllUsers }) => {
  const [displayBasic, setDisplayBasic] = useState(false);
  const dialogFuncMap = {
    displayBasic: setDisplayBasic,
  };

  const onClick = (name) => {
    dialogFuncMap[`${name}`](true);
  };

  const onHide = (name) => {
    dialogFuncMap[`${name}`](false);
  };

  const deleteDataUser = async (name) => {
    const response = await deleteUser(id);
    getDataAllUsers();
    onHide(name);
  };

  const renderFooter = (name) => {
    return (
      <div>
        <Button
          label="Cancel"
          icon="pi pi-times"
          onClick={() => onHide(name)}
          className="p-button-text"
        />
        <Button
          label="Si"
          icon="pi pi-check"
          onClick={() => deleteDataUser(name)}
          autoFocus
        />
      </div>
    );
  };
  return (
    <>
      <Button
        className="p-button-danger"
        tooltip="Eliminar Usuario"
        tooltipOptions={{
          position: "bottom",
          mouseTrack: true,
          mouseTrackTop: 15,
        }}
        icon="pi pi-trash"
        onClick={() => onClick("displayBasic")}
      />
      <Dialog
        header="Eliminar"
        visible={displayBasic}
        style={{ width: "50vw" }}
        footer={renderFooter("displayBasic")}
        onHide={() => onHide("displayBasic")}
      >
        Desea eliminar al usuario {username}
      </Dialog>
    </>
  );
};

export default DeleteUser;
