export class RandomDataUtil {
  static randomNumber(length: number) {
    return Math.random()

      .toString()

      .substring(2, 2 + length);
  }

  static randomEmail() {
    return `user${Date.now()}@gmail.com`;
  }

  static randomString(length: number) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    let value = "";

    for (let i = 0; i < length; i++) {
      value += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return value;
  }
}
