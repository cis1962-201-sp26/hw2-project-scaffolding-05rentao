import { validatePizza } from "./index.js";

const valid1 = {
  size: 6,
  crust: "normal",
  isDeepDish: true,
  toppings: ["pineapple"],
};

test("valid1", () => {
  const results = validatePizza(valid1);
  expect(results.isPizza).toBe(true);
  if (results.isPizza) {
    const { size, crust, isDeepDish, toppings } = results.pizza;
    expect(size).toBe(6);
    expect(crust).toBe("normal");
    expect(isDeepDish).toBe(true);
    expect(toppings).toContain("pineapple");
    expect(toppings.length).toBe(1);
  }
});

const valid2 = {
  valid: true,
  size: 1,
  crust: "stuffed",
  // "isDeepDish": (optional defaults to false)
  toppings: [],
};

test("valid2 - defaults check", () => {
  const results = validatePizza(valid2);
  expect(results.isPizza).toBe(true);

  if (results.isPizza) {
    const { isDeepDish, toppings, size } = results.pizza;
    expect(size).toBe(1);
    // These should be filled in by Zod defaults
    expect(isDeepDish).toBe(false);
    expect(Array.isArray(toppings)).toBe(true);
    expect(toppings.length).toBe(0);
  }
});

test("invalid - forbidden toppings", () => {
  const cursedPizza = {
    size: 12,
    crust: "normal",
    toppings: ["pineapple", "squirrel"],
  };

  const results = validatePizza(cursedPizza);
  expect(results.isPizza).toBe(false);

  if (!results.isPizza) {
    // Check that Zod returned an error
    expect(results.errors).toBeDefined();
    console.log(results.errors.issues[0].code);
    // expect(results.errors.issues[0].code).toBe("custom");
  }
});

test("invalid - wrong crust and missing size", () => {
  const badPizza = {
    crust: "2",
    isDeepDish: true,
    // size
  };

  const results = validatePizza(badPizza);
  expect(results.isPizza).toBe(false);

  if (!results.isPizza) {
    const errorMessages = results.errors.flatten().fieldErrors;
    expect(errorMessages.crust).toBeDefined();
    expect(errorMessages.size).toBeDefined();
  }
});

test("valid - minimal pizza", () => {
  const minimal = {
    size: 10,
    crust: "stuffed",
  };

  const results = validatePizza(minimal);
  expect(results.isPizza).toBe(true);
  if (results.isPizza) {
    expect(results.pizza.toppings).toEqual([]);
    expect(results.pizza.isDeepDish).toBe(false);
  }
});

test("valid - extra field", () => {
  const minimal = {
    valid: true,
    size: 10,
    crust: "stuffed",
  };

  const results = validatePizza(minimal);
  expect(results.isPizza).toBe(true);
  if (results.isPizza) {
    expect(results.pizza.toppings).toEqual([]);
    expect(results.pizza.isDeepDish).toBe(false);
  }
});

/*
const Pizza = z.object({ 
  size: z.number(),  //diameter in inches
  crust: z.enum(["stuffed", "normal"]),  //either stuffed or normal
  isDeepDish: z.optional(z.boolean()).default(false),  // by default should be false (non-deep dish)
  toppings: z.optional(
    z.array(z.string()).refine(
      (tops: string[]) => !tops.some(t => forbidden_toppings.includes(t)))
  ).default([]), //should include only valid toppings. You should choose at least 4 toppings that should never go on pizza. 
});
*/
