import logo from "../../assets/logo.svg";
import cozinhando from "../../assets/cozinhando.svg";
import wave from "../../assets/wave.png";
import { User, LockKey, FacebookLogo, GoogleLogo, X } from "phosphor-react";
import { Input, Checkbox, Typography, Alert } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useRef, useState } from "react";
import * as Toast from "@radix-ui/react-toast";
import { useAuth } from "../../providers/Auth";
import { LoginRequest } from "../../models";

export interface IUser {
  id: string;
  name: string;
  birthDate: string;
  email: number;
  cell: string;
  familyId: string;
}

const submitLoginFormSchema = z.object({
  email: z
    .string()
    .min(10, { message: "O usuário precisa ter pelo menos 3 letras." })
    .email({
      message: "Email invalido, Por favor inserir um email valido",
    })
    .transform((email) => email.toLowerCase()),
  password: z
    .string()
    .min(3, { message: "A senha precisa ter pelo menos 3 caracteres." }),
});

type SubmitLoginForm = z.infer<typeof submitLoginFormSchema>;

const Login = () => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const eventDateRef = useRef(new Date());
  const timerRef = useRef(0);
  const [message, setMessage] = useState("");
  const { login, setToken } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SubmitLoginForm>({
    resolver: zodResolver(submitLoginFormSchema),
  });

  function handleGuest() {
    setToken("token");
    // setCookie("token", "token", { maxAge: 60 * 60 * 24 });
  }

  // async function handleConnectGoogle() {
  //   await signIn("google");
  // }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    try {
      const request = new LoginRequest(email, password);
      const response = await login(request);

      // console.log("[LOGIN_RESPONSE]: ", response);

      // if (response) {
      //   setMessage("Login Concluido!");

      //   // router.push("/home");
      // }
    } catch (error) {
      setMessage("Email ou senha inválidos");
      console.log("[LOGIN_ERROR]: ", error);
    }
  }
  React.useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);
  return (
    <>
      <Toast.Provider swipeDirection="right">
        {errors.email ? (
          <>
            <Toast.Root
              className="absolute right-0 top-0 border-none mt-3 mr-3 rounded-xl transition"
              open={open}
              onOpenChange={setOpen}
            >
              <div className="flex flex-col">
                <Alert className="bg-[#d40b03]/10 text-[#d40b03] border-l-4 border-[#d40b03] rounded-none font-medium mr-[-20px]">
                  <Typography className="font-medium text-sm flex justify-between">
                    Certifique-se de que o email tenha estes requisitos:
                    <Toast.Action
                      className="pl-4"
                      asChild
                      altText="Goto schedule to undo"
                    >
                      <button className=" mr-[-10px]">
                        <X />
                      </button>
                    </Toast.Action>
                  </Typography>
                  <ul className="mt-2 ml-2 list-disc list-inside">
                    <li className="text-xs">Ao menos 10 caracteres</li>
                    <li className="text-xs">Seja um Email Valido</li>
                  </ul>
                </Alert>
              </div>
            </Toast.Root>
            <Toast.Viewport className="ToastViewport" />
          </>
        ) : null}
        {message == "Email ou senha inválidos" ? (
          <>
            <Toast.Root
              className="absolute right-0 top-0 border-none mt-3 mr-3 rounded-xl transition"
              open={open}
              onOpenChange={setOpen}
            >
              <div className="flex flex-col">
                <Alert className="bg-[#d40b03]/10 text-[#d40b03] border-l-4 border-[#d40b03] rounded-none font-medium mr-[-10px]">
                  <Typography className="font-medium text-sm flex">
                    Senha e Email não conferem
                    <Toast.Action
                      className="pl-4"
                      asChild
                      altText="Goto schedule to undo"
                    >
                      <button className=" mr-[-10px]">
                        <X />
                      </button>
                    </Toast.Action>
                  </Typography>
                </Alert>
              </div>
            </Toast.Root>
            <Toast.Viewport className="ToastViewport" />
          </>
        ) : (
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
                      <button className=" mr-[-10px]">
                        <X />
                      </button>
                    </Toast.Action>
                  </Typography>
                </Alert>
              </div>
            </Toast.Root>
            <Toast.Viewport className="ToastViewport" />
          </>
        )}
        <div>
          <img
            src={wave}
            alt="wave"
            width={650}
            height={20}
            className="fixed h-[100%] left-0 bottom-0 z-[-1] md:hidden"
          />
          <div className="w-[100wh] h-[100vh] grid grid-cols-2 gap-[8rem] pr-8 pl-20 md:gap-[5rem] md:grid-cols-1 md:pl-8">
            <div className="flex justify-end items-center ">
              <img
                src={cozinhando}
                alt=""
                width={500}
                height={20}
                className="md:hidden"
              />
            </div>
            <div className="flex justify-start items-center text-center md:mt-[-20rem] md:justify-center ml-12">
              <form
                onSubmit={handleLogin}
                action="index.html"
                className=" flex items-center flex-col md:w-[290px]"
              >
                <img
                  src={logo}
                  alt="logo"
                  width={100}
                  height={100}
                  className="md:w-[200px]"
                />
                <h2 className="text-6xl my-[15px] max-w-screen-lg text-red-500 font-bold md:text-5xl md:my-2">
                  FAZER LOGIN
                </h2>
                <div className="flex justify-center items-end h-[45px] flex-col mt-8">
                  <div className="w-[20rem]">
                    <Input
                      crossOrigin={undefined}
                      label="Email"
                      color="red"
                      size="lg"
                      width={130}
                      icon={<User />}
                      {...register("email")}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="w-[20rem] pt-4">
                    <Input
                      crossOrigin={undefined}
                      type="password"
                      label="Password"
                      color="red"
                      size="lg"
                      width={130}
                      icon={<LockKey />}
                      {...register("password")}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex mt-8 flex-col">
                  <div className="flex justify-between items-center ml-[-14px]">
                    <Checkbox
                      color="red"
                      defaultChecked
                      ripple={true}
                      label={
                        <Typography
                          variant="small"
                          className="text-black font-default "
                        >
                          Lembrar de mim
                        </Typography>
                      }
                      className=""
                      crossOrigin={undefined}
                    />
                    <a
                      href="#"
                      className="text-black font-default text-sm hover:underline "
                    >
                      Esqueci a senha?
                    </a>
                  </div>
                  <input
                    type="submit"
                    className="text-white block w-[320px] h-[50px] mt-2 rounded-lg outline-none border-none bg-gradient-to-r from-red-500 to-yellow-500 bg-200% text-lg color-white font-default cursor-pointer transition-[0.5s] hover:bg-right"
                    value="LOGIN"
                    onClick={() => {
                      setMessage("");
                      setOpen(false);
                      window.clearTimeout(timerRef.current);
                      timerRef.current = window.setTimeout(() => {
                        setOpen(true);
                      }, 600);
                    }}
                  />
                </div>

                <div className="pt-3 flex flex-col">
                  <a href="/register">
                    <span className="text-black font-default text-sm">
                      Não tem uma conta?{" "}
                      <strong className="font-default text-sm text-red-500 hover:text-red-900 font-bold">
                        Crie aqui
                      </strong>
                    </span>
                  </a>
                  <a
                    href={"/home"}
                    className="mt-2 font-normal text-sm text-black"
                    onClick={handleGuest}
                  >
                    Entrar como convidado.
                  </a>
                </div>

                <div className="flex items-center justify-center flex-col">
                  <h2 className="font-bold font-default pt-4 before:content-[' '] before:absolute before:w-[6%] before:border-t-[1px] before:border-solid before:border-gray-300 before:mt-3 before:ml-[-6.6%] after:mt-3 after:ml-[0.7%] after:content-[' '] after:absolute after:w-[6%] after:border-t-[1px] after:border-solid after:border-gray-300">
                    Ou faça login com
                  </h2>
                  <div className="flex pt-4 gap-2">
                    <a href="" className="">
                      <FacebookLogo size={40} color="#405892" weight="fill" />
                    </a>
                    {/* <button className="" onClick={handleConnectGoogle}>
                      <GoogleLogo size={40} color="#DB5042" weight="fill" />
                    </button> */}
                    <a href=""></a>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Toast.Provider>
    </>
  );
};

export default Login;
