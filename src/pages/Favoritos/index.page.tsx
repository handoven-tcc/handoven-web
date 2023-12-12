
import Header from "../../components/Header";
import CardFavorite from "./Components/CardFavorite";
import { useFavorite } from "../../providers/Favorite";
import { useEffect } from "react";
import { useAuth } from "../../providers/Auth";
import { IPlate } from "../../types";

const Favoritos = () => {
  const { findFavoritesByFamily, favorites } = useFavorite();
  const { getFamilyId } = useAuth();
  const familyId = getFamilyId();

  useEffect(() => {
    (async () => {
      await findFavoritesByFamily(familyId);
    })();
  }, []);


  return(
    <div className="overflow-x-hidden">
    <Header/>
    <div className="mx-4 mt-5">

    <div className="gap-2  gap-y-2 w-full h-full mx-5 ml-[-2px] mb-16 grid grid-cols-5">

    {
      favorites.map((plate:IPlate) => {
        return (

          <CardFavorite key={plate.id} image={plate.image} name={plate.name} id={plate.id}/>
          )
        })
      }
      </div>

    </div>
    </div>
  )
}
export default Favoritos;
