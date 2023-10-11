import { Button } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/Header";
import { IPlate } from "../../types";
import { usePlates } from "../../providers/Plates";

const PlateId = () => {
  const { id } = useParams();
  const { getProductById } = usePlates();
  const [plate, setPlate] = useState<IPlate>();

  useEffect(() => {
    (async () => setPlate(await getProductById(id ?? "")))();
  }, []);

  return (
    <div className="">
      <Header />
      <img
        className=" w-full h-[90%] absolute z-[-10] flex"
        src={`data:image/png;base64,${plate?.image}`}
        width={100}
        height={20}
        alt=""
      />
      <div className=" text-center justify-center items-end flex">
        <div className="bg-white w-full mt-[26%] h-64 z-40 flex mx-[30%] rounded-t-lg">
          <div className="flex justify-start items-center w-full flex-col">
            <h1 className="text-3xl font-bold pt-2 ">{plate?.name}</h1>
            {plate?.section.extras.map((extra: string, index: number) => {
              return (
                <h2 className="pt-6 text-xl" key={index}>
                  {extra}
                </h2>
              );
            })}
            <Button className="mt-4" color="yellow">
              Ver Mais
            </Button>
          </div>
        </div>
      </div>
      <div className="flex justify-betweeb">
        <div className=" border-black rounded-md border ">
          <h1>Igredientes</h1>
          {plate?.section.ingredients?.map((igrediente: any) => {
            return (
              <h2 className="pt-6 text-xl" key={igrediente._id}>
                {igrediente.igredients_name}
              </h2>
            );
          })}
        </div>
        <div className=" border-black rounded-md border ">alo alo</div>
      </div>
    </div>
  );
};

export default PlateId;
