import fs from 'fs';
import isEmpty from '../../utils/isEmpty';
import DatabaseError from './DatabaseError';
import { DatabaseEntry, DatabaseOperatorObject, DatabaseQuery, DatabaseFindResponse } from './Types';

class Driver {
  private rootFolder: string;
  private validOperators: string[];

  constructor(folderName: string) {
    this.rootFolder = folderName;
    this.validOperators = ['$gt', '$gte', '$lt', '$lte'];
  }

  public find(query: DatabaseQuery, databaseName: string, onlyOne: boolean = false): DatabaseFindResponse {
    if(isEmpty(query)) return { result: [], error: null };
    if(!fs.existsSync(`${this.rootFolder}/${databaseName}`)) return { result: [], error: new DatabaseError(`Not found. There is no table with the name: ${databaseName}.`) };

    let fileNames: string[] = fs.readdirSync(
      `${this.rootFolder}/${databaseName}`
    );

    let schema: {[key: string]: string | number | boolean } = JSON.parse(
      fs.readFileSync(`${this.rootFolder}/${databaseName}/schema.json`, {
        encoding: 'utf-8'
      })
    );

    let [validQuery, invalidKey] = this.checkQuery(schema, query);
    if(!validQuery) return { result: [], error: new DatabaseError(`Unknown key. ${invalidKey} does not exist in the schema of ${databaseName}.`) };

    let indexOfSchema: number = fileNames.indexOf('schema.json');
    fileNames.splice(indexOfSchema, 1);

    let matches: DatabaseEntry[] = [];
    for(let i: number = 0; i < fileNames.length; i++) {
      let fileName = fileNames[i];
      let entry: DatabaseEntry = JSON.parse(
        fs.readFileSync(`${this.rootFolder}/${databaseName}/${fileName}`, { encoding: 'utf-8' })
      );
      
      let match: boolean = this.compare(entry, query);
      if(match) {
        matches.push(entry);
        if(onlyOne) return { result: matches, error: null };
      }
    }

    return {
      result: matches,
      error: null
    };
  }

  private compare(entry: DatabaseEntry, query: DatabaseQuery): boolean {
    let queryKeys: string[] = Object.keys(query);

    for(let i: number; i < queryKeys.length; i++) {
      let currentKey: string = queryKeys[i];
      if(typeof query[currentKey] !== 'object') {
        if(query[currentKey] !== entry[currentKey]) return false;
      } else {
        // @ts-ignore
        let operatorObject: DatabaseOperatorObject = query[currentKey];
        if(this.checkOperators(operatorObject)) return false;

        let operatorNames: string[] = Object.keys(operatorObject);
        for(let j: number = 0; j < operatorNames.length; j++) {
          let operatorName: string = operatorNames[i];
          let operationValue: string | number | boolean = operatorObject[operatorName];

          switch(operatorName) {
            case '$gt':
              if (!(entry[currentKey] > operationValue)) return false;
              break;
            case '$gte':
              if (!(entry[currentKey] >= operationValue)) return false;
              break;
            case '$lt':
              if (!(entry[currentKey] < operationValue)) return false;
              break;
            case '$lte':
              if (!(entry[currentKey] <= operationValue)) return false;
              break;
          }
        }
      }
    }
    return true;
  }

  public checkQuery(schema: {[key: string]: string | number | boolean }, query: DatabaseQuery): [boolean, string] {
    let validKeys: string[] = Object.keys(schema);
    let givenKeys: string[] = Object.keys(query);

    for(let i: number = 0; i < givenKeys.length; i++) {
      if(validKeys.indexOf(givenKeys[i]) === -1) return [false, givenKeys[i]];
    }

    return [true, '']
  }

  public checkOperators(operatorObject: DatabaseOperatorObject): boolean {
    let operatorNames: string[] = Object.keys(operatorObject);
    for(let i: number = 0; i < operatorNames.length; i++) {
      if(this.validOperators.indexOf(operatorNames[i]) === -1) return false;
    }
    return true;
  }
};

export default Driver;