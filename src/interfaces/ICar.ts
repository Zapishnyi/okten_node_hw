export default interface ICar {
  id?: string;
  brand: string;
  yearBuild: number;
  price: number;
  img: string;
  secondHand: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
