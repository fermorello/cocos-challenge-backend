import { BaseEntity } from "../../config/base.entity";

export class Instrument extends BaseEntity {
  ticker: string;
  name: string;
  type: string;

  constructor({
    id,
    ticker,
    name,
    type,
  }: {
    id: string | number;
    ticker: string;
    name: string;
    type: string;
  }) {
    super(id);
    this.ticker = ticker;
    this.name = name;
    this.type = type;
  }
}
