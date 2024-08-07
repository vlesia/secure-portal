import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { LanguageSwitcherComponent } from '../language-switcher/language-switcher.component';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [TranslateModule, RouterModule, NgClass, LanguageSwitcherComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  currentLanguage: string = 'en';

  constructor(private translationService: LanguageService) {}

  ngOnInit(): void {
    this.translationService.currentLanguage$.subscribe((language) => {
      this.currentLanguage = language;
    });
  }
}
