
import axios from "axios";
import { getCookie } from "cookies-next";
import Head from "next/head";
import Image from "next/image";
import { NextRequest, NextResponse } from "next/server";
import { useContextSelector } from "use-context-selector";
import { ICategory, IPlate, ISection } from "../../contexts/PlateContext";
import { GetServerSideProps } from "next";
import { Header } from "../../components/Header";
import { Button } from "@material-tailwind/react";

interface INext {
  req: NextRequest,
  res: NextResponse,
  params: {
    id: string
  }
}


interface PlateProps {
  plate: IPlate
}


export default function Receita({ plate }: PlateProps) {
  return (
    <div className="">
      <Header/>
       <Image
          className=" w-full h-[90%] absolute z-[-10] flex"
          src={`data:image/png;base64,${plate.image}`}
          width={100}
          height={20}
          alt=""
        />
        <div className=" text-center justify-center items-end flex">
        <div className="bg-white w-full mt-[26%] h-64 z-40 flex mx-[30%] rounded-t-lg">
          <div className="flex justify-start items-center w-full flex-col">
        <h1 className="text-3xl font-bold pt-2 ">
        {plate.name}
          </h1> 
          {
             plate.section.extras.map((extra, index) => {
                return (
                  <h2 className="pt-6 text-xl" key={index}>
                  {extra}
                  </h2>
            )
            }) 
          }
          <Button
          className="mt-4"
          color="yellow"
          >
            Ver Mais
          </Button>
          </div>
        </div>
        </div>
          <div className="flex justify-betweeb">

        <div className=" border-black rounded-md border ">
          <h1>
            Igredientes
          </h1>
          {
              console.log(plate.section.igredients),
             plate.section.igredients?.map((igrediente:ICategory) => {
                return (
                  <h2 className="pt-6 text-xl" key={igrediente._id}>
                  {igrediente.igredients_name}
                  </h2>
            )
            }) 
          }

        </div>
        <div className=" border-black rounded-md border ">
          alo alo
        </div>
          </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({query, req, res} )  => {
  try {
  const plateId = String(query.id);

    const plate:any = await axios.get(
      "https://handovenapi.onrender.com/plates/" + plateId,
      {
        headers: {
          "Content-type": "application/json",
          "X-HandOven-Family":"111111111111111111111111",
          "X-HandOven-User":"111111111111111111111111",
        },
      }
      );
    console.log(plate)
    return { props: {
  plate: {
    id: plate.data.id,
    name: plate.data.name,
    image: plate.data.image,
    category: plate.data.category,
    favorites: plate.data.favorited,
    section: plate.data.section
  }
    }
  }
  }
      catch(err) {
      res.writeHead(302, { Location: "/dashboard/receita" });
      res.end();
    }
}

