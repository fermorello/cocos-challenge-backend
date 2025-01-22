export class CreateMarketDataDTO {
    instrumentId!: number;
    high!: number;
    low!: number;
    open!: number;
    close!: number;
    previousClose!: number;
    date!: Date;
}