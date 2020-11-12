import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { createTable } from "../../store/actions/createTable";
import { setHoverCellCount } from "../../store/actions/setHoverCellCount";
import cls from "./Header.module.css";

function Header() {
  const dispatch = useDispatch();
  const [tableSize, setTableSize] = useState({ cols: 0, rows: 0 });

  const inputHandler = useCallback(
    (event) => {
      const value = Number(event.target.value);
      const newTableSize = { ...tableSize };
      if (Number.isNaN(value) || value < 0) {
        return false;
      }
      newTableSize[event.target.name] = value;
      return setTableSize(newTableSize);
    },
    [tableSize]
  );

  const hoverCellCountHandler = useCallback(
    (event) => {
      const value = Number(event.target.value);
      if (Number.isNaN(value) || value < 0) {
        return false;
      }
      return dispatch(setHoverCellCount(value));
    },
    [dispatch]
  );

  const createTableHandler = () => {
    dispatch(createTable(tableSize));
  };

  return (
    <header className={cls.header}>
      <div className={cls.inputBlock}>
        <input
          type="text"
          name="cols"
          id="cols"
          placeholder="Columns"
          className={cls.input}
          value={tableSize.cols}
          onChange={inputHandler}
        />
        <label className={cls.headerTitle} htmlFor="cols">
          Columns
        </label>
      </div>
      <div className={cls.inputBlock}>
        <input
          type="text"
          name="rows"
          id="rows"
          placeholder="Rows"
          className={cls.input}
          value={tableSize.rows}
          onChange={inputHandler}
        />
        <label className={cls.headerTitle} htmlFor="rows">
          Rows
        </label>
      </div>
      <button
        type="button"
        className={cls.headerBtn}
        onClick={createTableHandler}
      >
        Create Table
      </button>
      <div className={cls.inputBlock}>
        <input
          type="text"
          id="cellHover"
          placeholder="Cells to highlight"
          className={cls.input}
          onChange={hoverCellCountHandler}
        />
        <label className={cls.headerTitle} htmlFor="cellHover">
          Cells to highlight
        </label>
      </div>
    </header>
  );
}

export default React.memo(Header);
