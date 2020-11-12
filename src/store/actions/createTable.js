import { CREATE_TABLE } from "../types";
import {createRow} from "../../utils";

export function createTable({ rows, cols }) {
  const table = [];
  for (let i = 0; i < rows; i++) {
    table.push(createRow(cols));
  }
  return { type: CREATE_TABLE, table };
}
