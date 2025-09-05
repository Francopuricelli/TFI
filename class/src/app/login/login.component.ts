import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { SupabaseService } from '../../app/supabase.service';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, IonicModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class Login {
  modalmessage = signal(false);   // controla apertura/cierre
  modalText = signal('');         // para personalizar el mensaje

  constructor(private supabaseService: SupabaseService, private router: Router) {}
  private fb = inject(FormBuilder);

  loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(3)]]
  });

  get email(): AbstractControl | null {
    return this.loginForm.get('email');
  }

  get password(): AbstractControl | null {
    return this.loginForm.get('password');
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.supabaseService.client.auth.signInWithPassword({
        email: this.loginForm.value.email!,
        password: this.loginForm.value.password!
      }).then(({data, error}) => {
        if (error) {
          console.error('Error signing in:', error);
          this.showModal('Email o contraseña incorrectos');
          return;
        } else {
          this.router.navigate(['/home']);
          console.log('Form Submitted!', this.loginForm.value);
        }
      }).catch((error: unknown) => {
        console.error('Error signing in:', error);
        this.showModal('Ocurrió un error inesperado');
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  goToRegister(): void {
    this.router.navigate(['/register']);
  }

  quickLogin(userType: string) {
    let email = '';
    let password = '';

    switch(userType) {
      case 'admin':
        email = 'francopuricelli954@gmail.com';
        password = '1234';
        break;
      case 'tester':
        email = 'tester@mail.com';
        password = 'tester1';
        break;
      case 'invitado':
        email = 'gpuricelli@gmail.com';
        password = 'Tango585';
        break;
    }

    this.loginForm.setValue({ email, password });
  }

  showModal(message: string) {
    this.modalText.set(message);
    this.modalmessage.set(true);
  }

  closeModal() {
    this.modalmessage.set(false);
  }
}
