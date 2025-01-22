import { BaseEntity } from '../../config/base.entity';

export class Order extends BaseEntity {
  instrumentId: number;
  userId: number;
  side: string;
  size: number;
  price: number;
  type: string;
  status: string;
  date: Date;

  constructor({
    id,
    instrumentId,
    userId,
    side,
    size,
    price,
    type,
    status,
    date,
  }: {
    id: number;
    instrumentId: number;
    userId: number;
    side: string;
    size: number;
    price: number;
    type: string;
    status: string;
    date: Date;
  }) {
    super(id);
    this.instrumentId = instrumentId;
    this.userId = userId;
    this.side = side;
    this.size = size;
    this.price = price;
    this.type = type;
    this.status = status;
    this.date = date;
  }
}
