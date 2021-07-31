import DatabaseError from './DatabaseError';

export interface DatabaseEntry {
  [key: string]: string | number | boolean
}

export interface DatabaseFindResponse {
  result: DatabaseEntry[],
  error: DatabaseError | null
}

export interface DatabaseOperatorObject {
  '$gt'?: string | number | boolean,
  '$gte'?: string | number | boolean,
  '$lt'?: string | number | boolean,
  '$lte'?: string | number | boolean,
}

export interface DatabaseQuery {
  [key: string]: string | number | boolean | DatabaseOperatorObject
}