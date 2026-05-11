export function formatLocalDate(date: any) {
  if (!Array.isArray(date)) return "";

  const [y, m, d] = date;

  const day = String(d).padStart(2, "0");
  const month = String(m).padStart(2, "0");

  return `${y}-${month}-${day}`;

  // if (!Array.isArray(date)) return "";

  // const [y, m, d] = date;
  // return new Date(y, m - 1, d).toLocaleDateString("en-US");
}

export const setBodyClass = (classes: string[]) => {
    document.body.className = "";
    classes.forEach(c => document.body.classList.add(c));
}
export const toggleBodyClass = (className: string) => {
    document.body.classList.toggle(className);
};

type CountryCities = {
  country: string;
  cities: string[];
};

export const countries: CountryCities[] = [
  {
    country: "Madagascar",
    cities: ["Antananarivo", "Toamasina", "Fianarantsoa"],
  },
  {
    country: "France",
    cities: ["Paris", "Lyon", "Marseille"],
  },
  {
    country: "USA",
    cities: ["New York", "Los Angeles", "Chicago"],
  },
];
