import { Input } from "@material-tailwind/react";
import { useKeenSlider } from "keen-slider/react";
import { MagnifyingGlass } from "phosphor-react";
import { useEffect } from "react";
import Header from "../../components/Header";
import PlateItem from "./Components/PlateItem";
import { usePlates } from "../../providers/Plates";
import { useAlgorithm } from "../../providers/Augorithm";
import { useAuth } from "../../providers/Auth";

const Plates = () => {
  const {
    getPlates,
    aperitivos,
    asiaticos,
    bebidas,
    brasileiro,
    frangos,
    massas,
    omeletes,
    peixes,
    pizzas,
    risotos,
    saladas,
    sobremesas,
    sopas,
    vegetarianas,
  } = usePlates();

  const [sliderRefSobremesa] = useKeenSlider({
    loop: true,
    slides: {
      perView: 8,
      spacing: 10,
    },
  });
  const [sliderRefSalada] = useKeenSlider({
    loop: true,
    slides: {
      perView: 10,
      spacing: 10,
    },
  });
  const [sliderRefSopas] = useKeenSlider({
    loop: true,
    slides: {
      perView: 8,
      spacing: 10,
    },
  });
  const [sliderRefOmeletes] = useKeenSlider({
    loop: true,
    slides: {
      perView: 8,
      spacing: 10,
    },
  });
  const [sliderRefAsiatico] = useKeenSlider({
    loop: true,
    slides: {
      perView: 8,
      spacing: 10,
    },
  });
  const [sliderRefBrasileiro] = useKeenSlider({
    loop: true,
    slides: {
      perView: 8,
      spacing: 10,
    },
  });
  const [sliderRefRisotos] = useKeenSlider({
    loop: true,
    slides: {
      perView: 8,
      spacing: 10,
    },
  });
  const [sliderRefFrangos] = useKeenSlider({
    loop: true,
    slides: {
      perView: 8,
      spacing: 10,
    },
  });
  const [sliderRefMassas] = useKeenSlider({
    loop: true,
    slides: {
      perView: 8,
      spacing: 10,
    },
  });
  const [sliderRefPeixes] = useKeenSlider({
    loop: true,
    slides: {
      perView: 8,
      spacing: 10,
    },
  });
  const [sliderRefPizzas] = useKeenSlider({
    loop: true,
    slides: {
      perView: 8,
      spacing: 10,
    },
  });
  const [sliderRefBebidas] = useKeenSlider({
    loop: true,
    slides: {
      perView: 8,
      spacing: 10,
    },
  });
  const [sliderRefAperitivos] = useKeenSlider({
    loop: true,
    slides: {
      perView: 8,
      spacing: 10,
    },
  });
  const [sliderRefVegetarianas] = useKeenSlider({
    loop: true,
    slides: {
      perView: 8,
      spacing: 10,
    },
  });
  const { getFamilyId } = useAuth();

  const { findPlatesPossibilityByFamily, platesPossibility} = useAlgorithm();

  useEffect(() => {
    (async () => {
      getPlates();
      findPlatesPossibilityByFamily(getFamilyId());
    })();
  }, []);


  return (
    <div className="">
      <Header />
      <div className="pl-8 pb-4  overflow-x-hidden">
        <div className="w-[36rem] flex flex-col gap-2">
          <h1 className="font-bold pt-4 text-red-500 text-4xl font-default ">
            Encontre sua receita favorita
          </h1>
          <div>
            <Input
              className=""
              label="Pesquise por Receitas"
              color="red"
              icon={<MagnifyingGlass />}
              crossOrigin={undefined}
            />
          </div>
        </div>

        <div className="flex flex-col items-start justify-center">
          {platesPossibility && platesPossibility.length ? (
            <div>
              {" "}
              <h2 className="text-xl text-yellow-500 font-default mt-4">
                <strong>Receitas Possiveis</strong>
              </h2>
            </div>
          ) : null}
            <div>
            {platesPossibility && platesPossibility.length > 0
              ? platesPossibility.map((plates, index) => (
                  // eslint-disable-next-line react/jsx-key
                  <div className="keen-slider__slide  mt-2 flex flex-col self-start rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 sm:shrink-0 sm:grow sm:basis-0">
                    <PlateItem
                      key={index}
                      img={plates.plate.image}
                      name={plates.plate.name}
                      id={plates.plate._id + ""}
                    />
                  </div>
                ))
              : null}
          </div>
          </div>
          <div className="flex flex-col items-start justify-center pt-2">
            {sobremesas && sobremesas.length > 0 ? (
              <div>
                {" "}
                <h2 className="text-xl text-yellow-500 font-default mt-4">
                  <strong>Sobremesas</strong>
                </h2>
              </div>
            ) : null}
            <div ref={sliderRefSobremesa} className="keen-slider flex">
              {sobremesas && sobremesas.length > 0
                ? sobremesas.map((sobremesa, index) => (
                    // eslint-disable-next-line react/jsx-key
                    <div className="keen-slider__slide  mt-2 flex flex-col self-start rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 sm:shrink-0 sm:grow sm:basis-0">
                      <PlateItem
                        key={index}
                        img={sobremesa.image}
                        name={sobremesa.name}
                        id={sobremesa.id ?? ""}
                      />
                    </div>
                  ))
                : null}
            </div>
          </div>
          <div className="flex flex-col items-start justify-center pt-2">
            {saladas && saladas.length > 0 ? (
              <div>
                {" "}
                <h2 className="text-xl text-yellow-500 font-default mt-4">
                  <strong>Saladas</strong>
                </h2>
              </div>
            ) : null}
            <div ref={sliderRefSalada} className="keen-slider flex">
              {saladas && saladas.length > 0
                ? saladas.map((salada, index) => (
                    // eslint-disable-next-line react/jsx-key
                    <div className="keen-slider__slide  mt-2 flex flex-col self-start rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 sm:shrink-0 sm:grow sm:basis-0">
                      <PlateItem
                        key={index}
                        img={salada.image}
                        name={salada.name}
                        id={salada.id ?? ""}
                      />
                    </div>
                  ))
                : null}
            </div>
          </div>

          <div className="flex flex-col items-start justify-center pt-2">
            {sopas && sopas.length > 0 ? (
              <div>
                {" "}
                <h2 className="text-xl text-yellow-500 font-default mt-4">
                  <strong>Sopas</strong>
                </h2>
              </div>
            ) : null}
            <div ref={sliderRefSopas} className="keen-slider flex">
              {sopas && sopas.length > 0
                ? sopas.map((sopa, index) => (
                    // eslint-disable-next-line react/jsx-key
                    <div className="keen-slider__slide  mt-2 flex flex-col self-start rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 sm:shrink-0 sm:grow sm:basis-0">
                      <PlateItem
                        key={index}
                        img={sopa.image}
                        name={sopa.name}
                        id={sopa.id + ""}
                      />
                    </div>
                  ))
                : null}
            </div>
          </div>
          <div className="flex flex-col items-start justify-center pt-2">
            {omeletes && omeletes.length > 0 ? (
              <div>
                {" "}
                <h2 className="text-xl text-yellow-500 font-default mt-4">
                  <strong>Omeletes</strong>
                </h2>
              </div>
            ) : null}
            <div ref={sliderRefOmeletes} className="keen-slider flex">
              {omeletes && omeletes.length > 0
                ? omeletes.map((omelete, index) => (
                    // eslint-disable-next-line react/jsx-key
                    <div className="keen-slider__slide  mt-2 flex flex-col self-start rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 sm:shrink-0 sm:grow sm:basis-0">
                      <PlateItem
                        key={index}
                        img={omelete.image}
                        name={omelete.name}
                        id={omelete.id + ""}
                      />
                    </div>
                  ))
                : null}
            </div>
          </div>
          <div className="flex flex-col items-start justify-center pt-2">
            {asiaticos && asiaticos.length > 0 ? (
              <div>
                {" "}
                <h2 className="text-xl text-yellow-500 font-default mt-4">
                  <strong>Pratos Asiáticos</strong>
                </h2>
              </div>
            ) : null}
            <div ref={sliderRefAsiatico} className="keen-slider flex">
              {asiaticos && asiaticos.length > 0
                ? asiaticos.map((asiatico, index) => (
                    // eslint-disable-next-line react/jsx-key
                    <div className="keen-slider__slide  mt-2 flex flex-col self-start rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 sm:shrink-0 sm:grow sm:basis-0">
                      <PlateItem
                        key={index}
                        img={asiatico.image}
                        name={asiatico.name}
                        id={asiatico.id + ""}
                      />
                    </div>
                  ))
                : null}
            </div>
          </div>
          <div className="flex flex-col items-start justify-center pt-2">
            {brasileiro && brasileiro.length > 0 ? (
              <div>
                {" "}
                <h2 className="text-xl text-yellow-500 font-default mt-4">
                  <strong>Pratos Brasileiros</strong>
                </h2>
              </div>
            ) : null}
            <div ref={sliderRefBrasileiro} className="keen-slider flex">
              {brasileiro && brasileiro.length > 0
                ? brasileiro.map((brasileiro, index) => (
                    // eslint-disable-next-line react/jsx-key
                    <div className="keen-slider__slide  mt-2 flex flex-col self-start rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 sm:shrink-0 sm:grow sm:basis-0">
                      <PlateItem
                        key={index}
                        img={brasileiro.image}
                        name={brasileiro.name}
                        id={brasileiro.id + ""}
                      />
                    </div>
                  ))
                : null}
            </div>
          </div>
          <div className="flex flex-col items-start justify-center pt-2">
            {risotos && risotos.length > 0 ? (
              <div>
                {" "}
                <h2 className="text-xl text-yellow-500 font-default mt-4">
                  <strong>Risotos</strong>
                </h2>
              </div>
            ) : null}
            <div ref={sliderRefRisotos} className="keen-slider flex">
              {risotos && risotos.length > 0
                ? risotos.map((risoto, index) => (
                    // eslint-disable-next-line react/jsx-key
                    <div className="keen-slider__slide  mt-2 flex flex-col self-start rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 sm:shrink-0 sm:grow sm:basis-0">
                      <PlateItem
                        key={index}
                        img={risoto.image}
                        name={risoto.name}
                        id={risoto.id + ""}
                      />
                    </div>
                  ))
                : null}
            </div>
          </div>
          <div ref={sliderRefFrangos} className="keen-slider flex">
            {frangos && frangos.length > 0
              ? frangos.map((frango, index) => (
                  // eslint-disable-next-line react/jsx-key
                  <div className="keen-slider__slide  mt-2 flex flex-col self-start rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 sm:shrink-0 sm:grow sm:basis-0">
                    <PlateItem
                      key={index}
                      img={frango.image}
                      name={frango.name}
                      id={frango.id + ""}
                    />
                  </div>
                ))
              : null}
          </div>
        <div className="flex flex-col items-start justify-center pt-2">
          {massas && massas.length > 0 ? (
            <div>
              {" "}
              <h2 className="text-xl text-yellow-500 font-default mt-4">
                <strong>Massas</strong>
              </h2>
            </div>
          ) : null}
          <div ref={sliderRefMassas} className="keen-slider flex">
            {massas && massas.length > 0
              ? massas.map((massa, index) => (
                  // eslint-disable-next-line react/jsx-key
                  <div className="keen-slider__slide  mt-2 flex flex-col self-start rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 sm:shrink-0 sm:grow sm:basis-0">
                    <PlateItem
                      key={index}
                      img={massa.image}
                      name={massa.name}
                      id={massa.id + ""}
                    />
                  </div>
                ))
              : null}
          </div>
        </div>
        <div className="flex flex-col items-start justify-center pt-2">
          {peixes && peixes.length > 0 ? (
            <div>
              {" "}
              <h2 className="text-xl text-yellow-500 font-default mt-4">
                <strong>Peixes</strong>
              </h2>
            </div>
          ) : null}
          <div ref={sliderRefPeixes} className="keen-slider flex">
            {peixes && peixes.length > 0
              ? peixes.map((peixe, index) => (
                  // eslint-disable-next-line react/jsx-key
                  <div className="keen-slider__slide  mt-2 flex flex-col self-start rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 sm:shrink-0 sm:grow sm:basis-0">
                    <PlateItem
                      key={index}
                      img={peixe.image}
                      name={peixe.name}
                      id={peixe.id + ""}
                    />
                  </div>
                ))
              : null}
          </div>
        </div>
        <div className="flex flex-col items-start justify-center pt-2">
          {pizzas && pizzas.length > 0 ? (
            <div>
              {" "}
              <h2 className="text-xl text-yellow-500 font-default mt-4">
                <strong>Pizzas</strong>
              </h2>
            </div>
          ) : null}
          <div ref={sliderRefPizzas} className="keen-slider flex">
            {pizzas && pizzas.length > 0
              ? pizzas.map((pizza, index) => (
                  // eslint-disable-next-line react/jsx-key
                  <div className="keen-slider__slide  mt-2 flex flex-col self-start rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 sm:shrink-0 sm:grow sm:basis-0">
                    <PlateItem
                      key={index}
                      img={pizza.image}
                      name={pizza.name}
                      id={pizza.id + ""}
                    />
                  </div>
                ))
              : null}
          </div>
        </div>
        <div className="flex flex-col items-start justify-center pt-2">
          {bebidas && bebidas.length > 0 ? (
            <div>
              {" "}
              <h2 className="text-xl text-yellow-500 font-default mt-4">
                <strong>Bebidas</strong>
              </h2>
            </div>
          ) : null}
          <div ref={sliderRefBebidas} className="keen-slider flex">
            {bebidas && bebidas.length > 0
              ? bebidas.map((bebida, index) => (
                  // eslint-disable-next-line react/jsx-key
                  <div className="keen-slider__slide  mt-2 flex flex-col self-start rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 sm:shrink-0 sm:grow sm:basis-0">
                    <PlateItem
                      key={index}
                      img={bebida.image}
                      name={bebida.name}
                      id={bebida.id + ""}
                    />
                  </div>
                ))
              : null}
          </div>
        </div>
        <div className="flex flex-col items-start justify-center pt-2">
          {aperitivos && aperitivos.length > 0 ? (
            <div>
              {" "}
              <h2 className="text-xl text-yellow-500 font-default mt-4">
                <strong>Aperitivos</strong>
              </h2>
            </div>
          ) : null}
          <div ref={sliderRefAperitivos} className="keen-slider flex">
            {aperitivos && aperitivos.length > 0
              ? aperitivos.map((aperitivo, index) => (
                  <div className="keen-slider__slide  mt-2 flex flex-col self-start rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 sm:shrink-0 sm:grow sm:basis-0">
                    <PlateItem
                      key={index}
                      img={aperitivo.image}
                      name={aperitivo.name}
                      id={aperitivo.id + ""}
                    />
                  </div>
                ))
              : null}
          </div>
        </div>
        <div className="flex flex-col items-start justify-center pt-2">
          {vegetarianas && vegetarianas.length > 0 ? (
            <div>
              {" "}
              <h2 className="text-xl text-yellow-500 font-default mt-4">
                <strong>Vegetarianas</strong>
              </h2>
            </div>
          ) : null}
          <div ref={sliderRefVegetarianas} className="keen-slider flex">
            {vegetarianas && vegetarianas.length > 0
              ? vegetarianas.map((vegetariana, index) => (
                  <div className="keen-slider__slide  mt-2 flex flex-col self-start rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 sm:shrink-0 sm:grow sm:basis-0">
                    <PlateItem
                      key={index}
                      img={vegetariana.image}
                      name={vegetariana.name}
                      id={vegetariana.id + ""}
                    />
                  </div>
                ))
              : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Plates;
