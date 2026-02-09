import * as fs from "fs";
import { parseArgs } from "util";
import { validatePizza } from "./index.js";

const { values } = parseArgs({
  options: { file: { type: "string", short: "f" } },
});

if (values.file) {
  try {
    const data = JSON.parse(fs.readFileSync(values.file, "utf8"));
    const result = validatePizza(data);

    if (result.isPizza) {
      console.log("Success:", result.pizza);
    } else {
      console.log("Errors:", result.errors);
    }
  } catch (e) {
    console.log("File error or invalid JSON");
    console.log(e);
  }
}
