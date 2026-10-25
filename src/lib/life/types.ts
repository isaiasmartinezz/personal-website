// Hand-written mirror of schema/published-item.schema.json (schemaVersion 1).
// The schema is the source of truth; validation happens in schema/validate.mjs.

export type LifeType = "journal" | "place" | "film" | "trip" | "hike" | "recipe" | "collection_entry";
export type Tier = "public" | "friends";

export type Photo = { path: string; width: number; height: number; alt: string };
export type Location = { name: string; city?: string; lat: number; lng: number };

export type JournalData = { weekNumber: number; kind: "recap" | "essay"; coverPhoto?: string };
export type PlaceData = { cuisine: string; priceLevel: number; visitDates: string[]; dishes: string[]; destinationId?: string };
export type FilmData = { year: number; director: string; posterPath: string; watchedDate: string; rewatch: boolean; letterboxdUrl?: string };
export type TripData = {
  destination: string;
  startDate: string;
  endDate: string;
  days: { label?: string; stops: { name: string; note?: string }[] }[];
};
export type HikeData = {
  trailName: string;
  distanceKm: number;
  elevationGainM: number;
  durationMin: number;
  trackGeoJson?: { type: "LineString"; coordinates: number[][] };
};
export type RecipeData = {
  kind: "meal" | "creami";
  servings: number;
  proteinPerServing: number;
  ingredients: { item: string; quantity?: string }[];
  steps: string[];
};
export type CollectionEntryData = { collection: "board-games" | "cheeses"; status: "played" | "tried" | "owned" };

export type DataByType = {
  journal: JournalData;
  place: PlaceData;
  film: FilmData;
  trip: TripData;
  hike: HikeData;
  recipe: RecipeData;
  collection_entry: CollectionEntryData;
};

type Envelope = {
  schemaVersion: 1;
  id: string;
  tier: Tier;
  slug: string;
  title: string;
  date: string;
  updatedAt: string;
  body: string;
  rating?: number;
  sourceRating?: string;
  tags: string[];
  location?: Location;
  photos: Photo[];
  provenance?: { source: "letterboxd" | "beli" | "strava" | "gpx" | "manual"; sourceUrl?: string };
};

export type PublishedItem<T extends LifeType = LifeType> = {
  [K in T]: Envelope & { type: K; data: DataByType[K] };
}[T];
