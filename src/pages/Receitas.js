import React, { useState, useEffect } from "react";
import { DataView, DataViewLayoutOptions } from "primereact/dataview";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { Dialog } from "primereact/dialog";
import { Steps } from "primereact/steps";

import { PlatesService } from "../service/PlatesService";

const Receitas = () => {
    //#region variaveis
    const [gourmetDialog, setGourmetDialog] = useState(false);
    const [dataviewValue, setDataviewValue] = useState(null);
    const [layout, setLayout] = useState("grid");
    const [activeIndex, setActiveIndex] = useState(0);
    const [plates, setPlates] = useState(null)
    const [sortKey, setSortKey] = useState(null);
    const [sortOrder, setSortOrder] = useState(null);
    const [sortField, setSortField] = useState(null);
    //#endregion
    const sortOptions = [
        { label: "Nome A-Z", value: "nome" },
        { label: "Nome Z-A", value: "!nome" },
    ];
    const dialogFuncMap = {
        gourmetDialog: setGourmetDialog,
    };

    const onClick = (name, position) => {
        dialogFuncMap[`${name}`](true);
    };

    const onHide = (name) => {
        setActiveIndex(0);
        dialogFuncMap[`${name}`](false);
    };

    useEffect(() => {
        const _platesService = new PlatesService({});
        _platesService.getPlates().then((data) => setDataviewValue(data));
        document.documentElement.style.fontSize = '14px'
    }, []);

    const onSortChange = (event) => {
        const value = event.value;

        if (value.indexOf("!") === 0) {
            setSortOrder(-1);
            setSortField(value.substring(1, value.length));
            setSortKey(value);
        } else {
            setSortOrder(1);
            setSortField(value);
            setSortKey(value);
        }
    };

    const formatCurrency = (value) => {
        return Intl.NumberFormat("pt-br", { style: "currency", currency: "BRL" }).format(value);
    };

    const openGourmet = (data) => {
        setPlates(data);
        setGourmetDialog(true);
    };

    const hideDialog = () => {
        setActiveIndex(0);
        setGourmetDialog(false);
    };

    //#region excluir
    const TESTE_recipes = [
        {
            name: "lasanha",
            ingredients: ["molho de tomate", "500 g de massa de lasanha", "300 g de berinjela fatiada", "300 g de abobrinha fatiada", "400 g de mussarela margherita", "350 g de molho de tomate italiano"],
        },
    ];

    const wizardItems = [{ label: "Detalhes" }, { label: "Preparo" }];
    const dataviewHeader = (
        <div className="grid grid-nogutter">
            <div className="col-6" style={{ textAlign: "left" }}>
                <Dropdown value={sortKey} options={sortOptions} optionLabel="label" placeholder="Ordenar Por Nome" onChange={onSortChange} />
            </div>
            <div className="col-6" style={{ textAlign: "right" }}>
                <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
            </div>
        </div>
    );
    //#endregion

    const dataviewListItem = (data) => {
        return (
            <div className="col-12">
                <div className="flex flex-column md:flex-row align-items-center p-3 w-full">

                    <div className="flex-1 text-center md:text-left">
                        <div className="font-bold text-2xl">{data.nome}</div>
                    </div>
                    <div className="flex flex-row md:flex-column justify-content-between w-full md:w-auto align-items-center md:align-items-end mt-5 md:mt-0">
                        <Button icon="pi pi-search" onClick={() => openGourmet(data)} />
                    </div>
                </div>
            </div>
        );
    };

    const dataviewGridItem = (data) => {
        return (
            <div className="col-12 md:col-4">
                <div className="card m-3 border-1 surface-border">

                    <div className="text-center">
                        <div className="mt-5 text-2xl font-bold">{data.nome}</div>
                    </div>
                    <div className="grid mt-6">
                        <span className="col-1"></span>
                        <span className="col-9 text-center">Veja mais sobre a receita </span>
                        <Button className="col-2" style={{ width: "44px" }} icon="pi pi-search" onClick={() => openGourmet(data)} />
                    </div>
                </div>
            </div>
        );
    };

    const itemTemplate = (data, layout) => {
        if (!data) {
            return;
        }

        if (layout === "list") {
            return dataviewListItem(data);
        } else if (layout === "grid") {
            return dataviewGridItem(data);
        }
    };

    const productDialogFooter = () => {
        return <Button label="OK" icon="pi pi-check" className="p-button-text" onClick={hideDialog} />;
    };

    return (
        <div className="col-12">
            <div className="card">
                <h5>Receitas</h5>
                <DataView value={dataviewValue} removableSort layout={layout} paginator rows={9} sortOrder={sortOrder} sortField={sortField} itemTemplate={itemTemplate} header={dataviewHeader}></DataView>
            </div>
            <div className="grid list-demo">
                <Dialog visible={gourmetDialog} modal style={{ width: "1080px" }} header="Detalhes da Receita" className="p-fluid" footer={productDialogFooter} onHide={() => onHide("gourmetDialog")}>
                    <div className="col-12 md:col-6">
                        <div className="pt-10">
                            <Steps style={{ width: "1000px" }} model={wizardItems} activeIndex={activeIndex} onSelect={(e) => setActiveIndex(e.index)} readOnly={false} />
                        </div>
                    </div>
                    {activeIndex === 0 ? (
                        <div>
                            {plates && (
                                <>
                                    <h3>{plates.nome}</h3>
                                    <h5>{plates.secao[0][0].nome}</h5>
                                    <ul>
                                        {plates.secao[0][0].conteudo.map((ingredient) => (
                                            <li>{ingredient}</li>
                                        ))}
                                    </ul>
                                </>
                            )}
                        </div>
                    ) : (
                        <div>
                            {plates && (
                                <>
                                    <h3>{plates.nome}</h3>
                                    <h5>{plates.secao[0][1].nome}</h5>
                                    <ul>
                                        {plates.secao[0][1].conteudo.map((preparo) => (
                                            <li>{preparo}</li>
                                        ))}
                                    </ul>
                                </>
                            )}
                        </div>
                    )}
                </Dialog>
            </div>
        </div>
    );
};

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(Receitas, comparisonFn);
