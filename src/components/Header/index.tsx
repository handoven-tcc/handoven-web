import React from "react";
import {
  Avatar,
  Button,
  Drawer,
  IconButton,
  Input,
} from "@material-tailwind/react";
import logo from "../../assets/logo.svg";
import pessoa from "../../assets/interrogacao.png";
import { BowlFood, Carrot } from "@phosphor-icons/react";
import { FolderOpen, Gear, Heart, SignOut, User, UsersThree } from "phosphor-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../providers/Auth";

const Header = () => {
  const navigate = useNavigate();

  const { getName, getEmail, logout } = useAuth();
  const [openRight, setOpenRight] = React.useState(false);

  const openDrawerRight = () => setOpenRight(true);
  const closeDrawerRight = () => setOpenRight(false);

  return (
    <div className="bg-white flex items-center justify-between px-10 shadow-lg">
      <div className="flex items-center justify-center gap-2 py-2">
        <img
          src={logo}
          alt="logo"
          width={50}
          height={100}
          className="md:w-[200px]"
        />
        <span className="text-red-500 text-2xl pr-2">
          <strong>Handoven</strong>
        </span>

        <div className="flex items-center justify-center gap-5 pl-10">
          <a
            onClick={() => navigate("/dashboard")}
            className=" hover:text-gray-700 duration-300"
          >
            <h3>Relatorio</h3>
          </a>

          <a
            onClick={() => navigate("/estoque")}
            className="hover:text-gray-700 duration-300"
          >
            Estoque{" "}
          </a>

          <a
            onClick={() => navigate("/receitas")}
            className="hover:text-gray-700 duration-300"
            id="receita"
          >
            Receita
          </a>
        </div>
      </div>

      <div className="flex  justify-center items-center gap-1 ">
        <div className="relative items-center flex w-full gap-2 md:w-max">
          <Input
            type="search"
            label="Type here..."
            className="pr-20"
            color="red"
            containerProps={{
              className: "min-w-[288px]",
            }}
            crossOrigin={undefined}
          />
          <Button
            size="sm"
            className="!absolute right-1 top-1 bottom-1 rounded bg-red-500 pl-3 pr-3"
          >
            Search
          </Button>
        </div>

        <button onClick={openDrawerRight} id="abrirModal" className="">
          <Avatar
            size="md"
            alt="avatar"
            src={pessoa}
            className="rounded-full mx-[5px] w-full"
          />
        </button>
      </div>
      <Drawer
        placement="right"
        open={openRight}
        onClose={closeDrawerRight}
        className=""
      >
        <div className="mb-6 flex items-center justify-between border-b border-gray-100 pb-2 px-2 pt-2">
          <div className="flex">
            <Avatar
              size="md"
              alt="avatar"
              src={pessoa}
            />
            <div className="pl-2 flex flex-col">
              <h2>
                <strong>{getName()}</strong>
              </h2>
              <span className="text-gray-800 text-xs">
                {getEmail()}
              </span>
            </div>
          </div>

          <IconButton
            variant="text"
            color="blue-gray"
            onClick={closeDrawerRight}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>
        </div>

        <div className="px-4 flex flex-col gap-2">
          <div>
            <a
              onClick={() => navigate("/favoritos")}
              className="flex gap-2 hover:bg-gray-100 p-2 rounded-sm duration-300"
              id="favoritas"
            >
              <Heart size={20} color="#3c5654" /> Favoritas
            </a>

            <a
              href=""
              className="flex gap-2 hover:bg-gray-100 p-2 rounded-sm duration-300"
            >
              <BowlFood size={20} color="#3c5654" /> Receitas
            </a>

            <a
              href=""
              className="flex gap-2 hover:bg-gray-100 p-2 rounded-sm mb-14 duration-300"
            >
              <Carrot size={20} color="#3c5654" /> Estoque
            </a>

            <div className="flex h-full items-end pt-80 w-full ">

            <a
              className="flex gap-2 hover:bg-gray-100 p-2 duration-300 w-full rounded-sm"
              onClick={() => { logout(), navigate("/login")}}
              >
              <SignOut size={20} color="#3c5654" /> Sair
            </a>
              </div>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default Header;
