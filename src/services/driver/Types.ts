import DatabaseError from "./DatabaseError";

export interface DatabaseEntry {
  [key: string]: string | number | boolean;
}

export interface DatabaseFindResponse {
  result: DatabaseEntry[];
  error: DatabaseError | null;
}

export interface DatabaseInsertResponse {
  success: boolean;
  error: DatabaseError | null;
}

export interface DatabaseOperatorObject {
  [key: string]: string | number | boolean;
}

export interface DatabaseQuery {
  [key: string]: string | number | boolean | DatabaseOperatorObject;
}

export interface DatabaseSchemaProperties {
  type: string;
  unique?: string;
  default?: string;
}
export interface DatabaseSchema {
  [key: string]: DatabaseSchemaProperties;
}
