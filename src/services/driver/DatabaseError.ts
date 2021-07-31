class DatabaseError {
  public description: string;
  public date: number;

  constructor(description: string) {
    this.description = description;
    this.date = Date.now();
  }

  toString() {
    return JSON.stringify(this);
  }
}

export default DatabaseError;
