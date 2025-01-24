import { z, ZodTypeAny } from 'zod';

export const OrderSide = {
  BUY: 'BUY',
  SELL: 'SELL',
  CASH_IN: 'CASH_IN',
  CASH_OUT: 'CASH_OUT',
} as const;

export const OrderType = {
  MARKET: 'MARKET',
  LIMIT: 'LIMIT',
} as const;

export const createOrderSchema: any = z
  .object({
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
  })
  .refine((data) => data.size || data.amount, {
    message: 'Either size or amount must be provided',
    path: ['size'],
  })
  .refine(
    (data) => {
      if (data.type === OrderType.LIMIT) {
        return data.price !== undefined;
      }
      return true;
    },
    {
      message: 'Price is required for LIMIT orders',
      path: ['price'],
    }
  );

export type CreateOrderDTO = z.infer<typeof createOrderSchema>;
