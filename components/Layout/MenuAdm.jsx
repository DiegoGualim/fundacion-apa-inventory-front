import React from "react";
import { Menubar } from "primereact/menubar";
import { Button } from "primereact/button";
import { useRouter } from "next/router";
import "../../public/css/ToolTips.module.css";

const Menu = ({ children }) => {
  const router = useRouter();

  const items = [
    {
      label: "Inventario",
      icon: "pi pi-fw pi-box",
      items: [
        {
          label: "Agregar Categoría",
          icon: "pi pi-fw pi-book",
          url: "/admin/listCategories",
        },
        {
          label: "Catalogo de Productos",
          icon: "pi pi-fw pi-cart-plus",
          url: "/admin/catalogueProducts"
        },
        {
          separator: true,
        },
        {
          label: "Registro de Solicitudes",
          icon: "pi pi-fw pi-shopping-bag",
          url: "/admin/assign",
        },
      ],
    },
    {
      label: "Usuarios",
      icon: "pi pi-fw pi-user",
      items: [
        {
          label: "Nuevo",
          icon: "pi pi-fw pi-user-plus",
          url: "/admin/createUser",
        },
        {
          label: "Lista",
          icon: "pi pi-fw pi-users",
          url: "/admin/listUser",
        },
      ],
    },
    {
      label: "Reportes",
      icon: "pi pi-fw pi-file-pdf",
      items: [
        {
          label: "Reporte de Ventas",
          icon: "pi pi-fw pi-file-export",
          url: "/admin/salesDate",
        },
        {
          label: "Reporte de Ventas por Categoria",
          icon: "pi pi-fw pi-file-export",
          url: "/admin/categorysaleDate",
        },
      ],
    },
  ];

  const endSession = () => {
    router.push("/");
  };

  // eslint-disable-next-line @next/next/no-img-element
  const start = <img alt="logo" src="https://fundacion-apa.guaitech-app.com/img/logo.0947efbf.jpeg" onError={(e) => e.target.src='https://fundacion-apa.guaitech-app.com/img/logo.0947efbf.jpeg'} height="40" className="mr-2"></img>;
  const end = (
    <Button
      icon="pi pi-fw pi-power-off"
      className="p-button-rounded p-button-text p-button-plain"
      aria-label="Filter"
      tooltip="Cerrar Sesion"
      tooltipOptions={{ position: 'bottom', mouseTrack: true, mouseTrackTop: 15 }}
      onClick={endSession}
    />
  );
  return (
    <div>
      <div className="card">
        <Menubar model={items} start={start} end={end} />
        {children}
      </div>
    </div>
  );
};

export default Menu;
