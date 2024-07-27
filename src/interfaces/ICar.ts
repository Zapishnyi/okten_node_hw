export default interface ICar {
  _id?: string;
  brand: string;
  yearBuild: number;
  price: number;
  img: string;
  secondHand: boolean;
  ownerId: string;
  createdAt?: Date;
  updatedAt?: Date;
}
