import React from "react";
import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons
import "primeflex/primeflex.css";
import Layout from "../../components/Layout/Menu";
import ListCategories from "../../components/Admin/ListCategories";

const listCategories = () => {
  return (
    <Layout>
      <ListCategories />
    </Layout>
  );
};

export default listCategories;
