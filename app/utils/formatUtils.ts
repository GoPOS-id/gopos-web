interface IFormat {
  date: string;
  locale?: string;
  format?: Intl.DateTimeFormatOptions;
}

export const formatDate = ({ date, format = { year: "numeric", month: "short", day: "numeric" }, locale = "en-US" }: IFormat): string => {
  const originalDate = new Date(date);
  const formattedDate: string = originalDate.toLocaleDateString(locale, format);

  return formattedDate;
};

export const formatNumber = (inputString: string): string => {
  const formattedNumber = Number(inputString).toLocaleString("en-US");

  return formattedNumber;
};
