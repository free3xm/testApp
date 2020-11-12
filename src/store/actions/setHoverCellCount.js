import { HOVER_CELL_COUNT } from "../types";

export function setHoverCellCount(count) {
  return {
    type: HOVER_CELL_COUNT,
    count,
  };
}
