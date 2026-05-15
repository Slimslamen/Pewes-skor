import { type SchemaTypeDefinition } from "sanity";
import { homePage }      from "./homePage";
import { eccoBrandPage } from "./eccoBrandPage";
import { shoesPage }     from "./shoesPage";
import { shoeCarePage }  from "./shoeCarePage";
import { nyhetPost }     from "./nyhetPost";
import { brandPage }     from "./brandPage";
import { siteSettings }  from "./siteSettings";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [homePage, eccoBrandPage, shoesPage, shoeCarePage, nyhetPost, brandPage, siteSettings],
};
