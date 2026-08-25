export class DateUtil {

    static format(date: Date): string {
        return date.toLocaleDateString("en-GB");
    }

}