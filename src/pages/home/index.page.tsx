import Image from "next/image";
import { NextRequest, NextResponse } from "next/server";
import Link from "next/link";
import estoque from "../../assets/estoque.svg";
import receita from "../../assets/receitas.svg";
import relatorio from "../../assets/relatorio.svg";
import { getCookie } from "cookies-next";

import { INextApi } from "../../types";

export default function HomePage() {
  return (
    <div className="flex items-center flex-col justify-center w-[100wh] h-[80vh]">
      <h1 className="font-bold text-6xl font-default text-red-500 pt-20 ">
        Nossos Serviços
      </h1>

      <div className="grid grid-cols-3 pt-14 px-8 gap-4">
        <Link
          href="../dashboard/receita"
          className="w-[420px] h-[350px] flex items-center justify-center justify-items-center flex-col border-gray-300 border p-5 rounded-lg hover:shadow-3xl "
        >
          <Image
            src={receita}
            alt=""
            width={200}
            height={700}
            className="pt-8"
          />

          <h1 className="font-bold text-3xl text-red-500 pt-10 font-default">
            Receita
          </h1>

          <span className="pt-4">Faça as melhores receita aqui.</span>
        </Link>
        <Link
          href="../dashboard/estoque"
          className="w-[420px] h-[350px] flex items-center justify-center justify-items-center flex-col border-gray-300 border p-5 rounded-lg hover:shadow-3xl "
        >
          <Image src={estoque} alt="" width={170} height={150} />

          <h1 className="font-bold text-3xl text-red-500 pt-10 font-default">
            Estoque
          </h1>

          <span className="pt-4">Edite seu Estoque do seu jeito.</span>
        </Link>
        <Link
          href="../dashboard/relatorio"
          className=" w-[420px] h-[350px] flex items-center justify-center justify-items-center flex-col border-gray-300 border p-5 rounded-lg hover:shadow-3xl "
        >
          <Image
            src={relatorio}
            alt=""
            width={200}
            height={150}
            className="pt-3"
          />

          <h1 className="font-bold text-3xl text-red-500 pt-10 font-default">
            Relatórios
          </h1>

          <span className="pt-4">
            Veja os relatórios que criamos para você.
          </span>
        </Link>
      </div>
    </div>
  );
}

export async function getServerSideProps({ req, res }: INextApi) {
  const token = getCookie("token", { req, res });
  console.log(token);
  if (token == undefined) {
    res.writeHead(302, { Location: "/login" });
    res.end();
    return { props: {} };
  }
  return { props: {} };
}
