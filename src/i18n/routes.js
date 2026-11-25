export const languages = {
  en: { tag: "en-US", og: "en_US", code: "EN", name: "English" },
  sr: { tag: "sr-Latn-RS", og: "sr_RS", code: "SR", name: "Srpski (latinica)" },
};

export function languageForPath(pathname) {
  return /^\/sr(?:\/|$)/.test(pathname) ? "sr" : "en";
}

export function routeForPath(pathname) {
  const path =
    languageForPath(pathname) === "sr" ? pathname.slice(3) : pathname;
  return (
    path
      .replace(/\/index\.html$/, "/")
      .replace(/\.html$/, "")
      .replace(/\/$/, "") || "/"
  );
}

export function localizedPath(path, language) {
  if (path === "/resume-en.html")
    return language === "sr" ? "/sr/biografija.html" : path;
  return language === "sr" && path.startsWith("/") ? `/sr${path}` : path;
}

export function alternatePaths(path) {
  return {
    [languages.en.tag]: localizedPath(path, "en"),
    [languages.sr.tag]: localizedPath(path, "sr"),
    "x-default": localizedPath(path, "en"),
  };
}
