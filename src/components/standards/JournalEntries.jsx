import { formatCurrency } from "../../utils/formatCurrency.js";

function JournalEntries({ entries, currency = "тенге" }) {
  if (!Array.isArray(entries) || entries.length === 0) {
    return (
      <p className="content-note">
        Примеры бухгалтерских проводок пока не добавлены.
      </p>
    );
  }

  return (
    <div className="journal-entries">
      {entries.map((entry) => (
        <article
          className="journal-entry"
          key={`${entry.moment}-${entry.debit}-${entry.credit}`}
        >
          <h3>{entry.moment}</h3>

          <div className="journal-entry-row">
            <span>Дебет</span>
            <strong>{entry.debit}</strong>
          </div>

          <div className="journal-entry-row">
            <span>Кредит</span>
            <strong>{entry.credit}</strong>
          </div>

          <div className="journal-entry-row">
            <span>Сумма</span>
            <strong>{formatCurrency(entry.amount, currency)}</strong>
          </div>

          <p>{entry.explanation}</p>
        </article>
      ))}
    </div>
  );
}

export default JournalEntries;