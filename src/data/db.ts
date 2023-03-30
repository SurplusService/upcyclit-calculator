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

const categories: OptionItem[] = require("./categories.json");
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
