import type {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Innehåll')
    .items([
      // ── Startsida (singleton) ──────────────────────────────────────
      S.listItem()
        .title('Startsida')
        .id('homePage')
        .child(S.document().schemaType('homePage').documentId('homePage')),

      S.divider(),

      // ── Varumärken ─────────────────────────────────────────────────
      S.listItem()
        .title('Varumärken')
        .child(
          S.list()
            .title('Varumärken')
            .items([
              S.listItem()
                .title('ECCO')
                .id('eccoBrandPage')
                .child(
                  S.document()
                    .schemaType('eccoBrandPage')
                    .documentId('eccoBrandPage'),
                ),
              S.divider(),
              S.documentTypeListItem('brandPage').title('Varumärkessidor'),
            ]),
        ),

      S.divider(),

      // ── Skor (kategorisidor) ───────────────────────────────────────
      S.listItem()
        .title('Skor')
        .child(S.documentTypeList('shoesPage').title('Sko-kategorisidor')),

      S.divider(),

      // ── Nyheter ────────────────────────────────────────────────────
      S.listItem()
        .title('Nyheter')
        .child(S.documentTypeList('nyhetPost').title('Nyheter')),

      S.divider(),

      // ── Skovård (singleton) ────────────────────────────────────────
      S.listItem()
        .title('Skovård')
        .id('shoeCarePage')
        .child(
          S.document().schemaType('shoeCarePage').documentId('shoeCarePage'),
        ),
    ])
