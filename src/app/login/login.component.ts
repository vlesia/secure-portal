import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RegisterComponent } from '../register/register.component';
import { LoadingService } from '../services/loading.service';
import { customEmailValidator } from '../helpers/validators';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    RegisterComponent,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  showRegister = false;
  errorMessage: string | null = null;
  isLoading$ = this.loading.isLoading$;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private loading: LoadingService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, customEmailValidator]],
      password: ['', [Validators.required]],
    });
  }

  onLogin() {
    this.loginForm.markAllAsTouched();

    if (this.loginForm.invalid) {
      return;
    }

    const { email, password } = this.loginForm.value;
    this.authService
      .login(email, password)
      .then(() => {
        this.router.navigate(['/account']);
      })
      .catch((error) => {
        this.errorMessage = error.message;
      });
  }

  toggleForm() {
    this.showRegister = !this.showRegister;
  }
}
