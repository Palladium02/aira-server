import { ILanguagePackage } from "./Types";

class LanguagePackage {
  public language: string;
  public translation: ILanguagePackage;

  constructor(language: string, translation: ILanguagePackage) {
    this.language = language;
    this.translation = translation;
  }
}

export default LanguagePackage;
