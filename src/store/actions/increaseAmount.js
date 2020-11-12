import { INCREASE_AMOUNT } from "../types";

export function increaseAmount(cellId) {
  return {
    type: INCREASE_AMOUNT,
    id: cellId,
  };
}
