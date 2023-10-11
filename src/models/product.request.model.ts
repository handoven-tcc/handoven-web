export class ProductRequest {
  constructor(
    public name: string,
    public type: string,
    public validity: string,
    public category: number,
    public cost: string,
    public amount: number,
    public unitMeasure: string,
    public familyId: string,
    public expiryProduct: boolean,
    public id?: string
  ) {}
}
