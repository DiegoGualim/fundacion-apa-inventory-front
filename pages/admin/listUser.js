import React from "react";
import MenuAdm from "../../components/Layout/MenuAdm";
import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons
import "primeflex/primeflex.css";
import ListUsers from "../../components/Admin/ListUsers";

const listUser = () => {
  return (
    <MenuAdm>
      <ListUsers />
    </MenuAdm>
  );
};

export default listUser;
