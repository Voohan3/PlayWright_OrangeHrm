import fs from "fs";

export class JsonUtil {
  static read(path: string) {
    return JSON.parse(fs.readFileSync(path, "utf8"));
  }
}
