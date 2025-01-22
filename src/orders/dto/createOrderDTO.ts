export class CreateOrderDTO {
  instrumentId!: number;
  userId!: number;
  side!: string;
  size!: number;
  price!: number;
  type!: string;
  status!: string;
  date!: Date;
}
