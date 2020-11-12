import React, { useCallback, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import TableRow from "../../Components/TableRow/TableRow";
import { increaseAmount } from "../../store/actions/increaseAmount";
import { deleteRow } from "../../store/actions/deleteRow";
import { addRow } from "../../store/actions/addRow";
import { getAverageOfColumns, getClosestCells } from "../../utils";
import cls from "./Table.module.css";

function Table() {
  const dispatch = useDispatch();
  const table = useSelector((state) => state.table);
  const [hoverCell, setHoverCell] = useState(null);
  const countCellsToHover = useSelector((state) => state.hoverCellCount);
  const averageColumnsAmount = useMemo(() => getAverageOfColumns(table), [
    table,
  ]);
  const dispatchIncreaseAmount = useCallback(
    (cellId, rowIndex) => dispatch(increaseAmount(cellId, rowIndex)),
    [dispatch]
  );

  const dispatchDeleteRow = useCallback(
    (rowIndex) => dispatch(deleteRow(rowIndex)),
    [dispatch]
  );

  const cellsToHover = useMemo(() => {
    return getClosestCells(table, hoverCell, countCellsToHover);
  }, [hoverCell, countCellsToHover, table]);

  const setHoverCellHandler = useCallback(
    (cell) => {
      if (!countCellsToHover) return;
      setHoverCell(cell);
    },
    [countCellsToHover]
  );

  const addRowHandler = useCallback(() => dispatch(addRow()), [dispatch]);

  const memoTable = useMemo(
    () =>
      table.map((row, index) => (
        <TableRow
          key={Math.random()}
          row={row}
          rowIndex={index}
          deleteRow={dispatchDeleteRow}
          increaseAmount={dispatchIncreaseAmount}
          setHoverCellHandler={setHoverCellHandler}
          cellsToHover={cellsToHover}
        />
      )),
    [
      table,
      dispatchIncreaseAmount,
      dispatchDeleteRow,
      cellsToHover,
      setHoverCellHandler,
    ]
  );
  const memoAdditionalCells = useMemo(
    () => (
      <tr>
        {averageColumnsAmount.map((amount) => (
          <td key={amount + Math.random()} title="Average of columns">
            {amount}
          </td>
        ))}
        {averageColumnsAmount.length ? (
          <td>
            <button
              type="button"
              onClick={addRowHandler}
              title="Add row"
              className={cls.addRow}
            >
              <span className="material-icons">library_add</span>
            </button>
          </td>
        ) : null}
      </tr>
    ),
    [averageColumnsAmount, addRowHandler]
  );
  return (
    <div className={cls.tableRoot}>
      <div className={cls.tableContainer}>
        <table className={cls.table}>
          <tbody>
            {memoTable}
            {memoAdditionalCells}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default React.memo(Table);
