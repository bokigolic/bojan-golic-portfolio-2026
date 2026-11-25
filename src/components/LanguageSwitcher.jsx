import { useLocale } from "../i18n/context";
import { languages, localizedPath } from "../i18n/routes";

export default function LanguageSwitcher({ route, suffix = "" }) {
  const { language, t } = useLocale();
  return (
    <nav className="language-switcher" aria-label={t("Language")}>
      {Object.entries(languages).map(([key, target]) => (
        <a
          key={key}
          href={localizedPath(route, key) + suffix}
          lang={target.tag}
          hrefLang={target.tag}
          aria-label={target.name}
          aria-current={key === language ? "page" : undefined}
        >
          {target.code}
        </a>
      ))}
    </nav>
  );
}
