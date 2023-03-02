import React, { useEffect,useRef } from "react";
import { useState } from "react";
import Img from "../assets/publicity_register.svg";
import Logo from "../assets/logo-handoven.png";
import { Image } from "primereact/image";
import { NavLink, useHistory } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { InputMask } from "primereact/inputmask";
import { Calendar } from "primereact/calendar";
import { Password } from "primereact/password";
import { Divider } from "primereact/divider";
import { Button } from "primereact/button";
import { UserService } from "../service/UserService";
import { FamilyService } from "../service/FamilyService";
import { Toast } from "primereact/toast";

const CadastrarUsuario = () => {
    const userService = new UserService();
    const familyService = new FamilyService();
    const [familyName, setFamilyName] = useState("");
    const [userName, setUserName] = useState("");
    const [birthDate, setBirthDate] = useState(null);
    const [celphone, setCelphone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setpasswordConfirm] = useState("");
    const [loading, setLoading] = useState(false);
    const familyId = localStorage.getItem("familyId");
    const history = useHistory();
    const toast = useRef(null);

    useEffect(() => {
        familyService.getFamilyId(familyId).then((data) => setFamilyName(data.name));
        document.documentElement.style.fontSize = '10px'
    }, []);

    const header = <h6>escolha uma senha</h6>;
    const footer = (
        <React.Fragment>
            <Divider />
            <p className="mt-2">Sugestão</p>
            <ul className="pl-2 ml-2 mt-0" style={{ lineHeight: "1.5" }}>
                <li>Uma letra maiuscula</li>
                <li>Uma letra minuscula</li>
                <li>Um numero</li>
                <li>Minimo 8 caracteres</li>
            </ul>
        </React.Fragment>
    );

    const handleCadastrarUsuario = async () => {
        setLoading(true);

        if (!email && !password && !userName && !familyName && !celphone && !birthDate && !passwordConfirm) {
            setLoading(false);
            return toast.current.show({ severity: "error", summary: "Mensagem de Erro", detail: "Preencha todas as informações!", life: 3000 });
        }
        if (password !== passwordConfirm) {
            setLoading(false);
            return toast.current.show({ severity: "error", summary: "Mensagem de Erro", detail: "Senha diferente da Confirmação de Senha", life: 3000 });
            
        }
        const requestBodyUser = {
            name: userName,
            birthDate: birthDate,
            cell: celphone,
            email: email,
            password: password,
            familyId: familyId,
        };

        let responseUser = await userService.postUser(requestBodyUser);

        if (!responseUser) {
            setLoading(false);
            return toast.current.show({ severity: "error", summary: "Mensagem de Erro", detail: "Erro ao Criar usuário, favor contate o administrador do sistema.", life: 3000 });
        }
        localStorage.setItem("userId", responseUser.id);
        localStorage.setItem("userName", responseUser.name);
        localStorage.setItem("birthDate", responseUser.birthDate);
        localStorage.setItem("cell", responseUser.cell);
        localStorage.setItem("email", responseUser.email);
        localStorage.setItem("familyId", familyId);
        setLoading(false);
        history.push("/dashboard");
    };

    return (
        <div className="flex min-h-screen bg-blue-600">
            <Toast ref={toast} />
            <div className="hidden lg:block relative w-0 flex-1 bg-blue-700">
                <div className="flex h-full justify-content-center align-items-center text-center">
                    <Image src={Img} alt="Publicity Image" imageClassName={"sm:w-5 md:w-full lg:w-10 lg: w-full"} />
                </div>
            </div>
            <div className="flex flex-1 flex-column justify-content-center mb-8 px-4 py-12 lg:flex-none lg:px-20 ">
                <div className="mx-auto w-full max-w-24rem lg:w-96">
                    <div className="align-items-center justify-content-center text-center flex-column px-4">
                        <Image className="h-6 w-1 lg:w-3" src={Logo} alt="Logo Handoven" />
                        <h2 className="mt-2 text-6xl font-semibold appearance-none">Familia {familyName}</h2>
                    </div>
                    <div className="grid mt-5">
                        <form className="col-12">
                            <div className="field">
                                <span className="text-3xl p-float-label">
                                    <InputText id="userName" 
                                               type="text" 
                                               value={userName} 
                                               onChange={(event) => setUserName(event.target.value)} 
                                               className=" text-2xl w-full py-3 " 
                                               required 
                                    />
                                    <label for="userName" className="text-xl">Nome Completo</label>
                                </span>
                            </div>
                            <div className="flex field" style={{gap: '1rem'}}>
                                <span className="mt-3 p-float-label">
                                    <InputText id="email" 
                                               type="text" 
                                               value={email} 
                                               onChange={(event) => setEmail(event.target.value)} 
                                               className="text-3xl w-full py-2 px-3" 
                                               required 
                                    />
                                    <label for="email" className="text-xl">
                                        Email
                                    </label>
                                </span>
                                <span className="mt-3 p-float-label">
                                    <InputMask
                                        id="celphone"
                                        type="text"
                                        mask="(99) 99999-9999"
                                        value={celphone}
                                        onChange={(event) => setCelphone(event.target.value)}
                                        className="text-3xl w-full py-2 px-3" 
                                        required
                                    />
                                    <label for="celphone" className="text-xl">
                                        Telefone
                                    </label>
                                </span>
                            </div>
                            <div className="field">
                                <Calendar id="birthDate" 
                                            value={birthDate} 
                                            style={{ width: "100%", height: "4rem", marginTop: '1rem' }}
                                            onChange={(event) => setBirthDate(event.value)} 
                                            inputClassName={'text-xl w-full py-3'}
                                            placeholder="Data de nascimento"
                                            required 
                                />
                            </div>
                            <div className="field flex" style={{gap: '1rem'}}>
                                <span className="mt-3 text-3xl p-float-label">
                                    <Password id="password" 
                                              value={password} 
                                              onChange={(event) => setPassword(event.target.value)} 
                                              inputClassName="text-3xl w-full py-2 px-3" 
                                              feedback={false} 
                                              required 
                                    />
                                    <label for="password" className="text-xl">Senha</label>
                                </span>
                                <span className="mt-3 text-3xl p-float-label">
                                    <Password id="passwordConfirm" 
                                              value={passwordConfirm}
                                              onChange={(e) => setpasswordConfirm(e.target.value)} 
                                              inputClassName="text-3xl w-full py-2 px-3" 
                                              feedback={false} 
                                              required 
                                    />
                                    <label for="passwordConfirm" className="text-xl">Confirmação de Senha</label>
                                </span>
                            </div>
                            <div className="mt-5 mb-4">
                                <Button className="text-3xl block w-full py-3" label="Cadastrar Usuário" onClick={handleCadastrarUsuario} loading={loading} />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname && prevProps.colorMode === nextProps.colorMode;

};
export default React.memo(CadastrarUsuario, comparisonFn);
