import { DataType } from './data-type';

export interface IAutocompleteItem {
  type: DataType;
  data: unknown;
  selected?: boolean;
  image?: string;
  icon?: string;
  iconColor?: string;
  class?: string;
  background?: string;
  color?: string;
  valid?: boolean;
}
