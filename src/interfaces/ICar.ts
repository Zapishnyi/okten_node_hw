export interface ICar {
  _id?: string;
  brand: string;
  yearBuild: number;
  price: number;
  img: string;
  secondHand: boolean;
  _ownerId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICarUpdated extends Required<ICar> {}
export interface ICarUpdate
  extends Partial<
    Omit<ICar, "updatedAt|" | "createdAt" | "_ownerId" | "_id">
  > {}
export interface ICarCreate
  extends Omit<ICar, "updatedAt|" | "createdAt" | "_ownerId" | "_id"> {}
