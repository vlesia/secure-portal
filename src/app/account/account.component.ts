import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { User } from '../models/user.model';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../services/language.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  user$: Observable<User | null> = new Observable<User | null>();
  currentLanguage$: Observable<string>;

  constructor(
    private authService: AuthService,
    private translate: LanguageService,
    private router: Router
  ) {
    this.currentLanguage$ = this.translate.currentLanguage$;
  }

  ngOnInit(): void {
    this.user$ = this.authService.getUser();
  }

  logout(): void {
    this.authService.logout().then(() => {
      this.router.navigate(['/login']);
    });
  }
}
