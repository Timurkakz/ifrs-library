import { formatCurrency } from "../../utils/formatCurrency.js";

function ScheduleTable({ schedule, currency = "тенге" }) {
  if (!Array.isArray(schedule) || schedule.length === 0) {
    return null;
  }

  return (
    <div className="table-wrapper">
      <table className="schedule-table">
        <thead>
          <tr>
            <th>Год</th>
            <th>Начальный остаток</th>
            <th>Проценты</th>
            <th>Платёж</th>
            <th>Конечный остаток</th>
          </tr>
        </thead>

        <tbody>
          {schedule.map((row) => (
            <tr key={row.year}>
              <td>{row.year}</td>

              <td>
                {formatCurrency(row.openingLiability, currency)}
              </td>

              <td>
                {formatCurrency(row.interestExpense, currency)}
              </td>

              <td>
                {formatCurrency(row.payment, currency)}
              </td>

              <td>
                {formatCurrency(row.closingLiability, currency)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ScheduleTable;