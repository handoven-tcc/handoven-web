import React, { useState, useEffect, useRef } from "react";
import { Menu } from "primereact/menu";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ProductService } from "../service/ProductService";
import {GoumetDialog} from "../components/GoumetDialog/index";
import { PlatesService } from "../service/PlatesService";

const Dashboard = (props) => {
    let emptyProduct = {
        id: null,
        name: "",
        type: "",
        validity: "",
        category: null,
        cost: 0,
        amount: 0,
    };
    const [plates, setPlates] = useState(null);
    const [rowIndex, setRowIndex] = useState(0);
    const [products, setProducts] = useState(null);
    const [gourmetDialog, setGourmetDialog] = useState(false);
    const menu1 = useRef(null);

    
    useEffect(() => {
        
        const _platesService = new PlatesService({});
        _platesService.getPlates().then((data) => setPlates(data))
        const _productService = new ProductService();
        _productService.getProducts().then((data) => setProducts(data));
        document.documentElement.style.fontSize = '14px'
    }, []);
    const openGourmet = (index) => {
        setRowIndex(index);
        setGourmetDialog(true);
    };
    const hideDialog = () => {
        setGourmetDialog(false);
    };
    
    return (
        <div className="grid">
            

            <div className="col-12 xl:col-6">
                <div className="card">
                    <h5>Historico de Receitas</h5>
                    <DataTable value={plates} rows={6} size='small' paginator responsiveLayout="scroll">
                        <Column field="nome" header="Nome" sortable style={{ width: "35%" }} />
                        <Column
                            header="View"
                            style={{ width: "0%" }}
                            body={(data, props) => (
                                <>
                                    <Button icon="pi pi-search" type="button" className="p-button-text" onClick={() => openGourmet(props.rowIndex)}/>
                                </>
                            )}
                        />
                    </DataTable>
                </div>
            </div>
            <div className="col-12 xl:col-6">
                <div className="card">
                    <h5>Estoque</h5>
                    <DataTable value={products} rows={6} paginator responsiveLayout="scroll">
                        <Column field="name" header="Nome" sortable style={{ width: "40%" }} />
                        <Column field="category" header="Categoria" sortable style={{ width: "30%" }} />
                        <Column field="type" header="Tipo" sortable style={{ width: "30%" }} />
                        
                    </DataTable>
                </div>
            </div>
            <GoumetDialog gourmetDialog={gourmetDialog} hideDialog={hideDialog} plates={plates} index={rowIndex}/>

        </div>
    );
};

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname && prevProps.colorMode === nextProps.colorMode;
};

export default React.memo(Dashboard, comparisonFn);
