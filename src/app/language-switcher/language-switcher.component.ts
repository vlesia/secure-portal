import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../services/language.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './language-switcher.component.html',
  styleUrl: './language-switcher.component.scss'
})
export class LanguageSwitcherComponent implements OnInit {
  currentLanguage: string = 'en';
  isChecked: boolean = false;

  constructor(private translationService: LanguageService) {}

  ngOnInit(): void {
    this.translationService.currentLanguage$.subscribe(language => {
      this.currentLanguage = language;
      this.isChecked = language === 'uk';
    });
  }

  changeLanguage(event: any): void {
    const language = event.target.checked ? 'uk' : 'en';
    this.translationService.changeLanguage(language);
  }
}
