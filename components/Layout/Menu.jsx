import React from "react";
import { Menubar } from "primereact/menubar";
import { Button } from "primereact/button";
import { useRouter } from "next/router";
import "../../public/css/ToolTips.module.css";

const Menu = ({ children }) => {
  const router = useRouter();

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
        <Menubar /* model={items} */ start={start} end={end} />
        {children}
      </div>
    </div>
  );
};

export default Menu;
