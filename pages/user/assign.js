import React from "react";
import Layout from "../../components/Layout/Menu";
import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons
import "primeflex/primeflex.css";
import AssignProduct from "../../components/Admin/AssignProduct";

const assign = () => {
  return (
    <Layout>
      <AssignProduct />
    </Layout>
  );
};

export default assign;
