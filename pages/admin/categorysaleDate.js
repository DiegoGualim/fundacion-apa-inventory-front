import React from "react";
import MenuAdm from "../../components/Layout/MenuAdm";
import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons
import "primeflex/primeflex.css";
import CategorySale from "../../components/Admin/CategorySale";

const categorysaleDate = () => {
  return (
    <MenuAdm>
      <CategorySale />
    </MenuAdm>
  );
};

export default categorysaleDate;
