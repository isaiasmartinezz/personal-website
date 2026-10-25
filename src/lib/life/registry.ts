import type { LifeType } from "./types";

export type TypeInfo = {
  type: LifeType;
  /** URL segment, e.g. /films */
  segment: string;
  label: string;
  singular: string;
  blurb: string;
};

// Order = order in the nav and on the home page.
export const TYPES: TypeInfo[] = [
  { type: "journal", segment: "journal", label: "Journal", singular: "Journal entry", blurb: "Weekly recaps and the occasional essay." },
  { type: "place", segment: "places", label: "Places", singular: "Place", blurb: "Restaurants and spots, mapped." },
  { type: "film", segment: "films", label: "Films", singular: "Film", blurb: "What I watched and what I thought." },
  { type: "trip", segment: "trips", label: "Trips", singular: "Trip", blurb: "Itineraries from the road." },
  { type: "hike", segment: "hikes", label: "Hikes", singular: "Hike", blurb: "Trails, distance and elevation." },
  { type: "recipe", segment: "recipes", label: "Recipes", singular: "Recipe", blurb: "Meals and Creami experiments." },
  { type: "collection_entry", segment: "collections", label: "Collections", singular: "Collection entry", blurb: "Board games and cheeses." },
];

export const typeBySegment = (segment: string) => TYPES.find((t) => t.segment === segment);
export const typeInfo = (type: LifeType) => TYPES.find((t) => t.type === type)!;
