module.exports = {
  i18n: {
    defaultLocale: "en",
    locales: ["en", "it", "de", "al", "fr", "es", "pt", "ru", "pl", "tr", "hr"],
  },
  ns: ["common"],
  fallbackLng: {
    default: ["en", "it", "de", "al", "fr", "es", "pt", "ru", "pl", "tr", "hr"],
  },
  react: { useSuspense: false }, //this
  localePath:
    typeof window === "undefined"
      ? require("path").resolve("./public/locales")
      : "/locales",
};
