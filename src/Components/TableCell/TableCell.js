import React from "react";
import cls from "./TableCell.module.css";
import PropTypes from "prop-types";

function TableCell({
  cell,
  isHoverRow,
  rowSum,
  increaseAmount,
  setHoverCellHandler,
  isHoverCell,
}) {
  const classes = [cls.cell];
  if (isHoverCell) classes.push(cls.cellHover);
  const increaseAmountHandler = () => increaseAmount(cell.id);
  const onEnterHoverCellHandler = () => setHoverCellHandler(cell);
  const onLeaveHoverCellHandler = () => setHoverCellHandler(null);

  let content = cell.amount;
  if (isHoverRow) {
    const rowSumPercent = `${Math.round((cell.amount / rowSum) * 100)}%`;
    content = (
      <>
        <div
          className={cls.cellInfo}
          style={{
            height: rowSumPercent,
          }}
        />
        {rowSumPercent}
      </>
    );
  }

  return (
    <td
      className={classes.join(" ")}
      onClick={increaseAmountHandler}
      onMouseEnter={onEnterHoverCellHandler}
      onMouseLeave={onLeaveHoverCellHandler}
      role="gridcell"
    >
      {content}
    </td>
  );
}

TableCell.propTypes = {
  cell: PropTypes.shape({
    id: PropTypes.number,
    amount: PropTypes.number,
  }).isRequired,
  isHoverRow: PropTypes.bool.isRequired,
  rowSum: PropTypes.number.isRequired,
  increaseAmount: PropTypes.func.isRequired,
  setHoverCellHandler: PropTypes.func.isRequired,
  isHoverCell: PropTypes.bool.isRequired,
};

export default React.memo(TableCell);
