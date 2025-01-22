import { BaseEntity } from '../../config/base.entity';

export class MarketData extends BaseEntity {
  instrumentId: number;
  high: number;
  low: number;
  open: number;
  close: number;
  previousClose: number;
  date: Date;

  constructor({
    id,
    instrumentId,
    high,
    low,
    open,
    close,
    previousClose,
    date,
  }: {
    id: number;
    instrumentId: number;
    high: number;
    low: number;
    open: number;
    close: number;
    previousClose: number;
    date: Date;
  }) {
    super(id);
    this.instrumentId = instrumentId;
    this.high = high;
    this.low = low;
    this.open = open;
    this.close = close;
    this.previousClose = previousClose;
    this.date = date;
  }
}
