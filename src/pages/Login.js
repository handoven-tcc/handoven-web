import React, { useEffect,useState,useRef } from "react";
import { NavLink, useHistory } from "react-router-dom";

import { UserService } from "../service/UserService";
import { Image } from 'primereact/image';
import { Password } from 'primereact/password';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import Logo from "../assets/logo-handoven.png";
import Img from "../assets/publicity_six.svg";
import "../styles/global.css";
import { Toast } from "primereact/toast";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const userService = new UserService();
    const history = useHistory();
    const [loading, setLoading] = useState(false)
    const toast = useRef(null);

    useEffect(()=>{
        document.documentElement.style.fontSize = '10px'
    },[])
    
    const handleLogin = async () => {
        setLoading(true)

        if(!email && !password) {
            setLoading(false)
            return toast.current.show({ severity: "error", summary: "Mensagem de Erro", detail: "Email ou senha inválidos", life: 3000 });
        }

        const body = {email: email, password: password}

        let response = await userService.postLoginUser(body);
        if(!response){
            setLoading(false)
            return toast.current.show({ severity: "error", summary: "Mensagem de Erro", detail: "Usuário não existe.", life: 3000 });
        }

        toast.current.show({ severity: "success", summary: "Mensagem de Sucesso!", detail: "Usuário Logado com sucesso!", life: 3000 });

        localStorage.setItem('userId', response.id)
        localStorage.setItem('userName', response.name)
        localStorage.setItem('cell', response.cell)
        localStorage.setItem('birthDate', response.birthDate)
        localStorage.setItem('email', response.email)
        localStorage.setItem('familyId', response.familyId)
        setLoading(false)
        history.push("/dashboard");
    }

    return (
        <div className="flex min-h-screen bg-blue-600">
            <Toast ref={toast} />
            <div className="hidden lg:block relative w-0 flex-1 bg-blue-700">
                <div className="flex h-full justify-content-center align-items-center text-center">
                    <Image src={Img} alt="Publicity Image" imageClassName={"sm:w-5 md: w-full lg:w-10 lg: w-full"} />
                </div>
            </div>
            <div className="flex flex-1 flex-column justify-content-center mb-8 px-8 py-12 lg:flex-none lg:px-20 "> 
                <div className="mx-auto w-full max-w-24rem lg:w-96">
                    <div className="align-items-center justify-content-center text-center flex-column px-4">
                        <Image imageClassName="h-20 w-4 lg:w-8" src={Logo} alt="Logo Handoven" />
                        <h2 className="mt-6 mb-2 text-6xl font-semibold appearance-none">Entrar</h2>
                        <div className="flex justify-content-center align-items-center text-center text-2xl text-gray-600">
                            <p className="m-0 flex align-items-center items-center justify-content-center">Novo por aqui?</p> 
                            <NavLink to={"/cadastro"}>
                                <Button label="Criar minha conta?" className="p-button-link text-2xl text-center"/>
                            </NavLink>
                        </div>
                    </div>
                    <div className="mt-5">
                        <form action="">
                            <div className="field">
                            <span className="text-3xl p-float-label">
                                <InputText inputId="email" className="text-3xl block w-full px-3" autoFocus value={email} onChange={(event) => setEmail(event.target.value)}/>
                                    <label htmlFor="email">Email</label>
                                </span>
                            </div>
                            <div className="field">
                                <span className="text-3xl p-float-label">
                                    <Password inputId="senha" className="block mt-5" inputClassName="text-3xl w-full px-3" value={password} onChange={(e) => setPassword(e.target.value)} feedback={false}/>
                                    <label htmlFor="senha">Senha</label>
                                </span>
                            </div>
                            <div className="field">
                                <Button className="mt-5 text-3xl block w-full " label="Entrar" onClick={handleLogin} loading={loading}/>
                            </div>
                            <div className="mb-4">
                                <NavLink to={"/"}>
                                    <Button label="Esqueceu sua senha?" className="p-button-link text-lg w-full text-center" />
                                </NavLink>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

const comparisonFn = function (prevProps, nextProps) {
    // return prevProps.location.pathname === nextProps.location.pathname;
    return prevProps.location.pathname === nextProps.location.pathname && prevProps.colorMode === nextProps.colorMode;
};

export default React.memo(Login, comparisonFn);
