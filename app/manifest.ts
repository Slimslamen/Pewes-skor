import { type MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name:             "Pewes Skor i Anderstorp AB",
    short_name:       "Pewes Skor",
    description:      "Familjens skoaffär i Anderstorp sedan generationer. ECCO, Rieker, Gabor, Skechers och Dolomite.",
    start_url:        "/",
    display:          "browser",
    background_color: "#f8f9fa",
    theme_color:      "#725a39",
    lang:             "sv",
    icons: [
      {
        src:   "/favicon.ico",
        sizes: "any",
        type:  "image/x-icon",
      },
    ],
  };
}
