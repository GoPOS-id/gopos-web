export class FormDataUtils {
  static convertToString(value: string | FormDataEntryValue | null | undefined | number): string {
    return value as string;
  }

  static convertToNumber(value: string | FormDataEntryValue | null | undefined | number): number {
    return +value!;
  }

  static convertToBool(value: string | FormDataEntryValue | null | undefined | number): boolean {
    return value === "true" ? true : false;
  }

  static convertToNumbers(value: string | FormDataEntryValue | null | undefined | number): number[] {
    return (value as String).split(",").filter(Boolean).map(Number) ?? [];
  }
}
