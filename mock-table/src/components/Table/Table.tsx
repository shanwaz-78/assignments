import { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputSwitch } from "primereact/inputswitch";
import { getData } from "../../services/Api";

export default function Table() {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [rowClick, setRowClick] = useState(true);

  useEffect(() => {
    getData()
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  return (
    <div className="card">
      <div className="flex justify-content-center align-items-center mb-4 gap-2">
        <InputSwitch
          inputId="input-rowclick"
          checked={rowClick}
          onChange={(e) => setRowClick(e.value)}
        />
        <label htmlFor="input-rowclick">Row Click</label>
      </div>
      <DataTable
        value={products}
        selectionMode={rowClick ? null : "checkbox"}
        selection={selectedProducts}
        onSelectionChange={(e) => setSelectedProducts(e.value)}
        dataKey="id"
        tableStyle={{ minWidth: "50rem" }}
      >
        <Column
          selectionMode="multiple"
          headerStyle={{ width: "3rem" }}
        ></Column>
        <Column field="code" header="Code"></Column>
        <Column field="name" header="Name"></Column>
        <Column field="category" header="Category"></Column>
        <Column field="quantity" header="Quantity"></Column>
      </DataTable>
    </div>
  );
}
