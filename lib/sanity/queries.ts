const photosProjection = `photos[]{ _key, alt, caption, "image": @, "hotspot": hotspot{ x, y } }`;

const realisationProjection = `{
  _id,
  title,
  location,
  isExample,
  "category": category->{ title, "slug": slug.current },
  ${photosProjection}
}`;

export const categoriesQuery = `*[_type == "category"] | order(order asc) {
  _id,
  title,
  "slug": slug.current
}`;

export const realisationsQuery = `*[_type == "realisation" && defined(category) && count(photos) > 0] | order(date desc) ${realisationProjection}`;

const cardImageProjection = `select(defined(image.asset) => image{ alt, "image": @, "hotspot": hotspot{ x, y } })`;

const cardProjection = (field: string) => `${field}{ title, tag, description, "image": ${cardImageProjection} }`;

export const homePageQuery = `*[_id == "homePage"][0] {
  "creation": ${cardProjection("creationCard")},
  "elagage": ${cardProjection("elagageCard")},
  "abattage": ${cardProjection("abattageCard")},
  "haies": ${cardProjection("haiesCard")},
  "galleryPreview": galleryPreview[defined(photo.asset)]{ _key, title, subtitle, isExample, "alt": photo.alt, "image": photo, "hotspot": photo.hotspot{ x, y } }
}`;
