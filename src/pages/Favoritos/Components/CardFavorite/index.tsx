import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@material-tailwind/react";
import { ArrowRight, Heart } from "phosphor-react";
import { useFavorite } from "../../../../providers/Favorite";
import { useAuth } from "../../../../providers/Auth";
import { useState } from "react";

interface IFavoriteProps {
  name: string;
  id: string;
  image: string;
}

export default function CardFavorite({ name, id, image }: IFavoriteProps) {
  const [favorited, setFavorited] = useState(true);
  const { removeFavorite, addFavorite } = useFavorite();
  const { getFamilyId } = useAuth();
  return (
    <Card className="flex flex-col shadow-2xl p-0">
      <CardHeader shadow={false} floated={false} className="h-40">
        <img
          className="rounded-t-lg w-72 h-52 "
          src={`data:image/png;base64,${image}`}
          width={100}
          height={90}
          alt=""
        />
      </CardHeader>
      <CardBody className="h-20">
        <div className=" flex items-center justify-center font-bold ">
          <h1>{name}</h1>
        </div>
      </CardBody>
      <CardFooter className="flex gap-4 items-center justify-center ">
        <div>
          {favorited ? (
            <div className="flex gap-4 items-center p-2 ">
              <a
              onClick={() => (removeFavorite(id, getFamilyId()), setFavorited(false))}
              id="removeFavorite"
              >
                <Heart size={32} color="#d40b03" weight="fill" />
              </a>
              <a href={`receitas/${id}`}>
                <Button
                  ripple={false}
                  fullWidth={true}
                  className="bg-red-500/90 text-white shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none flex items-center justify-center gap-2 active:scale-100"
                >
                  Detalhes <ArrowRight size={22} color="#fff" />
                </Button>
              </a>
            </div>
          ) : (
            <div className="flex gap-4 items-center p-2 ">
              <a>
                <Heart size={32} color="#d40b03" />
              </a>
              <a href={`receitas/${id}`}>
                <Button
                  ripple={false}
                  fullWidth={true}
                  className="bg-red-500/90 text-white shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none flex items-center justify-center gap-2 active:scale-100"
                  onClick={() => (addFavorite(id, getFamilyId()), setFavorited(true))}
                  id="addFavorite"
                >
                  Detalhes <ArrowRight size={22} color="#fff" />
                </Button>
              </a>
            </div>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
