import React, { useState, useEffect, useRef } from "react";
import classNames from "classnames";
import { Route, useLocation } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

import { AppTopbar } from "./AppTopbar";
import { AppFooter } from "./AppFooter";
import { AppMenu } from "./AppMenu";

import Dashboard from "./components/Dashboard";
import Estoque from "./pages/Estoque";
import Receitas from "./pages/Receitas";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import CadastrarUsuario from "./pages/CadastrarUsuario";
import NotFound from "./pages/NotFound";

import PrimeReact from "primereact/api";
import { Tooltip } from "primereact/tooltip";

import "primereact/resources/primereact.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "prismjs/themes/prism-coy.css";
import "./assets/demo/flags/flags.css";
import "./assets/demo/Demos.scss";
import "./assets/layout/layout.scss";
import { UserService } from "./service/UserService";

const App = () => {
    const [layoutMode, setLayoutMode] = useState("static");
    const [layoutColorMode, setLayoutColorMode] = useState("dark");
    const [inputStyle, setInputStyle] = useState("outlined");
    const [ripple, setRipple] = useState(true);
    const [staticMenuInactive, setStaticMenuInactive] = useState(false);
    const [overlayMenuActive, setOverlayMenuActive] = useState(false);
    const [mobileMenuActive, setMobileMenuActive] = useState(false);
    const [mobileTopbarMenuActive, setMobileTopbarMenuActive] = useState(false);
    const [users, setUsers] = useState([])
    const copyTooltipRef = useRef();
    const location = useLocation();
    const familyId = localStorage.getItem('familyId')
    const userId = localStorage.getItem('userId')

    PrimeReact.ripple = true;

    let menuClick = false;
    let mobileTopbarMenuClick = false;

    useEffect(() => {
        const userService = new UserService()
        userService.getFamilyId({familyId, userId}).then((data) => {
            setUsers(data)
        }
        )

        if (mobileMenuActive) {
            addClass(document.body, "body-overflow-hidden");
        } else {
            removeClass(document.body, "body-overflow-hidden");
        }
        // document.documentElement.style.fontSize = '14px'
    }, [familyId, mobileMenuActive]);

    useEffect(() => {
        copyTooltipRef && copyTooltipRef.current && copyTooltipRef.current.updateTargetEvents();
    }, [location]);

    const onInputStyleChange = (inputStyle) => {
        setInputStyle(inputStyle);
    };

    const onRipple = (e) => {
        PrimeReact.ripple = e.value;
        setRipple(e.value);
    };

    const onLayoutModeChange = (mode) => {
        setLayoutMode(mode);
    };

    const onColorModeChange = (mode) => {
        setLayoutColorMode(mode);
    };

    const onWrapperClick = (event) => {
        if (!menuClick) {
            setOverlayMenuActive(false);
            setMobileMenuActive(false);
        }

        if (!mobileTopbarMenuClick) {
            setMobileTopbarMenuActive(false);
        }

        mobileTopbarMenuClick = false;
        menuClick = false;
    };

    const onToggleMenuClick = (event) => {
        menuClick = true;

        if (isDesktop()) {
            if (layoutMode === "overlay") {
                if (mobileMenuActive === true) {
                    setOverlayMenuActive(true);
                }

                setOverlayMenuActive((prevState) => !prevState);
                setMobileMenuActive(false);
            } else if (layoutMode === "static") {
                setStaticMenuInactive((prevState) => !prevState);
            }
        } else {
            setMobileMenuActive((prevState) => !prevState);
        }

        event.preventDefault();
    };

    const onSidebarClick = () => {
        menuClick = true;
    };

    const onMobileTopbarMenuClick = (event) => {
        mobileTopbarMenuClick = true;

        setMobileTopbarMenuActive((prevState) => !prevState);
        event.preventDefault();
    };

    const onMobileSubTopbarMenuClick = (event) => {
        mobileTopbarMenuClick = true;

        event.preventDefault();
    };

    const onMenuItemClick = (event) => {
        if (!event.item.items) {
            setOverlayMenuActive(false);
            setMobileMenuActive(false);
        }
    };
    const isDesktop = () => {
        return window.innerWidth >= 992;
    };

    const menu = [
        {
            label: "Home",
            items: [
                {
                    label: "Dashboard",
                    icon: "pi pi-fw pi-home",
                    to: "/dashboard",
                },
            ],
        },
        {
            label: "Pages",
            icon: "pi pi-fw pi-clone",
            items: [
                {
                    label: "Controle de Estoque",
                    icon: "pi pi-fw pi-shopping-cart",
                    to: "/dashboard/estoque",
                },
                {
                    label: "Receita Gourmet",
                    icon: "pi pi-fw pi-star",
                    to: "/dashboard/receitas",
                },
            ],
        },
    ];
    const addClass = (element, className) => {
        if (element.classList) element.classList.add(className);
        else element.className += " " + className;
    };

    const removeClass = (element, className) => {
        if (element.classList) element.classList.remove(className);
        else element.className = element.className.replace(new RegExp("(^|\\b)" + className.split(" ").join("|") + "(\\b|$)", "gi"), " ");
    };

    const wrapperClass = classNames("layout-wrapper", {
        "layout-overlay": layoutMode === "overlay",
        "layout-static": layoutMode === "static",
        "layout-static-sidebar-inactive": staticMenuInactive && layoutMode === "static",
        "layout-overlay-sidebar-active": overlayMenuActive && layoutMode === "overlay",
        "layout-mobile-sidebar-active": mobileMenuActive,
        "p-input-filled": inputStyle === "filled",
        "p-ripple-disabled": ripple === false,
    });

    // This Function do all checks according with configuration page and returns elements
    function checkPageLogCad() {
        var url = window.location.href.split("/");
        var page = url[url.length - 1];
        var subPage = url[url.length - 2];
        var pages = ["login", "cadastro", "cadastrar-usuario", "empty", "estoque", "receitas", "dashboard", "", "#", toString(url[0])];
        if (page === "login" || page === "cadastro" || page === "cadastrar-usuario" || page === "") {
            if (page === "login" || (page === "" && pages.includes(subPage))) {
                return <Route path={["/login", "/"]} component={Login}/>;
            } else if (page === "cadastro") {
                return <Route path="/cadastro" component={Cadastro} />;

            } else if (page === "cadastrar-usuario" && localStorage.getItem("familyId")) {
                return <Route path="/cadastrar-usuario" component={CadastrarUsuario} />;
            }
             else {
                return (
                    <div className="layout-main-container">
                        <div className="layout-main">
                            <Route path="*" component={NotFound} />
                        </div>
                    </div>
                );
            }
        } else {
            if (pages.includes(page) && localStorage.getItem("familyId")) {
                return (
                    <div className={wrapperClass} onClick={onWrapperClick}>
                        <Tooltip ref={copyTooltipRef} target=".block-action-copy" position="bottom" content="Copied to clipboard" event="focus" />

                        <AppTopbar onToggleMenuClick={onToggleMenuClick} users={users} layoutColorMode={layoutColorMode} mobileTopbarMenuActive={mobileTopbarMenuActive} onMobileTopbarMenuClick={onMobileTopbarMenuClick} onMobileSubTopbarMenuClick={onMobileSubTopbarMenuClick} />

                        <div className="layout-sidebar" onClick={onSidebarClick}>
                            <AppMenu model={menu} onMenuItemClick={onMenuItemClick} layoutColorMode={layoutColorMode} />
                        </div>

                        <div className="layout-main-container">
                            <div className="layout-main">
                                <Route path="/dashboard" exact component={Dashboard} />
                                <Route path="/dashboard/estoque" component={Estoque} />
                                <Route path="/dashboard/receitas" component={Receitas} />
                            </div>

                            <AppFooter layoutColorMode={layoutColorMode} />
                        </div>

                        <CSSTransition classNames="layout-mask" timeout={{ enter: 200, exit: 200 }} in={mobileMenuActive} unmountOnExit>
                            <div className="layout-mask p-component-overlay"></div>
                        </CSSTransition>
                    </div>
                );
            } else {
                return (
                    <div className="layout-main-container">
                        <div className="layout-main">
                            <Route path="*" component={NotFound} />
                        </div>
                    </div>
                );
            }
        }
    }
    return (
        // This method do all checks of current page and return the code according with page configuration
        checkPageLogCad()
    );
};

export default App;
