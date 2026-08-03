import { formatCurrency } from "../../utils/formatCurrency.js";

const defaultColumns = [
  {
    key: "year",
    label: "Год",
    format: "text",
  },
  {
    key: "openingLiability",
    label: "Начальный остаток",
    format: "currency",
  },
  {
    key: "interestExpense",
    label: "Проценты",
    format: "currency",
  },
  {
    key: "payment",
    label: "Платёж",
    format: "currency",
  },
  {
    key: "closingLiability",
    label: "Конечный остаток",
    format: "currency",
  },
];

function ScheduleTable({
  schedule,
  columns = defaultColumns,
  currency = "тенге",
}) {
  if (!Array.isArray(schedule) || schedule.length === 0) {
    return null;
  }

  const tableColumns =
    Array.isArray(columns) && columns.length > 0
      ? columns
      : defaultColumns;

  return (
    <div className="table-wrapper">
      <table className="schedule-table">
        <thead>
          <tr>
            {tableColumns.map((column) => (
              <th key={column.key}>{column.label}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {schedule.map((row, rowIndex) => (
            <tr key={row.id ?? row.year ?? rowIndex}>
              {tableColumns.map((column) => {
                const value = row[column.key];

                return (
                  <td key={column.key}>
                    {column.format === "currency"
                      ? formatCurrency(value, currency)
                      : value}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ScheduleTable;