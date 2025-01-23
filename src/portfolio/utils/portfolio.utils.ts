import { Order } from '../../orders/entities/order.entity';
import {
  OrderSide,
  OrderStatus,
} from '../../orders/interfaces/order.interface';

export function calculateAvailableCash(filledOrders: Order[]) {
  const cashInflows = filledOrders
    .filter(
      (order) =>
        order.side === OrderSide.CASH_IN || order.side === OrderSide.SELL
    )
    .reduce((sum, order) => sum + order.size * order.price, 0);

  const cashOutflows = filledOrders
    .filter(
      (order) =>
        order.side === OrderSide.CASH_OUT || order.side === OrderSide.BUY
    )
    .reduce((sum, order) => sum + order.size * order.price, 0);

  return cashInflows - cashOutflows;
}

export function groupOrdersByInstrument(orders: Order[]) {
  return orders.reduce((map, order) => {
    if (!map.has(order.instrumentId)) {
      map.set(order.instrumentId, []);
    }
    map.get(order.instrumentId).push(order);
    return map;
  }, new Map());
}

export function calculateNetQuantity(orders: Order[]) {
  return orders.reduce((net, order) => {
    if (order.status === OrderStatus.FILLED) {
      return net + (order.side === OrderSide.BUY ? order.size : -order.size);
    }
    return 0;
  }, 0);
}

export function calculatePerformance(orders: Order[], latestPrice: { instrumentId: number; open: number; close: number; }) {
  const buyOrders = orders.filter((o) => o.side === 'BUY');
  if (buyOrders.length === 0) return 0;

  const avgBuyPrice =
    buyOrders.reduce((sum, order) => sum + order.price * order.size, 0) /
    buyOrders.reduce((sum, order) => sum + order.size, 0);

  return ((latestPrice.close - avgBuyPrice) / avgBuyPrice) * 100;
}
