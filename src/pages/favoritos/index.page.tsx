import { Card, IconButton, List, ListItem, ListItemSuffix } from "@material-tailwind/react";
import { Header } from "../../components/Header";
import { Trash } from "phosphor-react";
import CardFavorite from "../../components/CardFavorite";
import axios from "axios";
import { GetServerSideProps } from "next";
import { IPlate } from "../../contexts/PlateContext";
import { getCookie } from "cookies-next";


interface PlateProps {
  plates: IPlate[]
}

export default function Favoritos({ plates }: PlateProps) {
  return(
    <div className="overflow-x-hidden">
    <Header/>
    <div className="mx-4 mt-5">

    <div className="flex gap-2 w-full h-full mx-5 ml-[-2px] mb-16">

    {
      plates.map((plate:IPlate) => {
        return (
          
          <CardFavorite key={plate.id} image={plate.image} name={plate.name} id={plate.id} category={plate.category}/>
          )
        })
      }
      </div>
    
    </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({query, req, res} )  => {
  try {
  const familyId = getCookie("familyId", { req, res });

    const plates:any = await axios.get(
      `https://handovenapi.onrender.com/favorites?familyId=${familyId}`,
      {
        headers: {
          "Content-type": "application/json",
          "X-HandOven-Family": familyId,
          "X-HandOven-User":"111111111111111111111111",
        },
      }
      );
      console.log(plates)
    return { props: {
  plates: plates.data
    }
  }
  }
      catch(err) {
        console.log(err)
      return { props: {
        plates: []
          }
        };
    }
}

