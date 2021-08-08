import parser from "accept-language-parser";
import LanguagePackage from "./LanguagePackage";

class i18n {
  public defaultLanguage: string;
  public languages: Map<string, LanguagePackage>;

  constructor(defaultLanguage: string, ...languagePackages: LanguagePackage[]) {
    this.defaultLanguage = defaultLanguage;
    this.languages = new Map();

    languagePackages.forEach((languagePackage) => {
      this.languages.set(languagePackage.language, languagePackage);
    });
  }

  getLanguage(
    languageCode: string | undefined = this.defaultLanguage
  ): LanguagePackage {
    let languages = parser.parse(languageCode);
    return languages.length >= 1
      ? this.languages.get(languages[0].code)!
      : this.languages.get(this.defaultLanguage)!;
  }
}

export default i18n;
