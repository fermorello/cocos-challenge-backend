import { z } from 'zod';

export const cancelOrderSchema: any = z.object({
  userId: z
    .number({
      required_error: 'userId is required',
      invalid_type_error: 'userId must be a number',
    })
    .int()
    .positive(),
  orderId: z
    .number({
      required_error: 'orderId is required',
      invalid_type_error: 'orderId must be a number',
    })
    .int()
    .positive(),
});

export type CancelOrderDTO = z.infer<typeof cancelOrderSchema>;
