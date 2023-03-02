import React,{useEffect} from "react";
import { useState, useRef } from "react";
import { NavLink, useHistory } from "react-router-dom";
import Img from "../assets/publicity_register.svg";
import Logo from "../assets/logo-handoven.png";
import { Image } from "primereact/image";
import { Checkbox } from 'primereact/checkbox';
import { InputText } from "primereact/inputtext";
import { InputMask } from "primereact/inputmask";
import { Calendar } from "primereact/calendar";
import { Password } from "primereact/password";
import { Divider } from "primereact/divider";
import { Button } from "primereact/button";
import { UserService } from "../service/UserService";
import { FamilyService } from "../service/FamilyService";
import { Toast } from "primereact/toast";


const Cadastro = () => {
    const userService = new UserService();
    const familyService = new FamilyService();
    const [familyName, setFamilyName] = useState("");
    const [userName, setUserName] = useState("");
    const [birthDate, setBirthDate] = useState(null);
    const [celphone, setCelphone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setpasswordConfirm] = useState("");
    const [agreeWithTerms, setAgreeWithTerms] = useState(false);
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const toast = useRef(null);
    
    useEffect(()=>{
        document.documentElement.style.fontSize = '10px'
    },[])

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

    const handleCadastro = async () => {
        setLoading(true);

        if (!email && !password && !userName && !familyName && !celphone && !birthDate && !passwordConfirm) {
            setLoading(false);
            return toast.current.show({ severity: "error", summary: "Mensagem de Erro", detail: "Preencha todas as informações!", life: 3000 });
        }

        if (password !== passwordConfirm) {
            setLoading(false);
            return toast.current.show({ severity: "error", summary: "Mensagem de Erro", detail: "Senha diferente da Confirmação de Senha", life: 3000 });
        }
        const requestBodyFamilyName = { name: familyName };
        let responseFamily = await familyService.postFamily(requestBodyFamilyName);
        const requestBodyUser = {
            name: userName,
            birthDate: birthDate,
            cell: celphone,
            email: email,
            password: password,
            familyId: responseFamily.id,
        };

        let responseUser = await userService.postUser(requestBodyUser);

        // TODO: Aparecer uma mensagem "usuário não existe"
        if (!responseUser) {
            setLoading(false);
            return toast.current.show({ severity: "error", summary: "Mensagem de Erro", detail: "Erro ao Criar usuário, favor contate o administrador do sistema.", life: 3000 });
        }

        toast.current.show({ severity: "success", summary: "Mensagem de Sucesso!", detail: "Usuário Cadastrado com sucesso!", life: 3000 });

        localStorage.setItem("userId", responseUser.id);
        localStorage.setItem("userName", responseUser.name);
        localStorage.setItem("birthDate", responseUser.birthDate);
        localStorage.setItem("cell", responseUser.cell);
        localStorage.setItem("email", responseUser.email);
        localStorage.setItem("familyId", responseFamily.id);
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
            <div className="flex flex-1 flex-column justify-content-center mb-8 px-8 py-12 lg:flex-none lg:px-20">
                <div className="mx-auto w-full max-w-24rem lg:w-96">
                    <div className="align-items-center justify-content-center text-center flex-column px-4">
                        <Image imageClassName="h-20 w-4 lg:w-4" src={Logo} alt="Logo Handoven" />
                        <h2 className="mt-6 mb-2 text-6xl font-semibold appearance-none">Cadastro</h2>
                        <div className="flex justify-content-center align-items-center text-center text-2xl text-gray-600">
                            <p className="m-0 flex align-items-center items-center justify-content-center">Já possui sua conta?</p> 
                            <NavLink to={"/login"}>
                                <Button label="Entrar" className="p-button-link text-2xl text-center" />
                            </NavLink>
                        </div>
                    </div>
                    <div className="grid mt-5">
                        <form className="col-12">
                            <div className="field flex" style={{gap: '1rem'}}>
                                <span className="text-2xl p-float-label">
                                    <InputText id="userName" 
                                            type="text" 
                                            value={userName} 
                                            onChange={(event) => setUserName(event.target.value)} 
                                            className="text-3xl w-full py-2 px-3" 
                                            required 
                                    />
                                    <label htmlFor="userName">Nome Completo</label>
                                </span>
                                <span className="text-2xl p-float-label">
                                    <InputText id="familyName"
                                            type="text"
                                            value={familyName}
                                            onChange={(event) => setFamilyName(event.target.value)}
                                            className="text-3xl w-full py-2 px-3"
                                            required
                                    />
                                    <label htmlFor="familyName">Nome da Familia</label>
                                </span>                            
                            </div>

                            <div className="field flex" style={{gap: '1rem'}}>
                                <span className="mt-3 text-2xl p-float-label">
                                    <InputText id="email" 
                                               type="text" 
                                               value={email} onChange={(event) => setEmail(event.target.value)} 
                                               className="text-3xl w-full py-2 px-3" 
                                               required 
                                    />
                                    <label htmlFor="email">Email</label>
                                </span>                                

                                <span className="mt-3 text-2xl p-float-label">
                                    <InputMask id="celphone"
                                               type="text"
                                               mask="(99)99999-9999"
                                               value={celphone}
                                               onChange={(event) => setCelphone(event.target.value)}
                                               className="text-3xl w-full py-2 px-3" 
                                               required
                                               />
                                    <label htmlFor="celphone">Telefone</label>
                                </span>                                    
                            </div>
                            <div className="field">
                                <Calendar id="birthDate" 
                                        value={birthDate} 
                                        style={{ width: "100%", height: "4rem", marginTop: '1rem' }} 
                                        onChange={(event) => setBirthDate(event.value)} 
                                        inputClassName={'text-2xl w-full py-3'}
                                        placeholder="Data de nascimento"
                                        required 
                                        />
                            </div>
                            <div className="field flex" style={{gap: '1rem'}}>
                                <span className="mt-3 text-2xl p-float-label">
                                    <Password id="password" 
                                            value={password} 
                                            onChange={(event) => setPassword(event.target.value)} 
                                            header={header} 
                                            footer={footer} 
                                            inputClassName="text-3xl w-full py-2 px-3" 
                                            required 
                                            />
                                    <label htmlFor="password">Senha</label>
                                </span>                                    

                                <span className="mt-3 text-2xl p-float-label">
                                    <Password id="passwordConfirm" 
                                            value={passwordConfirm} 
                                            onChange={(e) => setpasswordConfirm(e.target.value)} 
                                            feedback={false} 
                                            inputClassName="text-3xl w-full py-2 px-3" 
                                            required
                                            />
                                    <label htmlFor="passwordConfirm">Confirmar Senha</label>
                                </span>
                            </div>

                            <div className="mb-2 flex items-start mt-4">
                                <p className="field-checkbox mb-2">
                                    <Checkbox inputId="agreeWithTerms" onChange={e => setAgreeWithTerms(e.checked)} checked={agreeWithTerms} required ></Checkbox>
                                    <label for="agreeWithTerms" className="text-2xl text-gray-600">
                                        Concordo com os Termos e Condições<strong className="text-1xl">*</strong>
                                    </label>
                                </p>
                            </div>

                            <div className="mb-4">
                                <Button className="text-3xl block w-full py-3" label="Cadastrar" onClick={handleCadastro} loading={loading} />
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

export default React.memo(Cadastro, comparisonFn);
