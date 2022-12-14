import React from "react";
import MenuAdm from "../../components/Layout/MenuAdm";
import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons
import "primeflex/primeflex.css";
import SalesDate from "../../components/Admin/SalesDate";

const salesDate = () => {
  return (
    <MenuAdm>
      <SalesDate />
    </MenuAdm>
  );
};

export default salesDate;
