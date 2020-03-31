import React from "react";
import { Table } from "reactstrap";
import calcDeltaE from "../utils/calcDeltaE";

const DeltaETable = ({ items }) => {
  return (
    <Table size="sm" borderless>
      <thead>
        <tr>
          <th>Colors</th>
          <th>Delta E</th>
        </tr>
      </thead>
      <tbody>
        {items.map((hex1, idx) => {
          const hex2 = items[idx + 1];

          if (hex2) {
            return (
              <tr key={idx}>
                <td>
                  {hex1} - {hex2}
                </td>
                <td>{parseFloat(calcDeltaE(hex1, hex2)).toFixed(1)}%</td>
              </tr>
            );
          }

          return null;
        })}
      </tbody>
    </Table>
  );
};

export default DeltaETable;
