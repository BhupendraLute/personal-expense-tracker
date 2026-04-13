import { parse } from "csv-parse/sync";
import { stringify } from "csv-stringify/sync";

export type CsvExpenseRow = {
  amount: string;
  category: string;
  note: string;
  date: string;
};

export const parseExpenseCsv = (content: string) => {
  return parse(content, {
    columns: true,
    skip_empty_lines: true,
    trim: true
  }) as CsvExpenseRow[];
};

export const generateExpenseCsv = (rows: CsvExpenseRow[]) =>
  stringify(rows, {
    header: true,
    columns: ["amount", "category", "note", "date"]
  });
