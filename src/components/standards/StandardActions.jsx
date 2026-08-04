import { useState } from "react";
import { FaLink, FaPrint } from "react-icons/fa";

function StandardActions() {
  const [copied, setCopied] = useState(false);

  async function copyPageLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      setCopied(false);
      window.prompt(
        "Скопируйте ссылку вручную:",
        window.location.href,
      );
    }
  }

  function printPage() {
    window.print();
  }

  return (
    <div
      className="standard-actions"
      aria-label="Действия с руководством"
    >
      <button type="button" onClick={copyPageLink}>
        <FaLink aria-hidden="true" />
        {copied ? "Ссылка скопирована" : "Скопировать ссылку"}
      </button>

      <button type="button" onClick={printPage}>
        <FaPrint aria-hidden="true" />
        Распечатать или сохранить PDF
      </button>
    </div>
  );
}

export default StandardActions;