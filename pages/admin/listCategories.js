import React from "react";
import MenuAdm from "../../components/Layout/MenuAdm";
import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons
import "primeflex/primeflex.css";
import ListCategories from "../../components/Admin/ListCategories";
const listCategories = () => {
  return (
    <MenuAdm>
        <ListCategories />
    </MenuAdm>
  )
}

export default listCategories