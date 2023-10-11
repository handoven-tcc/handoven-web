interface IProduct {
  id?: string;
  name: string;
  type: string;
  validity: string;
  category: number;
  cost: string;
  amount: number;
  unitMeasure: string;
  familyId: string;
  expiryProduct: boolean;
}

export {type IProduct}