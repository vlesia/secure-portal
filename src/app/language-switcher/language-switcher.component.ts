import { Component } from '@angular/core';
import { LanguageService } from '../services/language.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './language-switcher.component.html',
  styleUrl: './language-switcher.component.scss'
})
export class LanguageSwitcherComponent  {
  currentLanguage$: Observable<string>;

  constructor(private translate: LanguageService) {
    this.currentLanguage$ = this.translate.currentLanguage$;
  }

  changeLanguage(event: any): void {
    const language = event.target.checked ? 'uk' : 'en';
    this.translate.changeLanguage(language);
  }
}
