import { languages, localizedPath } from "./routes.js";

export function createLocale(language = "en", translations = {}) {
  const { messages = {}, projects = {} } = translations;
  return {
    language,
    ...languages[language],
    t(source, values = {}) {
      const message = Object.hasOwn(messages, source)
        ? messages[source]
        : source;
      return message.replace(
        /\{(\w+)\}/g,
        (token, name) => values[name] ?? token,
      );
    },
    path: (path) => localizedPath(path, language),
    projects,
  };
}

export const english = createLocale();

export function localizeProject(project, locale) {
  const translation = locale.projects[project.slug];
  if (!translation) return project;
  return {
    ...project,
    ...translation,
    media: project.media ? { ...project.media, ...translation.media } : null,
  };
}
