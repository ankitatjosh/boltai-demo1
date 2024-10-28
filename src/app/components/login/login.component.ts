import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MockApiService } from '../../services/mock-api.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule,
    MatSnackBarModule
  ],
  template: `
    <div class="login-container">
      <form [formGroup]="loginForm" (ngSubmit)="onLogin()">
        <mat-form-field>
          <input matInput placeholder="Email" formControlName="email" required>
          <mat-error *ngIf="loginForm.get('email')?.errors?.['required']">
            Email is required
          </mat-error>
          <mat-error *ngIf="loginForm.get('email')?.errors?.['email']">
            Please enter a valid email
          </mat-error>
        </mat-form-field>

        <mat-form-field>
          <input matInput type="password" placeholder="Password" formControlName="password" required>
          <mat-error *ngIf="loginForm.get('password')?.errors?.['required']">
            Password is required
          </mat-error>
          <mat-error *ngIf="loginForm.get('password')?.errors?.['minlength']">
            Password must be at least 6 characters
          </mat-error>
        </mat-form-field>

        <button mat-raised-button color="primary" type="submit" [disabled]="loginForm.invalid">
          Login
        </button>
        <button mat-button type="button" (click)="onRegister()">Register</button>
      </form>
    </div>
  `,
  styles: [`
    .login-container {
      max-width: 400px;
      margin: 2rem auto;
      padding: 2rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
  `]
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private mockApiService: MockApiService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.mockApiService.login(email, password).subscribe({
        next: (response) => {
          const route = response.user.role === 'student' ? '/student-dashboard' : '/mentor-dashboard';
          this.router.navigate([route]);
        },
        error: (error) => {
          this.snackBar.open(error.message || 'Login failed', 'Close', { duration: 3000 });
        }
      });
    }
  }

  onRegister(): void {
    this.snackBar.open('Registration coming soon!', 'Close', { duration: 3000 });
  }
}