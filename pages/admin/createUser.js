import React from "react";
import CreateUser from "../../components/Admin/CreateUser";
import MenuAdm from "../../components/Layout/MenuAdm";
import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons
import "primeflex/primeflex.css";
const createUser = () => {
  return (
    <MenuAdm>
      <CreateUser />
    </MenuAdm>
  );
};

export default createUser;
