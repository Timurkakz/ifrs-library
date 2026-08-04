import { useEffect } from "react";
import { useLocation } from "react-router";

import { ifrsStandards } from "../data/ifrsStandards.js";
import { iasStandards } from "../data/iasStandards.js";

import { ifrsContentById } from "../content/ifrs/index.js";
import { iasContentById } from "../content/ias/index.js";

const pagesMeta = {
  "/": {
    title: "IFRS Library — практическая библиотека МСФО",
    description:
      "Практическая библиотека МСФО с объяснениями, примерами, расчётами и бухгалтерскими проводками.",
  },

  "/ifrs": {
    title:
      "МСФО (IFRS) — стандарты и руководства | IFRS Library",
    description:
      "Каталог международных стандартов финансовой отчётности IFRS с практическими руководствами.",
  },

  "/ias": {
    title:
      "МСБУ (IAS) — стандарты и руководства | IFRS Library",
    description:
      "Каталог международных стандартов бухгалтерского учёта IAS с практическими руководствами.",
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

const standardsSections = {
  ifrs: {
    standards: ifrsStandards,
    contentById: ifrsContentById,
  },

  ias: {
    standards: iasStandards,
    contentById: iasContentById,
  },
};

function getStandardMeta(pathname) {
  const pathParts = pathname.split("/").filter(Boolean);

  if (pathParts.length !== 2) {
    return null;
  }

  const [sectionName, standardId] = pathParts;

  const section = standardsSections[sectionName];

  if (!section) {
    return null;
  }

  const standard = section.standards.find(
    (item) => String(item.id) === standardId,
  );

  if (!standard) {
    return null;
  }

  const hasPracticalGuide = Boolean(
    section.contentById[standard.id],
  );

  return {
    title: `${standard.code} «${standard.title}» | IFRS Library`,

    description: hasPracticalGuide
      ? `Практическое руководство по ${standard.code} «${standard.title}»: объяснения, примеры, расчёты и бухгалтерские проводки.`
      : `${standard.code} «${standard.title}»: описание стандарта и материалы по его применению.`,
  };
}

function PageMeta() {
  const { pathname } = useLocation();

  useEffect(() => {
    const pageMeta =
      pagesMeta[pathname] ??
      getStandardMeta(pathname) ?? {
        title: "Страница не найдена | IFRS Library",
        description:
          "Запрашиваемая страница не найдена в библиотеке IFRS Library.",
      };

    document.title = pageMeta.title;

    let descriptionTag = document.querySelector(
      'meta[name="description"]',
    );

    if (!descriptionTag) {
      descriptionTag = document.createElement("meta");
      descriptionTag.setAttribute("name", "description");
      document.head.appendChild(descriptionTag);
    }

    descriptionTag.setAttribute(
      "content",
      pageMeta.description,
    );
  }, [pathname]);

  return null;
}

export default PageMeta;