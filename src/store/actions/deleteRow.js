import { DELETE_ROW } from "../types";

export function deleteRow(rowIndex) {
  return {
    type: DELETE_ROW,
    rowIndex,
  };
}
