/**
 * Created by codeforcoffee on 6/24/17.
 */
import spanishDataset from './dataset-es.json';
import frenchDataset from './dataset-fr.json';
import englishDataset from './dataset.json';

class LanguageProvider {
  static createLanguageState(languageCode = 'en') {
    switch(languageCode.toLowerCase()) {
      case 'en':
        return englishDataset;
      case 'es':
        return spanishDataset;
      case 'fr':
        return frenchDataset;
      default:
        return englishDataset;
    }
  }
  static changeLanguage(languageCode = 'en') {
    sessionStorage.setItem('language', languageCode.toLowerCase());
    return true;
  }
  static getLanguage() {
    return sessionStorage.getItem('language');
  }
}

export default LanguageProvider;
