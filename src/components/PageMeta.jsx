import { useEffect } from "react";
import { useLocation } from "react-router";

const pagesMeta = {
  "/": {
    title: "IFRS Library — практическая библиотека МСФО",
    description:
      "Практическая библиотека МСФО с объяснениями, примерами, расчётами и бухгалтерскими проводками.",
  },

  "/ifrs": {
    title: "МСФО (IFRS) — стандарты и руководства | IFRS Library",
    description:
      "Каталог международных стандартов финансовой отчётности IFRS с практическими руководствами.",
  },

  "/ias": {
    title: "МСБУ (IAS) | IFRS Library",
    description:
      "Раздел международных стандартов бухгалтерского учёта IAS.",
  },

  "/ifric": {
    title: "IFRIC и SIC | IFRS Library",
    description:
      "Интерпретации и разъяснения по применению международных стандартов финансовой отчётности.",
  },

  "/laws": {
    title: "Законодательство Казахстана | IFRS Library",
    description:
      "Законы и нормативные документы Казахстана в области бухгалтерского учёта и финансовой отчётности.",
  },
};

function PageMeta() {
  const { pathname } = useLocation();

  useEffect(() => {
    let pageMeta = pagesMeta[pathname];

    if (pathname === "/ifrs/16") {
      pageMeta = {
        title: "IFRS 16 «Аренда» — расчёты и проводки | IFRS Library",
        description:
          "Практическое руководство по IFRS 16: признание аренды, расчёт обязательства, график платежей и бухгалтерские проводки.",
      };
    } else if (pathname.startsWith("/ifrs/")) {
      const standardId = pathname.split("/").filter(Boolean)[1];

      pageMeta = {
        title: `IFRS ${standardId} | IFRS Library`,
        description: `Практический материал по международному стандарту финансовой отчётности IFRS ${standardId}.`,
      };
    }

    if (!pageMeta) {
      pageMeta = {
        title: "Страница не найдена | IFRS Library",
        description:
          "Запрашиваемая страница не найдена в библиотеке IFRS Library.",
      };
    }

    document.title = pageMeta.title;

    let descriptionTag = document.querySelector(
      'meta[name="description"]',
    );

    if (!descriptionTag) {
      descriptionTag = document.createElement("meta");
      descriptionTag.setAttribute("name", "description");
      document.head.appendChild(descriptionTag);
    }

    descriptionTag.setAttribute("content", pageMeta.description);
  }, [pathname]);

  return null;
}

export default PageMeta;