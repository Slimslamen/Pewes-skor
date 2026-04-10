import { type SchemaTypeDefinition } from "sanity";
import { homePage }      from "./homePage";
import { eccoBrandPage } from "./eccoBrandPage";
import { shoesPage }     from "./shoesPage";
import { shoeCarePage }  from "./shoeCarePage";
import { nyhetPost }     from "./nyhetPost";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [homePage, eccoBrandPage, shoesPage, shoeCarePage, nyhetPost],
};
