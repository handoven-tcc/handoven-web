import { Button } from "@material-tailwind/react";
import { useKeenSlider } from "keen-slider/react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Heart } from "phosphor-react";
import { useCallback, useState } from "react";

interface IPlateItem {
  img: string;
  name: string;
  id: string;
}
function isDisabled(id: string) {
  if(id == "") {
    return true
  }
  return false
}


export function PlateItem({ img, name, id }: IPlateItem) {

  const [ favorited, setFavorited ] = useState(false)

  return (
    <div>
      <a href="#!">
        <Image
          className="rounded-t-lg w-48 h-32 "
          src={`data:image/png;base64,${img}`}
          width={100}
          height={90}
          alt=""
        />
      </a>
      <div className="flex pl-2 h-10 pt-1">
        <h5 className="text-bold text-md text-black">
          <strong>{name}</strong>
        </h5>
      </div>
      <div className="flex justify-between">
        <div className="flex gap-1 items-center p-2 ">
          {
            favorited ? (
              
          <a className="cursor-pointer" onClick={() => (setFavorited(false))}>
          <Heart size={32} color="#d40b03" weight="fill" />
          </a>
            ) :     
          <a className="cursor-pointer" onClick={() => (setFavorited(true))}>
          <Heart size={32} color="#d40b03"/>
          </a>
          }
        </div>
        <div className="flex p-2">
          <a href="#buttons-with-link">
            <Link href={`../receita/${id}`} key={id} prefetch={false}>
              <Button
                disabled={isDisabled(id)}
                variant="gradient"
                color="red"
                className="flex items-center shadow-lg justify-center gap-1 disabled:bg-red-900"
              >
                Detalhes <ArrowRight size={22} color="#fff" />
              </Button>
            </Link>
          </a>
        </div>
      </div>
    </div>
  );
}
