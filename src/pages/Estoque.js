import React, { useState, useEffect, useRef } from "react";
import classNames from "classnames";
import { Calendar } from 'primereact/calendar';
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { InputNumber } from "primereact/inputnumber";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { ProductService } from "../service/ProductService";

const Estoque = () => {
    const familyId = localStorage.getItem('familyId')
    let emptyProduct = {
        id: null,
        name: "",
        type: "",
        validity: "",
        category: null,
        cost: 0,
        amount: 0,
        familyId: familyId,
    };


    const [products, setProducts] = useState(null);
    const [productDialog, setProductDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
    const [product, setProduct] = useState(emptyProduct);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);

    useEffect(() => {
        const productService = new ProductService();
        productService.getProductsByFamilyId(familyId).then((data) => setProducts(data));
        document.documentElement.style.fontSize = '14px'
    }, [familyId]);

    const formatCurrency = (value) => {
        return Intl.NumberFormat("pt-br", { style: "currency", currency: "BRL" }).format(value);
    };

    const openNew = () => {
        setProduct(emptyProduct);
        setSubmitted(false);
        setProductDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setProductDialog(false);
    };

    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
    };

    const hideDeleteProductsDialog = () => {
        setDeleteProductsDialog(false);
    };

    const saveProduct = async () => {
        setSubmitted(true);
        const productService = new ProductService();
        
        let _products = [...products];
        let _product = { ...product };

        if (!_product.name || !_product.amount || !_product.category || !_product.cost || !_product.type || !_product.validity || !_product.familyId) return;

        if (product.id) {
            const index = findIndexById(product.id);
            _products[index] = await productService.putProduct(product.id, product);
            toast.current.show({ severity: "success", summary: "Successful", detail: "Produto Editado com sucesso!", life: 3000 });
        }

        if (!product.id) {
            _products.unshift(await productService.postProducts(product));
            toast.current.show({ severity: "success", summary: "Successful", detail: "Produto Criado com sucesso!", life: 3000 });
        }

        setProducts(_products);
        setProductDialog(false);
        setProduct(emptyProduct);
    };

    function toUTC(value){
        if (value == null || value === undefined || value === '') {
            return null;
        }

        const dateValue = new Date(value);

        const dateWithNoTimezone = new Date(
            dateValue.getUTCFullYear(),
            dateValue.getUTCMonth(),
            dateValue.getUTCDate(),
            dateValue.getUTCHours(),
            dateValue.getUTCMinutes(),
            dateValue.getUTCSeconds()
        );

        return dateWithNoTimezone;
    }


    function toUTCDate(value) {
        if (value == null || value === undefined || value === '') {
            return null;
        }

        const dateValue = new Date(value);

        const dateWithNoTimezone = new Date(
            dateValue.getUTCFullYear(),
            dateValue.getUTCMonth(),
            dateValue.getUTCDate()
        );

        return dateWithNoTimezone;
    }

    function now() {
        return toUTC(new Date());
    }

    function toDate(valor) {
        if (valor === null || valor === undefined || valor === '') {
            return now();
        }

        const data = toUTCDate(valor);
        return isNaN(data.valueOf())
            ? now()
            : data;
    }


    const editProduct = (product) => {
        setProduct({ ...product });
        setProductDialog(true);
    };

    const confirmDeleteProduct = (product) => {
        setProduct(product);
        setDeleteProductDialog(true);
    };

    const deleteProduct = async () => {
        const productService = new ProductService();
        let _products = products.filter((val) => val.id !== product.id);

        await productService.deleteProduct(product.id);
        setProducts(_products);
        setDeleteProductDialog(false);
        setProduct(emptyProduct);
        toast.current.show({ severity: "success", summary: "Successful", detail: "Produto Deletado com sucesso!", life: 3000 });
    };

    const findIndexById = (id) => {
        let index = -1;
        for (let i = 0; i < products.length; i++) {
            if (products[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    };

    const exportCSV = () => {
        dt.current.exportCSV();
    };

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label="Exportar" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />
            </React.Fragment>
        )
    }

    const confirmDeleteSelected = () => {
        setDeleteProductsDialog(true);
    };

    const deleteSelectedProducts = () => {
        const productService = new ProductService();
        let _products = products.filter((val) => !selectedProducts.includes(val));

        selectedProducts.forEach((o) => productService.deleteProduct(o.id));
        setProducts(_products);
        setDeleteProductsDialog(false);
        setSelectedProducts(null);
        toast.current.show({ severity: "success", summary: "Successful", detail: "Produtos Deletados com sucesso!", life: 3000 });
    };

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || "";
        let _product = { ...product };
        _product[`${name}`] = val;

        setProduct(_product);
    };

    const onDataChange = (e, name) => {
        const date = (e.target && e.target.value) || "";
        let _product = { ...product };
        _product[`${name}`] = date;
        setProduct(_product);
    };

    const onInputNumberChange = (e, name) => {
        const val = e.value || 0;
        let _product = { ...product };
        _product[`${name}`] = val;

        setProduct(_product);
    };

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button label="Novo" icon="pi pi-plus" className="p-button-success mr-2" onClick={openNew} />
                    <Button label="Deletar" icon="pi pi-trash" className="p-button-danger" onClick={confirmDeleteSelected} disabled={!selectedProducts || !selectedProducts.length} />
                </div>
            </React.Fragment>
        );
    };

    const nameBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Name</span>
                {rowData.name}
            </>
        );
    };

    const amountBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Amount</span>
                {rowData.amount}
            </>
        );
    };

    const costBodyTemplate = (rowData) => {
        const custo = formatCurrency(rowData.cost);
        return (
            <>
                <span className="p-column-title">Cost</span>
                {custo}
            </>
        );
    };

    const typeBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Tipo</span>
                {rowData.type}
            </>
        );
    };

    const categoryBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Categoria</span>
                {rowData.category}
            </>
        );
    };

    const validityBodyTemplate = (rowData) => {
        var data = new Date(rowData.validity);
        const validade = data.toLocaleDateString("pt-br");
        return (
            <>
                <span className="p-column-title">Validity</span>
                {validade}
            </>
        );
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <div className="actions">
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-warning" onClick={() => editProduct(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger ml-2" onClick={() => confirmDeleteProduct(rowData)} />
            </div>
        );
    };

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Estoque de Produtos</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Pesquisar" />
            </span>
        </div>
    );

    const productDialogFooter = (
        <>
            <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Salvar" icon="pi pi-check" className="p-button-text" onClick={saveProduct} />
        </>
    );
    const deleteProductDialogFooter = (
        <>
            <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProductDialog} />
            <Button label="Deletar" icon="pi pi-check" className="p-button-text" onClick={deleteProduct} />
        </>
    );
    const deleteProductsDialogFooter = (
        <>
            <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProductsDialog} />
            <Button label="Deletar" icon="pi pi-check" className="p-button-text" onClick={deleteSelectedProducts} />
        </>
    );

    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
                    <Toast ref={toast} />
                    <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                    <DataTable
                        ref={dt}
                        value={products}
                        selection={selectedProducts}
                        onSelectionChange={(e) => setSelectedProducts(e.value)}
                        dataKey="id"
                        paginator
                        rows={10}
                        rowsPerPageOptions={[5, 10, 25]}
                        className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                        globalFilter={globalFilter}
                        emptyMessage="Produtos não encontrados."
                        header={header}
                        responsiveLayout="scroll"
                    >
                        <Column selectionMode="multiple"></Column>
                        <Column field="name" header="Nome" sortable body={nameBodyTemplate}></Column>
                        <Column field="amount" header="Quantidade" sortable body={amountBodyTemplate}></Column>
                        <Column field="category" header="Categoria" sortable body={categoryBodyTemplate}></Column>
                        <Column field="type" header="Tipo" sortable body={typeBodyTemplate}></Column>
                        <Column field="cost" header="Custo" sortable body={costBodyTemplate}></Column>
                        <Column field="validity" header="Validade" sortable body={validityBodyTemplate}></Column>
                        <Column bodyClassName="text-right" body={actionBodyTemplate}></Column>
                    </DataTable>

                    <Dialog visible={productDialog} style={{ width: "450px" }} header="Detalhes do Produto" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                        <div className="field">
                            <label htmlFor="name">Nome</label>
                            <InputText id="name" value={product.name} onChange={(e) => onInputChange(e, "name")} required autoFocus className={classNames({ "p-invalid": submitted && !product.name })} />
                            {submitted && !product.name && <small className="p-invalid">Preencha o Nome.</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="type">Tipo</label>
                            <InputText id="type" value={product.type} onChange={(e) => onInputChange(e, "type")} required className={classNames({ "p-invalid": submitted && !product.type })} />
                            {submitted && !product.type && <small className="p-invalid">Preencha o Tipo.</small>}
                        </div>
                        <div className="field">
                            <label className="mb-3">Categoria</label>
                            <InputText id="category" value={product.category} onChange={(e) => onInputChange(e, "category")} required className={classNames({ "p-invalid": submitted && !product.category })} />
                            {submitted && !product.category && <small className="p-invalid">Preencha a Categoria.</small>}
                        </div>
                        <div className="field">
                            <label className="mb-3">Validade</label>
                            <Calendar id="validity" dateFormat="dd/mm/yy" value={toDate(product.validity)} onChange={(e) => onDataChange(e, "validity")} required className={classNames({ "p-invalid": submitted && !product.validity })} />
                            {submitted && !product.validity && <small className="p-invalid">Preencha a Validade.</small>} 
                        </div>
                        <div className="formgrid grid">
                            <div className="field col">
                                <label htmlFor="cost">Valor</label>
                                <InputNumber id="cost" value={product.cost} onValueChange={(e) => onInputNumberChange(e, "cost")} required mode="currency" currency="BRL" locale="pt-br" className={classNames({ "p-invalid": submitted && !product.cost })} />
                                {submitted && !product.cost && <small className="p-invalid">Preencha o Valor.</small>}
                            </div>
                            <div className="field col">
                                <label htmlFor="amount">Quantidade</label>
                                <InputNumber id="amount" value={product.amount} showButtons min={0} max={100} onValueChange={(e) => onInputNumberChange(e, "amount")} required integeronly className={classNames({ "p-invalid": submitted && !product.amount })} />
                                {submitted && !product.amount && <small className="p-invalid">Preencha a Quantidade.</small>}
                            </div>
                        </div>
                    </Dialog>

                    <Dialog visible={deleteProductDialog} style={{ width: "450px" }} header="Confirm" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: "2rem" }} />
                            {product && <span>Deseja deletar o produto <b>{product.name}</b>?</span>}
                        </div>
                    </Dialog>

                    <Dialog visible={deleteProductsDialog} style={{ width: "450px" }} header="Confirm" modal footer={deleteProductsDialogFooter} onHide={hideDeleteProductsDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: "2rem" }} />
                            {product && <span>Deseja deletar os produtos selecionados?</span>}
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(Estoque, comparisonFn);
