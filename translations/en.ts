import LanguagePackage from "../src/services/i18n/LanguagePackage";

const en = new LanguagePackage("en", {
  studio: {
    login: {
      database: "Something went wrong.",
      "no result": "There is no user with that email.",
      "wrong password": "The email and password do not match.",
    },
  },
});

export default en;
