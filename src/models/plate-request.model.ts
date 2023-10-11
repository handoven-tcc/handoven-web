import { ISection } from "../types";

export class PlateRequest {
  constructor(
    public name: string,
    public image: string,
    public category: number,
    public favorites: boolean,
    public section: ISection,
    public id?: string
  ) {}
}
