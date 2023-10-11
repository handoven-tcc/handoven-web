import { Button } from "@material-tailwind/react";
import { ArrowRight, Heart } from "phosphor-react";
import { useNavigate } from "react-router-dom";

interface IPlateItem {
  img: string;
  name: string;
  id: string;
}

const isDisabled = (id: string) => {
  if (id == "") {
    return true;
  }
  return false;
};

const PlateItem = ({ img, name, id }: IPlateItem) => {
  const navigate = useNavigate();
  return (
    <div>
      <a href="#!">
        <img
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
          <Heart size={32} color="#d40b03" />
        </div>
        <div className="flex p-2">
          <a href="#buttons-with-link">
            <a onClick={() => navigate(`/receita/${id}`)} key={id}>
              <Button
                disabled={isDisabled(id)}
                variant="gradient"
                color="red"
                className="flex items-center shadow-lg justify-center gap-1 disabled:bg-red-900"
              >
                Detalhes <ArrowRight size={22} color="#fff" />
              </Button>
            </a>
          </a>
        </div>
      </div>
    </div>
  );
};

export default PlateItem;
