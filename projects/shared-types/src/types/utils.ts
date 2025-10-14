// @todo the idea is to be able to type this to disallow keys that are not part of the generic but not sure how
// @todo to do that so keeping this here until I do as once I can, the change only has to happen here
export type RequestStructure<TData> = TData;

export type ResponseMeta = {
  current_page?: number;
  total_page_count?: number;
  total_item_count?: number;
  items_per_page?: number;
  prev_cursor?: string;
  next_cursor?: string;
  request_id?: string;

  // this is generic so we need to allow any type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

export type ResponseError = {
  message: string;
  meta?: ResponseMeta;
};

export type ResponseStructure<TData> = {
  data?: TData;
  meta?: ResponseMeta;
  error?: ResponseError;
};
