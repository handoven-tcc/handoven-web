import { Button, Card, CardBody, CardFooter, CardHeader } from "@material-tailwind/react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Heart } from "phosphor-react";

interface IFavoriteProps {
  name: string,
  id: string,
  image: string
}

export default function CardFavorite({name, id, image}:IFavoriteProps) {

  return (
    <Card className="w-60 shadow-2xl">
    <CardHeader shadow={false} floated={false} className="h-40">
    <Image
          className="rounded-t-lg w-72 h-52 "
          src={`data:image/png;base64,${image}`}
          width={100}
          height={90}
          alt=""
        />
    </CardHeader>
    <CardBody>
      <div className=" flex items-center justify-between font-bold">
            <h1>{name}</h1>
      </div>
    </CardBody>
    <CardFooter className="pt-0 flex gap-4 items-center justify-center ">
      <a ><Heart size={32} color="#d40b03" weight="fill" />
          </a>
      <Link 
      href={`receita/${id}`}
      >
      <Button
        ripple={false}
        fullWidth={true}
        className="bg-red-500/90 text-white shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none flex items-center justify-center gap-2 active:scale-100"
        
        >
        Detalhes <ArrowRight size={22} color="#fff" />
      </Button>
        </Link>
    </CardFooter>
  </Card>
  )
}

