import LanguagePackage from "../src/services/i18n/LanguagePackage";

const en = new LanguagePackage("de", {
  studio: {
    login: {
      database: "Etwas ist schief gelaufen.",
      "no result": "Es gibt keinen Nutzer mit der Emailaddresse.",
      "wrong password":
        "Die Emailaddress und das Password stimmen nicht miteinander überein.",
    },
  },
});

export default en;
