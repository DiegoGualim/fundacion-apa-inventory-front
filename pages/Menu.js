import React from "react";
import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons
import "primeflex/primeflex.css";
import AssignProduct from "../components/Admin/AssignProduct";
import Layout from "../components/Layout/Menu";

const Menu = () => {
  return (
    <Layout>
      <AssignProduct />
    </Layout>
  );
};

export default Menu;
