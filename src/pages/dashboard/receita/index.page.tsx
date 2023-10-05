"use client";
import { Button, Card, CardBody, Input } from "@material-tailwind/react";
import Image from "next/image";
import { ArrowRight, Heart, MagnifyingGlass } from "phosphor-react";
import brigadeiro from "../../../assets/receitas/bem_casado.jpeg";
import salgado from "../../../assets/receitas/salgado.jpeg";
import { Header } from "../../../components/Header";
import { useKeenSlider } from "keen-slider/react";

export default function ReceitaPage() {
  const [sliderRefDoce] = useKeenSlider({
    loop: false,
    slides: {
      perView: 7,
      spacing: 10,
    },
  });
  const [sliderRefSalgado] = useKeenSlider({
    slides: {
      perView: 7,
      spacing: 10,
    },
  });

  return (
    <div className="">
      <Header />
      <div className="pl-8 pb-4  overflow-x-hidden">
        <div className="w-[36rem] flex flex-col gap-2">
          <h1 className="font-bold pt-4 text-red-500 text-4xl font-default ">
            Encontre sua receita favorita
          </h1>
          <Input
            className=" "
            label="Pesquise por Receitas"
            color="red"
            icon={<MagnifyingGlass />}
          />
        </div>
        <div className="flex flex-col items-start justify-center">
          <div>
            {" "}
            <h2 className="text-xl text-yellow-500 font-default mt-4">
              <strong>Doces</strong>
            </h2>
          </div>
          <div ref={sliderRefDoce} className="keen-slider flex">
            <div className="keen-slider__slide  mt-2 flex flex-col self-start rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 sm:shrink-0 sm:grow sm:basis-0">
              <a href="#!">
                <Image
                  className="rounded-t-lg w-auto"
                  src={brigadeiro}
                  width={200}
                  alt=""
                />
              </a>
              <div className="absolute top-32 pl-2">
                <h5 className="text-bold text-xl text-white">
                  <strong>Bem Passado</strong>
                </h5>
              </div>
              <div className="flex justify-between">
                <div className="flex gap-1 items-center p-2 ">
                  <Heart size={32} color="#d40b03" /> 24
                </div>
                <div className="flex p-2">
                  <a href="#buttons-with-link">
                    <Button
                      variant="gradient"
                      color="red"
                      className="flex items-center shadow-lg justify-center gap-1"
                    >
                      Detalhes <ArrowRight size={22} color="#fff" />
                    </Button>
                  </a>
                </div>
              </div>
            </div>
            <div className="keen-slider__slide  mt-2 flex flex-col self-start rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 sm:shrink-0 sm:grow sm:basis-0">
              <a href="#!">
                <Image
                  className="rounded-t-lg w-auto"
                  src={brigadeiro}
                  width={200}
                  alt=""
                />
              </a>
              <div className="absolute top-32 pl-2">
                <h5 className="text-bold text-xl text-white">
                  <strong>Bem Passado</strong>
                </h5>
              </div>
              <div className="flex justify-between">
                <div className="flex gap-1 items-center p-2 ">
                  <Heart size={32} color="#d40b03" /> 24
                </div>
                <div className="flex p-2">
                  <a href="#buttons-with-link">
                    <Button
                      variant="gradient"
                      color="red"
                      className="flex items-center shadow-lg justify-center gap-1"
                    >
                      Detalhes <ArrowRight size={22} color="#fff" />
                    </Button>
                  </a>
                </div>
              </div>
            </div>
            <div className="keen-slider__slide  mt-2 flex flex-col self-start rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 sm:shrink-0 sm:grow sm:basis-0">
              <a href="#!">
                <Image
                  className="rounded-t-lg w-auto"
                  src={brigadeiro}
                  width={200}
                  alt=""
                />
              </a>
              <div className="absolute top-32 pl-2">
                <h5 className="text-bold text-xl text-white">
                  <strong>Bem Passado</strong>
                </h5>
              </div>
              <div className="flex justify-between">
                <div className="flex gap-1 items-center p-2 ">
                  <Heart size={32} color="#d40b03" /> 24
                </div>
                <div className="flex p-2">
                  <a href="#buttons-with-link">
                    <Button
                      variant="gradient"
                      color="red"
                      className="flex items-center shadow-lg justify-center gap-1"
                    >
                      Detalhes <ArrowRight size={22} color="#fff" />
                    </Button>
                  </a>
                </div>
              </div>
            </div>
            <div className="keen-slider__slide  mt-2 flex flex-col self-start rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 sm:shrink-0 sm:grow sm:basis-0">
              <a href="#!">
                <Image
                  className="rounded-t-lg w-auto"
                  src={brigadeiro}
                  width={200}
                  alt=""
                />
              </a>
              <div className="absolute top-32 pl-2">
                <h5 className="text-bold text-xl text-white">
                  <strong>Bem Passado</strong>
                </h5>
              </div>
              <div className="flex justify-between">
                <div className="flex gap-1 items-center p-2 ">
                  <Heart size={32} color="#d40b03" /> 24
                </div>
                <div className="flex p-2">
                  <a href="#buttons-with-link">
                    <Button
                      variant="gradient"
                      color="red"
                      className="flex items-center shadow-lg justify-center gap-1"
                    >
                      Detalhes <ArrowRight size={22} color="#fff" />
                    </Button>
                  </a>
                </div>
              </div>
            </div>
            <div className="keen-slider__slide  mt-2 flex flex-col self-start rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 sm:shrink-0 sm:grow sm:basis-0">
              <a href="#!">
                <Image
                  className="rounded-t-lg w-auto"
                  src={brigadeiro}
                  width={200}
                  alt=""
                />
              </a>
              <div className="absolute top-32 pl-2">
                <h5 className="text-bold text-xl text-white">
                  <strong>Bem Passado</strong>
                </h5>
              </div>
              <div className="flex justify-between">
                <div className="flex gap-1 items-center p-2 ">
                  <Heart size={32} color="#d40b03" /> 24
                </div>
                <div className="flex p-2">
                  <a href="#buttons-with-link">
                    <Button
                      variant="gradient"
                      color="red"
                      className="flex items-center shadow-lg justify-center gap-1"
                    >
                      Detalhes <ArrowRight size={22} color="#fff" />
                    </Button>
                  </a>
                </div>
              </div>
            </div>
            <div className="keen-slider__slide  mt-2 flex flex-col self-start rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 sm:shrink-0 sm:grow sm:basis-0">
              <a href="#!">
                <Image
                  className="rounded-t-lg w-auto"
                  src={brigadeiro}
                  width={200}
                  alt=""
                />
              </a>
              <div className="absolute top-32 pl-2">
                <h5 className="text-bold text-xl text-white">
                  <strong>Bem Passado</strong>
                </h5>
              </div>
              <div className="flex justify-between">
                <div className="flex gap-1 items-center p-2 ">
                  <Heart size={32} color="#d40b03" /> 24
                </div>
                <div className="flex p-2">
                  <a href="#buttons-with-link">
                    <Button
                      variant="gradient"
                      color="red"
                      className="flex items-center shadow-lg justify-center gap-1"
                    >
                      Detalhes <ArrowRight size={22} color="#fff" />
                    </Button>
                  </a>
                </div>
              </div>
            </div>
            <div className="keen-slider__slide  mt-2 flex flex-col self-start rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 sm:shrink-0 sm:grow sm:basis-0">
              <a href="#!">
                <Image
                  className="rounded-t-lg w-auto"
                  src={brigadeiro}
                  width={200}
                  alt=""
                />
              </a>
              <div className="absolute top-32 pl-2">
                <h5 className="text-bold text-xl text-white">
                  <strong>Bem Passado</strong>
                </h5>
              </div>
              <div className="flex justify-between">
                <div className="flex gap-1 items-center p-2 ">
                  <Heart size={32} color="#d40b03" /> 24
                </div>
                <div className="flex p-2">
                  <a href="#buttons-with-link">
                    <Button
                      variant="gradient"
                      color="red"
                      className="flex items-center shadow-lg justify-center gap-1"
                    >
                      Detalhes <ArrowRight size={22} color="#fff" />
                    </Button>
                  </a>
                </div>
              </div>
            </div>
            <div className="keen-slider__slide  mt-2 flex flex-col self-start rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 sm:shrink-0 sm:grow sm:basis-0">
              <a href="#!">
                <Image
                  className="rounded-t-lg w-auto"
                  src={brigadeiro}
                  width={200}
                  alt=""
                />
              </a>
              <div className="absolute top-36 pl-2">
                <h5 className="text-bold text-xl text-white">
                  <strong>Bem Passado</strong>
                </h5>
              </div>
              <div className="flex justify-between">
                <div className="flex gap-1 items-center p-2 ">
                  <Heart size={32} color="#d40b03" /> 24
                </div>
                <div className="flex p-2">
                  <a href="#buttons-with-link">
                    <Button
                      variant="gradient"
                      color="red"
                      className="flex items-center justify-center gap-1"
                    >
                      Detalhes <ArrowRight size={22} color="#fff" />
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start justify-center pt-2">
            <div>
              {" "}
              <h2 className="text-xl text-yellow-500 font-default mt-4">
                <strong>Salgado</strong>
              </h2>
            </div>
            <div ref={sliderRefSalgado} className="keen-slider flex">
              <div className="keen-slider__slide  mt-2 flex flex-col self-start rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 sm:shrink-0 sm:grow sm:basis-0">
                <a href="#!">
                  <Image
                    className="rounded-t-lg w-auto"
                    src={salgado}
                    width={200}
                    alt=""
                  />
                </a>
                <div className="absolute top-32 pl-2">
                  <h5 className="text-bold text-xl text-white">
                    <strong>Bem Passado</strong>
                  </h5>
                </div>
                <div className="flex justify-between">
                  <div className="flex gap-1 items-center p-2 ">
                    <Heart size={32} color="#d40b03" /> 24
                  </div>
                  <div className="flex p-2">
                    <a href="#buttons-with-link">
                      <Button
                        variant="gradient"
                        color="red"
                        className="flex items-center shadow-lg justify-center gap-1"
                      >
                        Detalhes <ArrowRight size={22} color="#fff" />
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
              <div className="keen-slider__slide  mt-2 flex flex-col self-start rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 sm:shrink-0 sm:grow sm:basis-0">
                <a href="#!">
                  <Image
                    className="rounded-t-lg w-auto"
                    src={salgado}
                    width={200}
                    alt=""
                  />
                </a>
                <div className="absolute top-32 pl-2">
                  <h5 className="text-bold text-xl text-white">
                    <strong>Bem Passado</strong>
                  </h5>
                </div>
                <div className="flex justify-between">
                  <div className="flex gap-1 items-center p-2 ">
                    <Heart size={32} color="#d40b03" /> 24
                  </div>
                  <div className="flex p-2">
                    <a href="#buttons-with-link">
                      <Button
                        variant="gradient"
                        color="red"
                        className="flex items-center shadow-lg justify-center gap-1"
                      >
                        Detalhes <ArrowRight size={22} color="#fff" />
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
              <div className="keen-slider__slide  mt-2 flex flex-col self-start rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 sm:shrink-0 sm:grow sm:basis-0">
                <a href="#!">
                  <Image
                    className="rounded-t-lg w-auto"
                    src={salgado}
                    width={200}
                    alt=""
                  />
                </a>
                <div className="absolute top-32 pl-2">
                  <h5 className="text-bold text-xl text-white">
                    <strong>Bem Passado</strong>
                  </h5>
                </div>
                <div className="flex justify-between">
                  <div className="flex gap-1 items-center p-2 ">
                    <Heart size={32} color="#d40b03" /> 24
                  </div>
                  <div className="flex p-2">
                    <a href="#buttons-with-link">
                      <Button
                        variant="gradient"
                        color="red"
                        className="flex items-center shadow-lg justify-center gap-1"
                      >
                        Detalhes <ArrowRight size={22} color="#fff" />
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
              <div className="keen-slider__slide  mt-2 flex flex-col self-start rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 sm:shrink-0 sm:grow sm:basis-0">
                <a href="#!">
                  <Image
                    className="rounded-t-lg w-auto"
                    src={salgado}
                    width={200}
                    alt=""
                  />
                </a>
                <div className="absolute top-32 pl-2">
                  <h5 className="text-bold text-xl text-white">
                    <strong>Bem Passado</strong>
                  </h5>
                </div>
                <div className="flex justify-between">
                  <div className="flex gap-1 items-center p-2 ">
                    <Heart size={32} color="#d40b03" /> 24
                  </div>
                  <div className="flex p-2">
                    <a href="#buttons-with-link">
                      <Button
                        variant="gradient"
                        color="red"
                        className="flex items-center shadow-lg justify-center gap-1"
                      >
                        Detalhes <ArrowRight size={22} color="#fff" />
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
              <div className="keen-slider__slide  mt-2 flex flex-col self-start rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 sm:shrink-0 sm:grow sm:basis-0">
                <a href="#!">
                  <Image
                    className="rounded-t-lg w-auto"
                    src={salgado}
                    width={200}
                    alt=""
                  />
                </a>
                <div className="absolute top-32 pl-2">
                  <h5 className="text-bold text-xl text-white">
                    <strong>Bem Passado</strong>
                  </h5>
                </div>
                <div className="flex justify-between">
                  <div className="flex gap-1 items-center p-2 ">
                    <Heart size={32} color="#d40b03" /> 24
                  </div>
                  <div className="flex p-2">
                    <a href="#buttons-with-link">
                      <Button
                        variant="gradient"
                        color="red"
                        className="flex items-center shadow-lg justify-center gap-1"
                      >
                        Detalhes <ArrowRight size={22} color="#fff" />
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
              <div className="keen-slider__slide  mt-2 flex flex-col self-start rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 sm:shrink-0 sm:grow sm:basis-0">
                <a href="#!">
                  <Image
                    className="rounded-t-lg w-auto"
                    src={brigadeiro}
                    width={200}
                    alt=""
                  />
                </a>
                <div className="absolute top-32 pl-2">
                  <h5 className="text-bold text-xl text-white">
                    <strong>Bem Passado</strong>
                  </h5>
                </div>
                <div className="flex justify-between">
                  <div className="flex gap-1 items-center p-2 ">
                    <Heart size={32} color="#d40b03" /> 24
                  </div>
                  <div className="flex p-2">
                    <a href="#buttons-with-link">
                      <Button
                        variant="gradient"
                        color="red"
                        className="flex items-center shadow-lg justify-center gap-1"
                      >
                        Detalhes <ArrowRight size={22} color="#fff" />
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
              <div className="keen-slider__slide  mt-2 flex flex-col self-start rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 sm:shrink-0 sm:grow sm:basis-0">
                <a href="#!">
                  <Image
                    className="rounded-t-lg w-auto"
                    src={salgado}
                    width={200}
                    alt=""
                  />
                </a>
                <div className="absolute top-32 pl-2">
                  <h5 className="text-bold text-xl text-white">
                    <strong>Bem Passado</strong>
                  </h5>
                </div>
                <div className="flex justify-between">
                  <div className="flex gap-1 items-center p-2 ">
                    <Heart size={32} color="#d40b03" /> 24
                  </div>
                  <div className="flex p-2">
                    <a href="#buttons-with-link">
                      <Button
                        variant="gradient"
                        color="red"
                        className="flex items-center shadow-lg justify-center gap-1"
                      >
                        Detalhes <ArrowRight size={22} color="#fff" />
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
              <div className="keen-slider__slide  mt-2 flex flex-col self-start rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 sm:shrink-0 sm:grow sm:basis-0">
                <a href="#!">
                  <Image
                    className="rounded-t-lg w-auto"
                    src={salgado}
                    width={200}
                    alt=""
                  />
                </a>
                <div className="absolute top-36 pl-2">
                  <h5 className="text-bold text-xl text-white">
                    <strong>Bem Passado</strong>
                  </h5>
                </div>
                <div className="flex justify-between">
                  <div className="flex gap-1 items-center p-2 ">
                    <Heart size={32} color="#d40b03" /> 24
                  </div>
                  <div className="flex p-2">
                    <a href="#buttons-with-link">
                      <Button
                        variant="gradient"
                        color="red"
                        className="flex items-center justify-center gap-1"
                      >
                        Detalhes <ArrowRight size={22} color="#fff" />
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
