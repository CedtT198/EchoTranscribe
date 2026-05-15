import type { Summary } from "../api/summary";

const MAX_VISIBLE_PAGES = 4;

export const endPage = (totalPages: number, page:number) => {
  return Math.min(totalPages,  startPage(page) + MAX_VISIBLE_PAGES);
};

export const startPage = (page: number) => {
  return Math.max(0, page - Math.floor(MAX_VISIBLE_PAGES / 2));
}


export interface PageableResponse {
  content: Summary[];
  pageable: {
    page_number: number;
    page_size: number;
    offset: number;
    paged: boolean;
  };
  total_elements: number;
  total_pages: number;
  last: boolean;
  first: boolean;
  number: number;
  size: number;
  number_of_elements: number;
  empty: boolean;
}