interface IPlate {
  id?: string;
  name: string;
  image: string;
  category: number;
  favorites: boolean;
  section: ISection;
}

interface ISection {
  ingredients: {
    ingredients_name: string;
    ingredients_quantity: number;
    ingredients_unit_measure: string;
    ingredients_category: number;
    ingredients_notes: string;
  }[];
  prepare_mode: [];
  extras: [];
}

export {type IPlate, type ISection}