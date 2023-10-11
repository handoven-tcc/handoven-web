import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  Input,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Option,
  Select,
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";
// @ts-ignore
import { useCountries } from "use-react-countries";
import { Check, Trash, X } from "phosphor-react";
import Header from "../../components/Header";

const Profile = () => {
  const [openTab, setOpenTab] = useState(1);
  const [email, _] = useState("");
  const { countries } = useCountries();
  const [country, setCountry] = useState(0);
  const { name, flags, countryCallingCode } = countries[country];

  return (
    <div className="overflow-x-hidden ">
      <Header />
      <div className="flex flex-center items-center w-full flex-col pt-4 ">
        <Avatar
          src="https://github.com/mateussk83.png"
          alt="profile-picture"
          size="xxl"
        />
        <Typography variant="h4" color="red" className="mb-2">
          Mateus Handoven
        </Typography>
      </div>
      <div className="flex flex-wrap">
        <div className="w-full">
          <ul
            className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
            role="tablist"
          >
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                  (openTab === 1
                    ? "text-white bg-" + "red" + "-500"
                    : "text-" + "red" + "-500 bg-white")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(1);
                }}
                data-toggle="tab"
                href="#link1"
                role="tablist"
              >
                Perfil
              </a>
            </li>
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                  (openTab === 2
                    ? "text-white bg-" + "red" + "-500"
                    : "text-" + "red" + "-500 bg-white")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(2);
                }}
                data-toggle="tab"
                href="#link2"
                role="tablist"
              >
                Familia
              </a>
            </li>
          </ul>
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <div className="px-4 py-5 flex-auto">
              <div className="tab-content tab-space">
                <div
                  className={
                    openTab === 1
                      ? "flex flex-col gap-6 justify-start items-start"
                      : "hidden"
                  }
                  id="link1"
                >
                  <div className="flex gap-6 justify-start items-start">
                    <div>
                      <div className="w-[25rem] md:w-[20rem]">
                        <Input
                          label="Nome"
                          color="yellow"
                          size="lg"
                          width={130}
                          crossOrigin={undefined}
                        />
                      </div>

                      <div className="w-[25rem]  md:w-[20rem] pt-4">
                        <Input
                          label="Nome da familia"
                          color="yellow"
                          size="lg"
                          width={130}
                          disabled={true}
                          crossOrigin={undefined}
                        />
                      </div>
                      <div className="relative flex w-full items-center max-w-[40rem] pt-4">
                        <Input
                          type="email"
                          label="Email Address"
                          size="lg"
                          value={email}
                          color="yellow"
                          className="pr-20"
                          containerProps={{
                            className: "min-w-0",
                          }}
                          crossOrigin={undefined}
                        />
                        <Button
                          size="sm"
                          color={email ? "yellow" : "green"}
                          disabled={!email}
                          className="!absolute right-1 top-0.6 rounded bg-green-500 text-white"
                        >
                          {email ? "Enviar" : "Confirmado"}
                        </Button>
                      </div>
                    </div>

                    <div>
                      <div className="w-[25rem] md:w-[20rem] md:mt-[-12px]">
                        <div className="w-[25rem] md:w-[20rem]">
                          <Input
                            label="Data de nascimento"
                            color="yellow"
                            size="lg"
                            width={130}
                            crossOrigin={undefined}
                          />
                        </div>
                      </div>

                      <div className="w-[25rem] md:w-[20rem] pt-4">
                        <Input
                          type="Password"
                          label="Senha"
                          color="yellow"
                          size="lg"
                          width={130}
                          crossOrigin={undefined}
                        />
                      </div>
                      <div className="w-[25rem] md:w-[20rem] pt-4">
                        <Input
                          type="Pasword"
                          label="Confirmação da senha"
                          color="yellow"
                          size="lg"
                          width={130}
                          crossOrigin={undefined}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="relative flex w-full max-w-[24rem]">
                        <Menu placement="bottom-start">
                          <MenuHandler>
                            <Button
                              ripple={false}
                              variant="text"
                              color="blue-gray"
                              className="flex h-10 items-center gap-2 rounded-r-none rounded-l-md border border-r-0 border-blue-gray-200 bg-blue-gray-500/10 pl-3"
                            >
                              <img
                                src={flags.svg}
                                alt={name}
                                className="h-4 w-4 rounded-full object-cover"
                              />
                              {countryCallingCode}
                            </Button>
                          </MenuHandler>
                          <MenuList className="max-h-[20rem] max-w-[18rem]">
                            {countries.map(
                              (
                                { name, flags, countryCallingCode }: any,
                                index: any
                              ) => {
                                return (
                                  <MenuItem
                                    key={name}
                                    value={name}
                                    className="flex items-center gap-2"
                                    onClick={() => setCountry(index)}
                                  >
                                    <img
                                      src={flags.svg}
                                      alt={name}
                                      className="h-5 w-5 rounded-full object-cover"
                                    />
                                    {name}{" "}
                                    <span className="ml-auto">
                                      {countryCallingCode}
                                    </span>
                                  </MenuItem>
                                );
                              }
                            )}
                          </MenuList>
                        </Menu>
                        <Input
                          type="tel"
                          placeholder="Mobile Number"
                          color="red"
                          className="rounded-l-none !border-t-blue-gray-200 focus:!border-t-red-500"
                          labelProps={{
                            className: "before:content-none after:content-none",
                          }}
                          containerProps={{
                            className: "min-w-0",
                          }}
                          crossOrigin={undefined}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button color="red" className="rounded-sm" size="md">
                      <div className="flex items-center justify-center gap-1">
                        <X size={20} weight="bold" /> Cancelar
                      </div>
                    </Button>
                    <Button color="green" className="rounded-sm" size="md">
                      <div className="flex items-center justify-center gap-1">
                        <Check size={20} weight="bold" />
                        Confirmar
                      </div>
                    </Button>
                  </div>
                </div>
                <div className={openTab === 2 ? "flex" : "hidden"} id="link2">
                  <Card className="w-80 flex">
                    <CardBody className="text-center">
                      <Avatar
                        src="https://github.com/ThiagodePaulaSouza.png"
                        alt="profile-picture"
                        size="xl"
                      />
                      <Typography
                        variant="h4"
                        color="blue-gray"
                        className="mb-2"
                      >
                        Thiago Handoven
                      </Typography>
                      <Typography
                        color="blue-gray"
                        className="font-medium"
                        textGradient
                      >
                        Administrador
                      </Typography>
                    </CardBody>
                    <CardFooter className="flex justify-center items-center gap-7 pt-2">
                      <div className="">
                        <Select
                          label="cargo"
                          color="red"
                          animate={{
                            mount: { y: 0 },
                            unmount: { y: 25 },
                          }}
                        >
                          <Option>Administrador</Option>
                          <Option>Usuario</Option>
                        </Select>
                      </div>
                      <button className="bg-red-500 p-1.5 rounded-sm hover:bg-red-800">
                        <Trash size={32} color="#fff" weight="fill" />
                      </button>
                    </CardFooter>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
