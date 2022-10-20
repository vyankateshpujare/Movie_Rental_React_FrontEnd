import React from "react";
import {TiArrowSortedUp,TiArrowSortedDown}  from "react-icons/ti"

const TableHeader = (props) => {
  const { columns, onSort, sortColumn } = props;
  //   console.log(columns)
  const raiseSort = (column) => {
    const newSortColumn = { ...sortColumn };
    if (sortColumn.path === column.path) {
      if (sortColumn.order === 1) {
        newSortColumn.order = -1;
      } else {
        newSortColumn.order = 1;
      }
    } else {
      newSortColumn.path = column.path;
      newSortColumn.order = 1;
    }
    onSort(newSortColumn);
  };
  const displaySortIcon = (column) => {
    if (sortColumn.path !== column.path) return null;
    return sortColumn.order == 1 ? (
      <TiArrowSortedUp />
    ) : (
      <TiArrowSortedDown />
    );
  };
  return (
    <thead className="shadow-sm bg-light">
      <tr>
        {columns.map((c) => (
          <th
            key={c.path || c.key}
            onClick={() => raiseSort(c)}
            style={{ cursor: "pointer" }}
          >
            {c.header}{" "}
            {displaySortIcon(c)}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
