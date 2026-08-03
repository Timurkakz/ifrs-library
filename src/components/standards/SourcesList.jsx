function SourcesList({ sources }) {
  if (!Array.isArray(sources) || sources.length === 0) {
    return (
      <p className="content-note">
        Источники и дополнительная литература пока не добавлены.
      </p>
    );
  }

  return (
    <div className="sources-list">
      {sources.map((source) => (
        <article
          className="source-card"
          key={`${source.organization}-${source.title}`}
        >
          <div>
            <span>{source.language}</span>
            <span>{source.type}</span>
          </div>

          <h3>{source.title}</h3>

          <p>{source.organization}</p>

          <a
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            Открыть источник ↗
          </a>
        </article>
      ))}
    </div>
  );
}

export default SourcesList;