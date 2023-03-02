/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react';
import NotFoundComponent from '../assets/notFoundComponent.png'
import { NavLink, useHistory } from "react-router-dom";
import { Button } from "primereact/button";

const NotFound = () => {
    let userIdLocal = localStorage.getItem('userId')
    const history = useHistory();
    const verifyUser = () => {
        if(!userIdLocal){
            history.push("/login");
        }
        else{
            history.push("/dashboard");
        }
    }

    return (
        <div>
            <div className="align-items-center text-center">
                <img src={NotFoundComponent} className="" alt='Not Found Image' width={400} height={400} />
                <p
                    className="text-center"
                >
                    <strong className="mt-[-9rem] text-4xl text-green-400 text-center">
                        Página não encontrada!
                    </strong><br></br>
                    <p className='text-2xl'>
                        A pagina que você está tentando acessar não existe,
                        <br />
                        Por favor, cheque o link ou contate o administrador.
                    </p>
                </p>
            </div>
            <div className="align-items-center text-center">
                <Button icon="pi pi-chevron-left" className="mt-5 w-8rem p-button text-4xl" onClick={() => verifyUser()}/>
            </div>
        </div>
    );
}

const comparisonFn = function (prevProps, nextProps) {
    // return prevProps.location.pathname === nextProps.location.pathname;
    return prevProps.location.pathname === nextProps.location.pathname && prevProps.colorMode === nextProps.colorMode;
    
};

export default React.memo(NotFound, comparisonFn);
