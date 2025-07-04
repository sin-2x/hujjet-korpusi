import type React from "react";

export const dataWithKey = <T>(
   source: { data?: T[]; searchData?: T[] },
   searchValue: string | null,
   keyField: keyof T
): (T & { key: React.Key })[] => {
   const list = searchValue ? source.searchData : source.data;
   if (!list) return [];

   return list.map((item) => ({
      ...item,
      key: item[keyField] as React.Key,
   }));
};
