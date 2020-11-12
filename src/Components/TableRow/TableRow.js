import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import TableCell from "../TableCell/TableCell";
import cls from "./TableRow.module.css";

function TableRow({
  row,
  rowIndex,
  deleteRow,
  increaseAmount,
  setHoverCellHandler,
  cellsToHover,
}) {
  const [isHoverRow, setIsHoverRow] = useState(false);
  const rowSum = useMemo(
    () => row.reduce((acc, cell) => acc + cell.amount, 0),
    [row]
  );
  const deleteRowHandler = () => deleteRow(rowIndex);
  const onEnterHandler = () => setIsHoverRow(true);
  const onLeaveHandler = () => setIsHoverRow(false);

  const memoRow = useMemo(
    () =>
      row.map((cell) => (
        <TableCell
          key={cell.id}
          cell={cell}
          increaseAmount={increaseAmount}
          isHoverRow={isHoverRow}
          rowSum={rowSum}
          setHoverCellHandler={setHoverCellHandler}
          isHoverCell={cellsToHover.includes(cell.id)}
        />
      )),
    [row, isHoverRow, rowSum, increaseAmount, setHoverCellHandler, cellsToHover]
  );
  return (
    <tr>
      {memoRow}
      <td
        onMouseEnter={onEnterHandler}
        onMouseLeave={onLeaveHandler}
        className={cls.rowSum}
        title="Row sum"
      >
        {rowSum}
        <button
          type="button"
          onClick={deleteRowHandler}
          title="Delete row"
          className={cls.deleteRow}
        >
          <span className="material-icons">delete</span>
        </button>
      </td>
    </tr>
  );
}

TableRow.propTypes = {
  row: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      amount: PropTypes.number,
    })
  ).isRequired,
  rowIndex: PropTypes.number.isRequired,
  deleteRow: PropTypes.func.isRequired,
  increaseAmount: PropTypes.func.isRequired,
  setHoverCellHandler: PropTypes.func.isRequired,
  cellsToHover: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default React.memo(TableRow);
