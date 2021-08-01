import fs from "fs";
import isEmpty from "../../utils/isEmpty";
import DatabaseError from "./DatabaseError";
import {
  DatabaseEntry,
  DatabaseOperatorObject,
  DatabaseQuery,
  DatabaseFindResponse,
  DatabaseInsertResponse,
  DatabaseSchema,
  DatabaseUpdateResponse,
  DatabaseDeleteEntryResponse,
  DatabaseDropTableResponse,
} from "./Types";

class Driver {
  private rootFolder: string;
  private validOperators: string[];

  constructor(folderName: string) {
    this.rootFolder = folderName;
    this.validOperators = ["$gt", "$gte", "$lt", "$lte"];
  }

  public find(
    query: DatabaseQuery,
    databaseName: string,
    onlyOne: boolean = false
  ): DatabaseFindResponse {
    if (isEmpty(query)) return { result: [], error: null };
    if (!fs.existsSync(`${this.rootFolder}/${databaseName}`))
      return {
        result: [],
        error: new DatabaseError(
          `Not found. There is no table with the name: ${databaseName}.`
        ),
      };

    let fileNames: string[] = fs.readdirSync(
      `${this.rootFolder}/${databaseName}`
    );

    let schema: { [key: string]: string | number | boolean } = JSON.parse(
      fs.readFileSync(`${this.rootFolder}/${databaseName}/schema.json`, {
        encoding: "utf-8",
      })
    );

    let [validQuery, invalidKey] = this.checkQuery(schema, query);
    if (!validQuery)
      return {
        result: [],
        error: new DatabaseError(
          `Unknown key. ${invalidKey} does not exist in the schema of ${databaseName}.`
        ),
      };

    let indexOfSchema: number = fileNames.indexOf("schema.json");
    fileNames.splice(indexOfSchema, 1);

    let matches: DatabaseEntry[] = [];
    for (let i: number = 0; i < fileNames.length; i++) {
      let fileName = fileNames[i];
      let entry: DatabaseEntry = JSON.parse(
        fs.readFileSync(`${this.rootFolder}/${databaseName}/${fileName}`, {
          encoding: "utf-8",
        })
      );

      let match: boolean = this.compare(entry, query);
      if (match) {
        matches.push(entry);
        if (onlyOne) return { result: matches, error: null };
      }
    }

    return {
      result: matches,
      error: null,
    };
  }

  private compare(entry: DatabaseEntry, query: DatabaseQuery): boolean {
    let queryKeys: string[] = Object.keys(query);

    for (let i: number = 0; i < queryKeys.length; i++) {
      let currentKey: string = queryKeys[i];
      if (typeof query[currentKey] !== "object") {
        if (query[currentKey] !== entry[currentKey]) return false;
      } else {
        // @ts-ignore
        let operatorObject: DatabaseOperatorObject = query[currentKey];
        if (this.checkOperators(operatorObject)) return false;

        let operatorNames: string[] = Object.keys(operatorObject);
        for (let j: number = 0; j < operatorNames.length; j++) {
          let operatorName: string = operatorNames[i];
          let operationValue: string | number | boolean =
            operatorObject[operatorName]!;

          switch (operatorName) {
            case "$gt":
              if (!(entry[currentKey] > operationValue)) return false;
              break;
            case "$gte":
              if (!(entry[currentKey] >= operationValue)) return false;
              break;
            case "$lt":
              if (!(entry[currentKey] < operationValue)) return false;
              break;
            case "$lte":
              if (!(entry[currentKey] <= operationValue)) return false;
              break;
          }
        }
      }
    }
    return true;
  }

  public checkQuery(
    schema: DatabaseSchema | DatabaseQuery,
    query: DatabaseQuery
  ): [boolean, string] {
    let validKeys: string[] = Object.keys(schema);
    let givenKeys: string[] = Object.keys(query);

    for (let i: number = 0; i < givenKeys.length; i++) {
      if (validKeys.indexOf(givenKeys[i]) === -1) return [false, givenKeys[i]];
    }

    return [true, ""];
  }

  public checkOperators(operatorObject: DatabaseOperatorObject): boolean {
    let operatorNames: string[] = Object.keys(operatorObject);
    for (let i: number = 0; i < operatorNames.length; i++) {
      if (this.validOperators.indexOf(operatorNames[i]) === -1) return false;
    }
    return true;
  }

