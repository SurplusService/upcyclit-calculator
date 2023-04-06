import Airtable from "airtable";

export interface OptionItem {
  id: number;
  name: string;
  industry: string;
  type: string;
  carbon_footprint: number;
  energy_consumption: number;
  methane_production: number;
}

export interface ModifierItem {
  id: number;
  name: string;
  label: string;
}

const base = new Airtable({
  apiKey: process.env.REACT_APP_AIRTABLE_API_KEY,
}).base(process.env.REACT_APP_AIRTABLE_BASE_ID);

let categories: OptionItem[] = [];

export const init = () =>
  new Promise((resolve, reject) => {
    base(process.env.REACT_APP_AIRTABLE_TABLE_ID)
      .select({ view: "Grid view" })
      .all()
      .then((records) => {
        categories = records.map((record) => {
          return {
            id: record.get("ID") as number,
            name: record.get("Catagories ") as string,
            industry: record.get("Industry ") as string,
            type: record.get("Type ") as string,
            carbon_footprint: record.get(
              "Carbon Footprint (kg C02e)"
            ) as number,
            energy_consumption: record.get(
              "Energy Consumption (kWh)"
            ) as number,
            methane_production: record.get(
              "Methane Production (kg CH4)"
            ) as number,
          };
        });
        resolve(null);
      });
  });

const modifiers: ModifierItem[] = [
  { id: 0, name: "Quantity", label: "x" },
  { id: 1, name: "Weight (lbs)", label: "lb(s)" },
  { id: 2, name: "Gaylords", label: "gaylord(s)" },
];

export const getCategories = () => {
  return categories;
};

export const getCategory = (id: number) => {
  const item = categories.find((category) => category.id === id);
  if (!item) {
    throw new Error(`Category with id ${id} not found`);
  }
  return item;
};

export const getModifier = (id: number) => {
  const item = modifiers.find((modifier) => modifier.id === id);
  if (!item) {
    throw new Error(`Modifier with id ${id} not found`);
  }
  return item;
};

export const getModifiers = () => {
  return modifiers;
};
