import { Button } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/Header";
import { IPlate } from "../../types";
import { usePlates } from "../../providers/Plates";
import { Circle } from "phosphor-react";

const PlateId = () => {
  const { id } = useParams();
  const { getProductById } = usePlates();
  const [plate, setPlate] = useState<IPlate>();
  const [ pageYPosition, setPageYPosition ] = useState(0);

  function getPageYAfterScroll(){
    window.scrollTo(660, 660);
  }

  useEffect(() => {
    (async () => setPlate(await getProductById(id)))();
  }, []);

  return (
    <div className="">
      <Header/>
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
        <h1 className="text-3xl font-bold pt-2 ">
        {plate?.name}
          </h1>
          {
             plate?.section.extras.map((extra, index) => {
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
          onClick={getPageYAfterScroll}
          >
            Ver Mais
          </Button>
          </div>
        </div>
        </div>
          <div className="flex justify-between h-full">

        <div className=" border-black rounded-lg text-xl border text-bold p-6 mb-4 ml-8 w-5/12 h-6/6">
          <h1>
            Igredientes
          </h1>
          <ul>

          {
            plate?.section.ingredients?.map((igrediente:any) => {
              return (
                <li key={igrediente._index} className="pt-6 list-disc list-outside list flex items-center justify-start gap-1">
                  <Circle size={8} weight="fill" className="mb-0.5"/>
                <h2 className=" text-md" key={igrediente._id}>
                      { igrediente.ingredients_quantity == "0" ?
                     igrediente.ingredients_unit_measure +" de "+ igrediente.ingredients_name
                     :
                     igrediente.ingredients_quantity + " " + igrediente.ingredients_unit_measure +" de "+ igrediente.ingredients_name
                     }
                  </h2>
                </li>
            )
          })
        }
        </ul>
        </div>
        <div className="border-black rounded-md border mr-8 mb-4 w-5/12 p-6">
        <div className="rounded-lg text-xl text-bold">
          <h1>
            Modo de Preparo
          </h1>
          </div>
        {
            plate?.section.prepare_mode.map((step:string) => {
              return (
                <li key={step} className="pt-6 list-disc list-outside list flex items-center justify-start gap-1">
                <h2 className=" text-md" key={step}>
                     { step }
                  </h2>
                </li>
            )
          })
        }
        </div>
          </div>
    </div>
  );
};

export default PlateId;
