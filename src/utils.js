export function getAverageOfColumns(table) {
  if (table.length < 1) return [];
  return table[0].map((_, index) =>
    Math.round(
      table.reduce((avr, row) => avr + row[index].amount, 0) / table.length
    )
  );
}

let id = 1;

function createCell() {
  return {
    id: id++,
    amount: Math.floor(100 + Math.random() * 900),
  };
}
export function createRow(length = 0) {
  return new Array(length).fill(0).map(createCell);
}

export function getClosestCells(table, hoverCell, count) {
  const closestCells = [];

  if(!hoverCell || !count) return closestCells;
  
  for (const row of table) {
    for (const cell of row) {
      if (cell.id === hoverCell.id) continue;
      const diff = Math.abs(cell.amount - hoverCell.amount);
      const newElem = {
        id: cell.id,
        diff,
      };
      closestCells.push(newElem);
    }
  }

  closestCells.sort((a, b) => a.diff - b.diff);
  closestCells.length = count;
  return closestCells.map((cell) => cell.id);
}
