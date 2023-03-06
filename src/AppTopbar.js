import React, { useState, useRef } from "react";
import classNames from "classnames";
import UserAvatar from "./assets/user-profile-icon.jpg";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Image } from "primereact/image";
import { NavLink, useHistory } from "react-router-dom";
import { Toast } from "primereact/toast";
import { UserService } from "./service/UserService";
import { InputText } from "primereact/inputtext";
import { InputMask } from "primereact/inputmask";
import { Password } from "primereact/password";
import { Calendar } from "primereact/calendar";

export const AppTopbar = (props) => {
    const [userModal, setUserModal] = useState(false);
    const [changeUserModal, setChangeUserModal] = useState(false);
    const [userSelected, setUserSelected] = useState({});
    const [changeInformationUserModal, setChangeInformationUserModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [userName, setUserName] = useState("");
    const [birthDate, setBirthDate] = useState(null);
    const [celphone, setCelphone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [userId, setUserId] = useState("");
    const [familyId, setFamilyId] = useState("");
    const toast = useRef(null);
    const history = useHistory();
    const userService = new UserService();

    const userNow = () => {
        const usersFamily = props.users;
        const userNow = localStorage.getItem("userName");
        usersFamily.map((user) => {
            if (user.name === userNow) {
                setUserName(user.name);
                setEmail(user.email);
                setBirthDate(user.birthDate);
                setCelphone(user.cell);
                setPassword(user.password);
                setPasswordConfirm(user.password);
                setUserId(localStorage.getItem("userId"));
                setFamilyId(localStorage.getItem("familyId"));
            }
        });
    };

    const cadastrarUsuario = () => {
        history.push("/cadastrar-usuario");
    };

    const logout = () => {
        localStorage.clear();
        history.push("/login");
    };

    const handleEditUser = async () => {
        setLoading(true);

        const requestBodyUser = {
            name: userName,
            birthDate: birthDate,
            cell: celphone,
            email: email,
            password: password,
            familyId: familyId,
            userId: userId
        };

        let responseUser = await userService.putUser(requestBodyUser);

        // TODO: Aparecer uma mensagem "usuário não existe"
        if (!responseUser) {
            setLoading(false);
            return toast.current.show({ severity: "error", summary: "Mensagem de Erro", detail: "Dados inválidos", life: 3000 });
        }
        if (password !== passwordConfirm) {
            setLoading(false);
            return toast.current.show({ severity: "error", summary: "Mensagem de Erro", detail: "senha diferente da confirmação", life: 3000 });
        }

        toast.current.show({ severity: "success", summary: "Mensagem de Sucesso!", detail: "Troca de Informação com sucesso!", life: 3000 });

        localStorage.setItem("userName", responseUser.name);
        localStorage.setItem("birthDate", responseUser.birthDate);
        localStorage.setItem("cell", responseUser.cell);
        localStorage.setItem("email", responseUser.email);
        setPassword(password);
        setPasswordConfirm(passwordConfirm);
        setLoading(false);
    };

    const changeUser = async (requestBodyUser) => {
        setLoading(true);

        if (!requestBodyUser.email && !requestBodyUser.password) {
            setLoading(false);
            return toast.current.show({ severity: "error", summary: "Mensagem de Erro", detail: "Email ou senha inválidos", life: 3000 });
        }

        const body = { email: requestBodyUser.email, password: requestBodyUser.password };
        let response = await userService.postLoginUser(body);
        if (!response) {
            setLoading(false);
            return toast.current.show({ severity: "error", summary: "Mensagem de Erro", detail: "Usuário não existe.", life: 3000 });
        }

        toast.current.show({ severity: "success", summary: "Mensagem de Sucesso!", detail: "Usuário Logado com sucesso!", life: 3000 });

        localStorage.setItem("userId", response.id);
        localStorage.setItem("userName", response.name);
        localStorage.setItem("cell", response.cell);
        localStorage.setItem("birthDate", response.birthDate);
        localStorage.setItem("email", response.email);
        localStorage.setItem("familyId", response.familyId);

        setLoading(false);
    };

    const userDialogFooter = (
        <>
            <Button
                label="Sair"
                icon="pi pi-sign-out"
                className="p-button-text"
                onClick={() => {
                    logout();
                }}
            />
            <Button
                label="Trocar de Usuário"
                icon="pi pi-users"
                className="p-button-text"
                onClick={() => {
                    setChangeUserModal(true);
                    setUserModal(false);
                }}
            />
            <Button label="Adicionar Usuário" icon="pi pi-user-plus" className="p-button-text" onClick={() => cadastrarUsuario()} />
            <Button
                label="OK"
                icon="pi pi-check"
                className="p-button-text"
                onClick={() => {
                    setUserModal(false);
                }}
            />
        </>
    );

    const changeUserDialogFooter = (
        <>
            <Button
                label="Cancelar"
                icon="pi pi-times"
                loading={loading}
                className="p-button-text"
                onClick={() => {
                    setChangeUserModal(false);
                    setUserModal(true);
                }}
            />
            <Button
                label="OK"
                icon="pi pi-check"
                loading={loading}
                className="p-button-text"
                onClick={() => {
                    changeUser(userSelected);
                    setChangeUserModal(false);
                    setUserModal(true);
                }}
            />
        </>
    );
    const changeEditUserDialogFooter = (
        <>
            <Button
                label="Cancelar"
                icon="pi pi-times"
                loading={loading}
                className="p-button-text"
                onClick={() => {
                    setChangeInformationUserModal(false);
                    setUserModal(true);
                }}
            />
            <Button
                label="OK"
                icon="pi pi-check"
                loading={loading}
                className="p-button-text"
                onClick={() => {
                    handleEditUser();
                    setChangeInformationUserModal(false);
                    setUserModal(true);
                }}
            />
        </>
    );
    return (
        <div className="layout-topbar">
            <NavLink to="/dashboard">
                <div className="flex justify-content-center align-items-center">
                    <img src="assets/layout/images/logo-handoven.png" alt="Logo" height="50" className="mr-2" />
                    <p className="text-xl ">
                        <strong>Handoven</strong>
                    </p>
                </div>
            </NavLink>

            <Toast ref={toast} />
            <button type="button" className="p-link layout-topbar-menu-button layout-topbar-button" onClick={props.onMobileTopbarMenuClick}>
                <i className="pi pi-ellipsis-v" />
            </button>

            <ul className={classNames("layout-topbar-menu lg:flex origin-top", { "layout-topbar-menu-mobile-active": props.mobileTopbarMenuActive })}>
                <li>
                    <button type="button" className="p-link  layout-menu-button layout-topbar-button" onClick={props.onToggleMenuClick}>
                        <i className="pi pi-bars" />
                    </button>
                </li>

                <li>
                    <button className="p-link layout-topbar-button" onClick={() => setUserModal(true)}>
                        <i className="pi pi-user" />
                        <span>Profile</span>
                    </button>
                </li>
            </ul>
            <Dialog visible={userModal} modal style={{ width: "720px" }} header="Perfil do Usuário" className="p-fluid" footer={userDialogFooter} onHide={() => setUserModal(false)}>
                <div className="text-center">
                    <Image src={UserAvatar} imageClassName={"w-2 border-circle"} />
                    <h1>{localStorage.getItem("userName")}</h1>
                    <div className="mt-5 w-8 " style={{ margin: "0 auto" }}>
                        <p>{localStorage.getItem("email")}</p>
                        <p>{localStorage.getItem("cell")}</p>
                        <p>{localStorage.getItem("birthDate")}</p>
                        <div className="mt-3 flex justify-content-start align-items-right border-yellow-300">
                            <Button
                                label="Alterar Informações do Usuário"
                                icon="pi pi-pencil"
                                className="p-button-warning"
                                onClick={() => {
                                    setChangeInformationUserModal(true);
                                    userNow();
                                }}
                            />
                        </div>
                    </div>
                </div>
            </Dialog>
            <Dialog visible={changeInformationUserModal} modal style={{ width: "600px" }} header="Editar Usuário" className="p-fluid" footer={changeEditUserDialogFooter} onHide={() => setChangeInformationUserModal(false)}>
                <div className="flex items-center justify-center mt-2">
                    <div className="mt-4">
                        <div className="flex items-center justify-center">
                            <div className="w-full pr-2">
                                <span className="p-float-label">
                                    <InputText id="userName" type="text" value={userName} onChange={(event) => setUserName(event.target.value)} className=" text-2xl w-full py-3 leading-tight border border-solid border-1 rounded-lg focus:bg-white focus:outline-none" required />
                                    <label for="userName" className="text-xl">
                                        Nome Completo
                                    </label>
                                </span>
                            </div>
                        </div>
                        <div className="">
                            <div className="flex items-center justify-center pt-5">
                                <div className="pr-2">
                                    <span className="p-float-label">
                                        <InputText id="email"
                                                   type="text"
                                                   value={email}
                                                   onChange={(event) => setEmail(event.target.value)}
                                                   className=" text-2xl w-full py-3  leading-tight border border-solid border-1  rounded-lg focus:bg-white focus:outline-none"
                                                   required />
                                        <label for="email" className="text-xl">
                                            Email
                                        </label>
                                    </span>
                                </div>
                                <div className="">
                                    <span className="p-float-label">
                                        <InputMask id="celphone"
                                                   type="text"
                                                   mask="(99) 99999-9999"
                                                   value={celphone}
                                                   onChange={(event) => setCelphone(event.target.value)}
                                                   className=" text-2xl w-full py-3  leading-tight  border border-solid border-1  rounded-lg focus:bg-white focus:outline-none"
                                                   required
                                        />
                                        <label for="celphone" className="text-xl">
                                            Telefone
                                        </label>
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="flex pt-5">
                            <span className="p-float-label w-full">
                                <Calendar id="birthDate"
                                          value={birthDate}
                                          style={{ width: "100%", height: "56px" }}
                                          onChange={(event) => setBirthDate(event.value)}
                                          placeholder={birthDate}
                                          required
                                />
                                <label for="birthDate" className="text-xl ">
                                    Data de Nascimento
                                </label>
                            </span>
                        </div>

                        <div className="flex items-center justify-content-center pt-5">
                            <div className="flex pr-2 w-full">
                                <span className="p-float-label w-full">
                                    <Password id="password"
                                              inputClassName="w-full h-4rem"
                                              className="w-full h-4rem"
                                              value={password}
                                              onChange={(event) => setPassword(event.target.value)}
                                              required
                                    />
                                    <label for="password" className="text-xl">
                                        Senha
                                    </label>
                                </span>
                            </div>
                            <div className="flex w-full">
                                <span className="p-float-label w-full">
                                    <Password id="passwordConfirm"
                                              inputClassName="w-full h-4rem"
                                              className="w-full h-4rem"
                                              value={passwordConfirm}
                                              onChange={(e) => setPasswordConfirm(e.target.value)}
                                              feedback={false}
                                              required
                                    />
                                    <label for="passwordConfirm" className="text-xl">
                                        Confirmação de Senha
                                    </label>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </Dialog>
            <Dialog visible={changeUserModal} modal style={{ width: "720px" }} header="Mudar de Usuário" className="p-fluid" footer={changeUserDialogFooter} onHide={() => {setChangeUserModal(false);setUserModal(true);}}>
                {props.users &&
                    props.users.map((o) => (
                        <div className="mt-3 text-center">
                            <Button label={o.name} onClick={() => setUserSelected(o)} className="w-5 p-button-raised p-button-secondary" />
                        </div>
                    ))}
                {userSelected && (
                    <p className="mt-3 text-center">
                        Usuario selecionado <strong>{userSelected.name}</strong>
                    </p>
                )}
            </Dialog>
        </div>
    );
};
