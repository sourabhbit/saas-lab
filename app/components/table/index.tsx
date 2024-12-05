import React, { useState } from "react";
import styles from "./table.module.css";
/* eslint-disable @typescript-eslint/no-explicit-any */
interface Column {
  key: string;
  header: string;
  render?: (value: any, row: any) => React.ReactNode;
}

interface TableProps {
  data: any[];
  columns: Array<Column>;
  recordLimit: number;
}

const PaginatedTable = ({ data, columns, recordLimit }: TableProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  const lastRecordIndex = currentPage * recordLimit;
  const firstRecordIndex = lastRecordIndex - recordLimit;
  const currentData = data.slice(firstRecordIndex, lastRecordIndex);

  const totalPages = Math.ceil(data.length / recordLimit);
  return (
    <>
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th key={index} className={styles.th}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentData.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={rowIndex % 2 === 0 ? styles.trEven : ""}
            >
              {columns.map((col, colIndex) => (
                <td key={colIndex} className={styles.td}>
                  {col.render ? col.render(row[col.key], row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.pagination}>
        <button
          className={`${styles.button} ${
            currentPage === 1 ? styles.buttonDisabled : ""
          }`}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          aria-label="previous"
        >
          Previous
        </button>
        <span>
          Page <b className={styles.lightText}>{currentPage}</b> of{" "}
          <b>{totalPages}</b>
        </span>
        <button
          className={`${styles.button} ${
            currentPage === totalPages ? styles.buttonDisabled : ""
          }`}
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          aria-label="next"
        >
          Next
        </button>
      </div>
    </>
  );
};

export default PaginatedTable;
