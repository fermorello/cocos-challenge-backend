export interface Portfolio {
    totalValue: number;
    availableCash: number;
    positions: Position[];
  }
  
  export interface Position {
    instrumentId: number;
    ticker: string;
    name: string;
    quantity: number;
    totalValue: number;
    performance: number;
  }
  
  export interface IPortfolioService {
    getUserPortfolio(userId: number): Promise<Portfolio>;
  }