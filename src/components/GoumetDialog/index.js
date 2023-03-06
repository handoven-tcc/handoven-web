import React, { useState, useRef } from "react";
import { Dialog } from "primereact/dialog";
import { Steps } from "primereact/steps";
import { Button } from "primereact/button";

export const GoumetDialog = (props) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const plates = props.plates;
    if (plates) {
        var nome = plates.map((o) => o.nome);
        var secao = plates.map((o) => o.secao);
        var titleIngredient = secao.map((o) => o[0][0].nome);
        var ingredients = secao.map((o) => o[0][0].conteudo);
        var titleModoDePreparo = secao.map(o => o[0][1].nome);
        var preparo = secao.map(o => o[0][1].conteudo);
    }

    const wizardItems = [
        { label: "Detalhes" },
        { label: "Preparo" },
    ];

    const productDialogFooter = () => {
        return <Button label="OK" icon="pi pi-check" className="p-button-text" onClick={props.hideDialog} />;
    };

    return (
        <div className="grid list-demo">
            <Dialog visible={props.gourmetDialog} onHide={() => props.hideDialog()} style={{ width: "1080px" }} header="Detalhes da Receita" modal className="p-fluid" footer={productDialogFooter}>
                <div className="col-12 md:col-6">
                    <div className="pt-10">
                        <Steps style={{ width: "1000px" }} model={wizardItems} activeIndex={activeIndex} onSelect={(e) => setActiveIndex(e.index)} readOnly={false} />
                    </div>
                </div>
                {activeIndex === 0
                    ?
                    (<div>
                        {plates && (
                            <>
                                <h3>{nome[props.index]}</h3>
                                <h5>{titleIngredient[props.index]}</h5>
                                <ul>
                                    {ingredients[props.index].map((ingredient) => (
                                        <li>{ingredient}</li>
                                    ))}
                                </ul>
                            </>
                        )}
                    </div>)
                    :
                    (<div>
                        {plates && (
                            <>
                                <h3>{nome[props.index]}</h3>
                                <h5>{titleModoDePreparo[props.index]}</h5>
                                <ul>
                                    {preparo[props.index].map((preparo) => (
                                        <li>{preparo}</li>

                                    ))}
                                </ul>
                            </>
                        )}
                    </div>)
                }
            </Dialog>
        </div>
    );
};
