import logo from "../../assets/logo.svg";
import cozinhando from "../../assets/cozinhando.svg";
import wave from "../../assets/wave.png";
import {
  User,
  LockKey,
  Calendar,
  DeviceMobile,
  UsersThree,
  EnvelopeSimple,
  X,
} from "phosphor-react";
import { Input, Checkbox, Typography, Alert } from "@material-tailwind/react";
import React, { useRef, useState } from "react";
import * as Toast from "@radix-ui/react-toast";
import { useAuth } from "../../providers/Auth";
import { UserRequest } from "../../models";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { createUser } = useAuth();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [_, setConfirmPassword] = useState("");
  const [familyName, setFamilyName] = useState("");
  const [cell, setCell] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const timerRef = useRef(0);
  const [message, setMessage] = useState("");

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();

    try {
      const [day, month, year] = birthDate.split("/");
      const date = new Date(+year, +month - 1, +day).toISOString();
      let completeName = name + " " + surname;
      setMessage("Erro ao criar familia");

      const request = new UserRequest(
        completeName,
        date,
        email,
        familyName,
        cell,
        password
      );

      await createUser(request);
      setMessage("Concluido!");
    } catch (error) {
      setMessage("Email já em uso!");
      console.log("[REGISTER_ERROR]: ", error);
    }
  }
  React.useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);
  return (
    <div>
      <Toast.Provider swipeDirection="right">
        {message == "Email já em uso!" ? (
          <>
            <Toast.Root
              className="absolute right-0 top-0 border-none mt-3 mr-3 rounded-xl transition"
              open={open}
              onOpenChange={setOpen}
            >
              <div className="flex flex-col">
                <Alert className="bg-[#d40b03]/10 text-[#d40b03] border-l-4 border-[#d40b03] rounded-none font-medium mr-[-10px]">
                  <Typography className="font-medium text-sm flex">
                    {message}
                    <Toast.Action
                      className="pl-4"
                      asChild
                      altText="Goto schedule to undo"
                    >
                      <button className="mr-[-10px]">
                        <X />
                      </button>
                    </Toast.Action>
                  </Typography>
                </Alert>
              </div>
            </Toast.Root>
            <Toast.Viewport className="ToastViewport" />
          </>
        ) : null}
        {message == "Concluido!" ? (
          <>
            <Toast.Root
              className="absolute right-0 top-0 border-none mt-3 mr-3 rounded-xl transition"
              open={open}
              onOpenChange={setOpen}
            >
              <div className="flex flex-col">
                <Alert className="bg-[#33b864]/10 text-[#33b864] border-l-4 border-[#33b864] rounded-none font-medium mr-[-10px]">
                  <Typography className="font-medium text-sm flex">
                    {message}
                    <Toast.Action
                      className="pl-4"
                      asChild
                      altText="Goto schedule to undo"
                    >
                      <button className="mr-[-10px]">
                        <X />
                      </button>
                    </Toast.Action>
                  </Typography>
                </Alert>
              </div>
            </Toast.Root>
            <Toast.Viewport className="ToastViewport" />
          </>
        ) : null}
      </Toast.Provider>
      <img
        src={wave}
        alt="wave"
        width={650}
        height={20}
        className="fixed h-[100%] left-0 bottom-0 z-[-1] md:hidden"
      />
      <div className="w-[100wh] h-[100vh] grid grid-cols-2 gap-[7.75rem] pr-8  pl-20 md:gap-[5rem] md:grid-cols-1 md:pl-0 ">
        <div className="flex justify-end items-center ">
          <img
            src={cozinhando}
            alt=""
            width={500}
            height={20}
            className="md:hidden"
          />
        </div>
        <div className="flex justify-start items-center text-center md:mt-[-20rem] md:justify-center">
          <form
            action="index.html"
            className="flex items-center flex-col md:w-[290px]"
            onSubmit={handleRegister}
          >
            <img
              src={logo}
              alt="logo"
              width={100}
              height={100}
              className="md:w-[120px] "
            />
            <h2 className="text-6xl my-[15px] max-w-screen-lg text-red-500 font-bold md:text-5xl md:my-2">
              CRIAR CONTA
            </h2>
            <div className="grid grid-cols-2 gap-[1.75rem] mt-2 md:grid-cols-1 ">
              <div>
                <div className="w-[14rem] md:w-[20rem]">
                  <Input
                    label="Nome"
                    color="red"
                    size="lg"
                    width={130}
                    icon={<User />}
                    onChange={(e) => setName(e.target.value)}
                    crossOrigin={undefined}
                  />
                </div>
                <div className="w-[14rem]  md:w-[20rem] pt-4">
                  <Input
                    label="Sobrenome"
                    color="red"
                    size="lg"
                    width={130}
                    icon={<User />}
                    onChange={(e) => setSurname(e.target.value)}
                    crossOrigin={undefined}
                  />
                </div>
                <div className="w-[14rem]  md:w-[20rem] pt-4">
                  <Input
                    label="Nome da familia"
                    color="red"
                    size="lg"
                    width={130}
                    icon={<UsersThree />}
                    onChange={(e) => setFamilyName(e.target.value)}
                    crossOrigin={undefined}
                  />
                </div>
                <div className="w-[14rem]  md:w-[20rem] pt-4">
                  <Input
                    label="E-mail"
                    color="red"
                    size="lg"
                    width={130}
                    icon={<EnvelopeSimple />}
                    onChange={(e) => setEmail(e.target.value)}
                    crossOrigin={undefined}
                  />
                </div>
              </div>
              <div>
                <div className="w-[14rem] md:w-[20rem] md:mt-[-12px]">
                  <Input
                    label="Celular"
                    color="red"
                    size="lg"
                    width={130}
                    icon={<DeviceMobile />}
                    onChange={(e) => setCell(e.target.value)}
                    crossOrigin={undefined}
                  />
                </div>

                <div className="w-[14rem] md:w-[20rem] pt-4">
                  <Input
                    label="Data de Nascimento"
                    color="red"
                    size="lg"
                    width={130}
                    icon={<Calendar />}
                    onChange={(e) => setBirthDate(e.target.value)}
                    crossOrigin={undefined}
                  />
                </div>

                <div className="w-[14rem] md:w-[20rem] pt-4">
                  <Input
                    type="Password"
                    label="Senha"
                    color="red"
                    size="lg"
                    width={130}
                    icon={<LockKey />}
                    onChange={(e) => setPassword(e.target.value)}
                    crossOrigin={undefined}
                  />
                </div>
                <div className="w-[14rem] md:w-[20rem] pt-4">
                  <Input
                    type="Password"
                    label="Confirmação da senha"
                    color="red"
                    size="lg"
                    width={130}
                    icon={<LockKey />}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    crossOrigin={undefined}
                  />
                </div>
              </div>
            </div>
            <div className="flex mt-2 flex-col items-start w-[476px] md:items-start md:w-[430px]">
              <div className="flex justify-start items-start ml-[-12px]">
                <Checkbox
                  color="red"
                  defaultChecked
                  ripple={true}
                  label={
                    <Typography
                      variant="small"
                      className="text-black font-default "
                    >
                      Concordo com os{" "}
                      <strong className="font-bold text-red-500">
                        Termos de Uso
                      </strong>
                    </Typography>
                  }
                  className=""
                  crossOrigin={undefined}
                />
              </div>
              <input
                type="submit"
                className="text-white block w-[472px] h-[50px] md:w-[420px] rounded-lg outline-none border-none bg-gradient-to-r from-red-500 to-yellow-500 bg-200% text-lg color-white font-default mt-6 md:mt-2 cursor-pointer transition-[0.5s] hover:bg-right"
                value="CADASTRAR"
                onClick={() => {
                  setMessage("");
                  setOpen(false);
                  window.clearTimeout(timerRef.current);
                  timerRef.current = window.setTimeout(() => {
                    setOpen(true);
                  }, 100);
                }}
              ></input>
            </div>

            <div className="pt-2 md:hidden">
              <span className="text-black font-default text-sm">
                Já tem uma conta?{" "}
                <a
                  onClick={() => navigate("/login")}
                  className="font-default text-sm text-red-500 hover:text-red-900 font-bold"
                >
                  Entre aqui
                </a>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
