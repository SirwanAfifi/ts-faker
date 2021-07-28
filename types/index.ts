export interface InterfaceMember {
  name: string;
  type: string;
}

export interface InterfaceTypeItem {
  itemName: string;
  members: InterfaceMember[];
}

export interface GeneratedType {
  name: string;
  data: DataItem[];
}

export type DataItem = Record<string, unknown>;

export enum MemberOtherDataType {
  USER_NAME = "USER_NAME",
  FIRST_NAME = "FIRST_NAME",
  FULL_NAME = "FULL_NAME",
  LAST_NAME = "LAST_NAME",
  PRICE = "PRICE",
  DESCRIPTION = "DESCRIPTION",
}

export enum MemberType {
  STRING = "string",
  NUMBER = "number",
  BOOLEAN = "boolean",
  DATE = "Date",
}
