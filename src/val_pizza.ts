import { validatePizza } from "./index.js";

const result = validatePizza({ hehehehaw: true });
// there should be no typescript errors below
if (result.isPizza) {
  console.log(result.pizza.crust);
} else {
  console.log(result.errors);
}
