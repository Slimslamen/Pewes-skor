import { type SchemaTypeDefinition } from "sanity";
import { homePage }      from "./homePage";
import { eccoBrandPage } from "./eccoBrandPage";
import { shoesPage }     from "./shoesPage";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [homePage, eccoBrandPage, shoesPage],
};
