import Link from "next/link";
import React from "react";
import {
  Avatar,
  Button,
  Drawer,
  IconButton,
  Input,
  SpeedDial,
  SpeedDialAction,
  SpeedDialContent,
  SpeedDialHandler,
  Typography,
} from "@material-tailwind/react";
import Image from "next/image";
import logo from "../assets/logo.svg";
import { BowlFood, Carrot, Engine } from "@phosphor-icons/react";
import {
  FolderOpen,
  Gear,
  Heart,
  Newspaper,
  Plus,
  SignOut,
  User,
  Users,
  UsersThree,
} from "phosphor-react";
import { deleteCookie } from "cookies-next";

export function Header() {
  const [openRight, setOpenRight] = React.useState(false);

  const openDrawerRight = () => setOpenRight(true);
  const closeDrawerRight = () => setOpenRight(false);

  return (
    <div className="bg-white flex items-center justify-between px-10  shadow-lg">
      <div className="flex items-center justify-center gap-2 py-2">
        <Image
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
          <Link
            href="/dashboard/relatorio"
            className=" hover:text-gray-700 duration-300"
          >
            <h3>Relatorio</h3>
          </Link>

          <Link
            href="/dashboard/estoque"
            className="hover:text-gray-700 duration-300"
          >
            Estoque{" "}
          </Link>

          <Link
            href="/dashboard/receita"
            className="hover:text-gray-700 duration-300"
          >
            Receita
          </Link>
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
          />
          <Button
            size="sm"
            className="!absolute right-1 top-1 bottom-1 rounded bg-red-500 pl-3 pr-3"
          >
            Search
          </Button>
        </div>

        <button onClick={openDrawerRight} className="">
          <Avatar
            size="md"
            alt="avatar"
            src="https://github.com/mateussk83.png"
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
              src="https://github.com/mateussk83.png"
            />
            <div className="pl-2 flex flex-col">
              <h2>
                <strong>mateussk83</strong>
              </h2>
              <span className="text-gray-800 text-xs">
                Mateus Garcia Santos
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

        <div className="px-4 flex flex-col gap-2 h-full">
          <div>
            <Link
              href=""
              className="flex gap-2 hover:bg-gray-100 p-2 rounded-sm duration-300"
            >
              <User size={20} color="#3c5654" /> Seu Perfil
            </Link>

            <Link
              href=""
              className="flex gap-2 hover:bg-gray-100 p-2 rounded-sm duration-300"
            >
              <Heart size={20} color="#3c5654" /> Favoritas
            </Link>

            <Link
              href="../dashboard/receita"
              className="flex gap-2 hover:bg-gray-100 p-2 rounded-sm duration-300"
            >
              <BowlFood size={20} color="#3c5654" /> Receitas
            </Link>

            <Link
              href="../dashboard/estoque"
              className="flex gap-2 hover:bg-gray-100 p-2 rounded-sm duration-300"
            >
              <Carrot size={20} color="#3c5654" /> Estoque
            </Link>

            <Link
              href=""
              className="flex gap-2 hover:bg-gray-100 p-2 rounded-sm duration-300"
            >
              <FolderOpen size={20} color="#3c5654" /> Relatórios
            </Link>
            <Link
              href=""
              className="flex gap-2 hover:bg-gray-100 p-2 rounded-sm duration-300"
            >
              <UsersThree size={20} color="#3c5654" /> Família
            </Link>
            <Link
              href="../acc/config"
              className="flex gap-2 hover:bg-gray-100 p-2 rounded-sm duration-300"
            >
              <Gear size={20} color="#3c5654" /> Configuração
            </Link>
            <div className="flex h-full items-center pt-16 w-full">

            <Link
              href="../login"
              className="flex gap-2 hover:bg-gray-100 p-2 duration-300 w-full rounded-sm"
              onClick={() => { deleteCookie('token'), deleteCookie('familyId') }}
              >
              <SignOut size={20} color="#3c5654" /> Sair
            </Link>
              </div>
            
          </div>
        </div>
      </Drawer>
    </div>
  );
}
