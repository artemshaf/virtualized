export interface Parameters {
  dataset: string;
  rows: number;
  start: number;
  sort: string[];
  facet: string[];
  format: string;
  timezone: string;
}

export interface Fields {
  coordinates: number[];
  cou_name_en: string;
  label_en: string;
  feature_code: string;
  population: number;
  dem: number;
  geoname_id: string;
  name: string;
  ascii_name: string;
  alternate_names: string;
  admin1_code: string;
  feature_class: string;
  country_code: string;
  timezone: string;
  modification_date: string;
  country_code_2: string;
  admin2_code: string;
  admin4_code: string;
  admin3_code: string;
}

export interface Geometry {
  type: string;
  coordinates: number[];
}

export interface CityRecord {
  datasetid: string;
  recordid: string;
  fields: Fields;
  geometry: Geometry;
  record_timestamp: Date;
}

export interface Facet {
  name: string;
  count: number;
  state: string;
  path: string;
}

export interface FacetGroup {
  name: string;
  facets: Facet[];
}

export interface CitiesResponse {
  nhits: number;
  parameters: Parameters;
  records: CityRecord[];
  facet_groups: FacetGroup[];
}
