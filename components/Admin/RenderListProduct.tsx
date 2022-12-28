import React from 'react';
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const RenderListProduct = ({product, header, filters, renderPrice, bActions}) => {
  return (
    <div className="datatable-templating-demo">
      <div className="card">
        <DataTable
          value={product}
          header={header}
          filters={filters}
          filterDisplay="menu"
          responsiveLayout="scroll"
          globalFilterFields={[
            "nombre_producto",
            "nombre_categoria",
            "unidad_medida",
            "fecha_expiracion",
            "precio",
            "codigo_producto",
            "codigo_barras",
          ]}
          emptyMessage="No se encontro el producto."
        >
          <Column sortable align="center" field="id" header="No." />
          <Column
            sortable
            align="center"
            field="nombre_producto"
            header="Producto"
          />
          <Column
            sortable
            align="center"
            field="nombre_categoria"
            header="Categoria"
          />
          <Column
            sortable
            align="center"
            field="unidad_medida"
            header="Unidad de Medida"
          />
          <Column
            sortable
            align="center"
            field="fecha_expiracion"
            header="Fecha"
          />
          <Column sortable align="center" field="stock" header="Unidades" />
          <Column
            sortable
            align="center"
            field="precio"
            header="Precio"
            body={renderPrice}
          />
          <Column
            sortable
            align="center"
            field="codigo_producto"
            header="Codigo Producto"
          />
          <Column
            sortable
            align="center"
            field="codigo_barras"
            header="Codigo Barras"
          />
          <Column field="" align="center" header="Acciones" body={bActions} />
        </DataTable>
      </div>
    </div>
  )
}

export default RenderListProduct