import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private languageSubject = new BehaviorSubject<string>(this.translate.defaultLang);
  currentLanguage$ = this.languageSubject.asObservable();

  constructor(private translate: TranslateService) {
  }

  changeLanguage(language: string): void {
    this.translate.use(language);
    this.languageSubject.next(language);
  }

  getCurrentLanguage(): string {
    return this.languageSubject.getValue();
  }
};
