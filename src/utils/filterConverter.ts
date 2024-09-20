import { Op } from "sequelize";

export const convertFilterOperators = (filters: any) => {
  const convertedFilters: any = {};
  for (const key in filters) {
    if (typeof filters[key] === "object") {
      const filterKey = Object.keys(filters[key])[0];
      const filterValue = filters[key][filterKey];

      if (filterKey === "$ilike") {
        convertedFilters[key] = { [Op.iLike]: filterValue };
      } else if (filterKey === "$like") {
        convertedFilters[key] = { [Op.like]: filterValue };
      }
    } else {
      convertedFilters[key] = filters[key];
    }
  }
  return convertedFilters;
};
