import {
  ADD_ROW,
  CREATE_TABLE,
  DELETE_ROW,
  HOVER_CELL_COUNT,
  INCREASE_AMOUNT,
} from "../types";
import { createRow } from "../../utils";

const initialState = {
  table: [],
  hoverCellCount: 0,
};

export function rootReducer(state = initialState, action) {
  let newTable;
  switch (action.type) {
    case CREATE_TABLE:
      return { ...state, table: action.table };
    case INCREASE_AMOUNT:
      newTable = state.table.map((row) =>
        row.map((cell) =>
          cell.id === action.id ? { ...cell, amount: cell.amount + 1 } : cell
        )
      );
      return { ...state, table: newTable };

    case HOVER_CELL_COUNT:
      return { ...state, hoverCellCount: action.count };
    case ADD_ROW:
      newTable = [...state.table, createRow(state.table[0].length)];
      return { ...state, table: newTable };
    case DELETE_ROW:
      newTable = state.table.filter((row, index) => index !== action.rowIndex);
      return { ...state, table: newTable };
    default:
      return state;
  }
}
