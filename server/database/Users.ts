import Low, { LowdbSync } from "lowdb";
import LowFile from "lowdb/adapters/FileSync";
import * as uuid from "uuid";

export interface User {
  username: string;
  id: string;
}

export interface Users {
  users: User[];
}

class UsersDB {
  private readonly db: LowdbSync<Users>;

  constructor() {
    const adapter = new LowFile<Users>("db.json");
    this.db = Low(adapter);
    this.db.defaults({ users: [] }).write();
  }

  public createUser(username: string) {
    const lookUpuser = this.db.get("users").find({ username }).value();

    if (lookUpuser) {
      throw new Error("Username already exists");
    }

    const user = { username, id: uuid.v4() };
    this.db.get("users").push(user).write();
    return user;
  }

  public getUser(username: string) {
    const user = this.db.get("users").find({ username }).value();
    return user;
  }
}

export default UsersDB;
