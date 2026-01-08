import type { FormDataSummary } from "../api/summary";

export interface PageableResponse {
  content: FormDataSummary[];
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