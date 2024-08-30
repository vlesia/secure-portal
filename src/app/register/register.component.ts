import { Component, Input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import {
  customEmailValidator,
  passwordMatchValidator,
} from '../helpers/validators';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [TranslateModule, CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string | null = null;
  @Input() toggleForm!: () => void;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.nonNullable.group(
      {
        email: ['', [Validators.required, customEmailValidator]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: passwordMatchValidator }
    );
  }

  onSomeAction() {
    this.toggleForm();
  }
  onRegister() {
    this.registerForm.markAllAsTouched();
    if (this.registerForm.invalid) {
      return;
    }

    const { email, password } = this.registerForm.value;
    this.authService
      .register(email, password)
      .then(() => this.router.navigate(['/account']))
      .catch((error) => (this.errorMessage = error.message));
  }
}
