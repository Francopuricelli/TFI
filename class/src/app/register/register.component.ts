import { Component, inject, signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { SupabaseService } from '../../app/supabase.service';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, IonicModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent  {
  modalmessage = signal(false);   // controla apertura/cierre
  modalText = signal(''); 

  constructor(private supabaseService: SupabaseService, private router: Router) {}
  private fb = inject(FormBuilder);

  registerForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    passwordConfirmation: ['', [Validators.required, Validators.minLength(6)]]
  });

  // getters para usar en la plantilla con safe navigation (p.ej. email?.touched)
  get email(): AbstractControl | null {
    return this.registerForm.get('email');
  }

  get password(): AbstractControl | null {
    return this.registerForm.get('password');
  }

  onSubmit() {
    if (this.registerForm.valid) {
      if (this.registerForm.value.password !== this.registerForm.value.passwordConfirmation) {
        this.showModal('Las contraseñas no coinciden');
      }else
      this.supabaseService.client.auth.signUp({
        email: this.registerForm.value.email!,
        password: this.registerForm.value.password!
      }).then(({data, error}) => {
        if (error) {
          console.error('Error signing up:', error);
          this.showModal('No se pudo registrar el usuario');
          return;
        }
        this.router.navigate(['/home']);
        console.log('Form Submitted!', this.registerForm.value);
      }).catch((error: unknown) => {
        console.error('Error signing up:', error);
      });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
  showModal(message: string) {
    this.modalText.set(message);
    this.modalmessage.set(true);
  }

  closeModal() {
    this.modalmessage.set(false);
  }
  goToLogin(): void {
    this.router.navigate(['/login']);
  }
}




  


