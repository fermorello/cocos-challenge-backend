import { z, ZodTypeAny } from 'zod';
import { OrderSide, OrderType } from '../interfaces/order.interface';

export const createOrderSchema: any = z.object({
  userId: z
    .number({
      required_error: 'userId is required',
      invalid_type_error: 'userId must be a number',
    })
    .int()
    .positive(),
  instrumentId: z
    .number({
      required_error: 'instrumentId is required',
      invalid_type_error: 'instrumentId must be a number',
    })
    .int()
    .positive(),

  side: z.enum(
    [OrderSide.BUY, OrderSide.SELL, OrderSide.CASH_IN, OrderSide.CASH_OUT],
    {
      required_error: 'side is required',
      invalid_type_error: 'Invalid order side',
    }
  ),

  type: z.enum([OrderType.MARKET, OrderType.LIMIT], {
    required_error: 'type is required',
    invalid_type_error: 'Invalid order type',
  }),

  size: z.number().positive().optional(),
  amount: z.number().positive().optional(),
  price: z.number().positive().optional(),
});

export type CreateOrderDTO = z.infer<typeof createOrderSchema>;
