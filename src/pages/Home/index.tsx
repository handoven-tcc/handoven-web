import estoque from "../../assets/estoque.svg";
import receita from "../../assets/receitas.svg";
import relatorio from "../../assets/relatorio.svg";
import { useEffect, useState } from "react";

const Home = () => {
  return (
    <div className="flex items-center flex-col justify-center w-[100wh] h-[80vh]">
      <h1 className="font-bold text-6xl font-default text-red-500 pt-20 ">
        Nossos Serviços
      </h1>

      <div className="grid grid-cols-3 pt-14 px-8 gap-4">
        <a
          href="../receita"
          className="w-[420px] h-[350px] flex items-center justify-center justify-items-center flex-col border-gray-300 border p-5 rounded-lg hover:shadow-3xl "
        >
          <img src={receita} alt="" width={200} height={700} className="pt-8" />

          <h1 className="font-bold text-3xl text-red-500 pt-10 font-default">
            Receita
          </h1>

          <span className="pt-4">Faça as melhores receita aqui.</span>
        </a>
        <a
          href="../estoque"
          className="w-[420px] h-[350px] flex items-center justify-center justify-items-center flex-col border-gray-300 border p-5 rounded-lg hover:shadow-3xl "
        >
          <img src={estoque} alt="" width={170} height={150} />

          <h1 className="font-bold text-3xl text-red-500 pt-10 font-default">
            Estoque
          </h1>

          <span className="pt-4">Edite seu Estoque do seu jeito.</span>
        </a>
        <a
          href="../dashboard"
          className=" w-[420px] h-[350px] flex items-center justify-center justify-items-center flex-col border-gray-300 border p-5 rounded-lg hover:shadow-3xl "
        >
          <img
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
        </a>
      </div>
    </div>
  );
};

export default Home;
