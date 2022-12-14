import React from "react";
import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons
import "primeflex/primeflex.css";
import Layout from "../../components/Layout/Menu";
import ListProducts from "../../components/Admin/ListProducts";

const catalogueProducts = () => {
  return (
    <Layout>
      <ListProducts />
    </Layout>
  );
};

export default catalogueProducts;
