import React from 'react';
import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons
import "primeflex/primeflex.css";
import MenuAdm from "../components/Layout/MenuAdm";
import Table from '../components/Table';

const MenuAdmin = () => {
  return (
    <MenuAdm>
        <Table />
    </MenuAdm>
  )
}

export default MenuAdmin