// index.ts

import { z } from "zod";

const forbiddenToppings = ["squirrel", "Towne 100", "President Xi", "Pizza"];

const Pizza = z.object({
  size: z.number(), //diameter in inches
  crust: z.enum(["stuffed", "normal"]), //either stuffed or normal
  isDeepDish: z.optional(z.boolean()).default(false), // by default should be false (non-deep dish)
  toppings: z
    .optional(
      z
        .array(z.string())
        .refine((tops: string[]) => !tops.some((t) => forbiddenToppings.includes(t))),
    )
    .default([]), //should include only valid toppings. You should choose at least 4 toppings that should never go on pizza.
});

type ValidationResult = { isPizza: true; pizza: any } | { isPizza: false; errors: any };

export function validatePizza(p: any): ValidationResult {
  let result = Pizza.safeParse(p);
  let pizza: ValidationResult;
  if (!result.success) {
    pizza = {
      isPizza: false,
      errors: result.error,
    };
  } else {
    pizza = {
      isPizza: true,
      pizza: result.data,
    };
  }
  return pizza;
}
