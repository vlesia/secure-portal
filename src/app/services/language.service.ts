import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private languageSubject = new BehaviorSubject<string>(this.translate.currentLang || 'en');
  currentLanguage$ = this.languageSubject.asObservable();

  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('en'); 
    this.translate.use(this.translate.currentLang || 'en');
  }

  changeLanguage(language: string): void {
    this.translate.use(language);
    this.languageSubject.next(language);
  }

  getCurrentLanguage(): string {
    return this.languageSubject.getValue();
  }
};
