function Checklist({ items }) {
  if (!Array.isArray(items) || items.length === 0) {
    return (
      <p className="content-note">
        Практический чек-лист пока не добавлен.
      </p>
    );
  }

  return (
    <ul className="checklist">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export default Checklist;