  public insert(
    data: DatabaseEntry,
    databaseName: string
  ): DatabaseInsertResponse {
    let schema: DatabaseSchema = JSON.parse(
      fs.readFileSync(`${this.rootFolder}/${databaseName}/schema.json`, {
        encoding: "utf-8",
      })
    );

    let dataKeys: string[] = Object.keys(data);
    let schemaKeys: string[] = Object.keys(schema);

    for (let i: number = 0; i < dataKeys.length; i++) {
      let currentKey: string = dataKeys[i];
      if (schemaKeys.indexOf(currentKey) === -1)
        return {
          success: false,
          error: new DatabaseError(
            `Unknown key. ${currentKey} does not exist in the schema of ${databaseName}`
          ),
        };
      if (typeof data[currentKey] !== schema[currentKey].type)
        return {
          success: false,
          error: new DatabaseError(
            `Type error. Expected ${
              schema[currentKey].type
            } for ${currentKey} got ${typeof data[currentKey]} instead.`
          ),
        };
      if (schema[currentKey].unique === "true") {
        let query: any = {};
        query[currentKey] = data[currentKey];
        let { result } = this.find(query, databaseName, true);

        if (result.length >= 1)
          return {
            success: false,
            error: new DatabaseError(
              `Insertion prevented. ${currentKey} was specified to be unique. Found entry with same value in the document with the id: ${result[0].id}.`
            ),
          };
      }
    }

    let entries: string[] = fs.readdirSync(
      `${this.rootFolder}/${databaseName}`
    );
    let objectId: string = `_${Date.now()}${entries.length}`;

    data["_id"] = objectId;

    dataKeys = Object.keys(data);

    let missingKeys: string[] = [];
    for (let i: number = 0; i < schemaKeys.length; i++) {
      let currentKey: string = schemaKeys[i];
      if (dataKeys.indexOf(currentKey) === -1) {
        missingKeys.push(currentKey);
      }
    }

    missingKeys.forEach((key) => {
      if ("default" in schema[key]) {
        data[key] = schema[key].default!;
      } else {
        let type = schema[key].type;
        switch (type) {
          case "string":
            data[key] = "";
            break;
          case "number":
            data[key] = 0;
            break;
          case "boolean":
            data[key] = true;
            break;
        }
      }
    });

    fs.writeFileSync(
      `${this.rootFolder}/${databaseName}/${objectId}.json`,
      JSON.stringify(data)
    );

    return { success: true, error: null };
  }

  public update(
    query: DatabaseQuery,
    update: DatabaseEntry,
    databaseName: string
  ): DatabaseUpdateResponse {
    if (isEmpty(query)) return { success: true, error: null };

    let schema: DatabaseSchema = JSON.parse(
      fs.readFileSync(`${this.rootFolder}/${databaseName}/schema.json`, {
        encoding: "utf-8",
      })
    );

    let { result, error } = this.find(query, databaseName, true);
    if (error) return { success: false, error: error };

    let match = result[0];
    if (!match)
      return {
        success: false,
        error: new DatabaseError(
          `No match found. There is no entry matching the query therefore no update was performed.`
        ),
      };
    let [validUpdate, invalidKey] = this.checkQuery(schema, update);

    let objectId: string | number | boolean = result[0]["_id"];

    if (validUpdate) {
      let updateKeys: string[] = Object.keys(update);
      let currentKey: string;
      for (let i: number = 0; i < updateKeys.length; i++) {
        currentKey = updateKeys[i];
        if (currentKey !== "_id") match[currentKey] = update[currentKey];
      }

      fs.writeFileSync(
        `${this.rootFolder}/${databaseName}/${objectId}.json`,
        JSON.stringify(match)
      );
      return { success: true, error: null };
    } else {
      return {
        success: false,
        error: new DatabaseError(
          `Unknown key. ${invalidKey} does not exist in the schema of ${databaseName}`
        ),
      };
    }
  }

  public deleteEntry(
    query: DatabaseQuery,
    databaseName: string
  ): DatabaseDeleteEntryResponse {
    let { result, error } = this.find(query, databaseName, true);
    if (error) return { success: false, error: error };
    if (!isEmpty(result)) {
      fs.unlinkSync(`${this.rootFolder}/${databaseName}/${result[0]._id}.json`);
    }
    return { success: true, error: null };
  }

  public dropTable(tableName: string): DatabaseDropTableResponse {
    if(fs.existsSync(`${this.rootFolder}/${tableName}`)) {
      fs.rmdirSync(`${this.rootFolder}/${tableName}`);
      return { success: true, error: null };
    } else {
      return { success: false, error: new DatabaseError(`Table not found. There is no table named ${tableName} in the database.`) }
    }
  }
}

export default Driver;
