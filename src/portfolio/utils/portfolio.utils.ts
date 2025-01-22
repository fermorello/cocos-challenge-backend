import { Order } from "../../orders/entities/order.entity";
import { OrderSide } from "../../orders/interfaces/order.interface";

export function calculateAvailableCash(filledOrders: Order[]) {
    const cashInflows = filledOrders
    .filter((order) => order.side === OrderSide.CASH_IN || order.side === OrderSide.SELL)
    .reduce((sum, order) => sum + order.size * order.price, 0);

  const cashOutflows = filledOrders
    .filter((order) => order.side === OrderSide.CASH_OUT || order.side === OrderSide.BUY)
    .reduce((sum, order) => sum + order.size * order.price, 0);

  return cashInflows - cashOutflows;
}

