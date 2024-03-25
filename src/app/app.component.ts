import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IUser } from './models/User';
import { UsersService } from './services/users.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class UsersComponent implements OnChanges {
  @Input() data: IUser | null = null;
  @Output() onCloseModel = new EventEmitter();

  userForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    private toastr: ToastrService

  ) {
    this.userForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
      age: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
     
    });
  }

  onClose() {
    this.onCloseModel.emit(false);
  }

  ngOnChanges(): void {
    if (this.data) {
      this.userForm.patchValue({
        name: this.data.name,
        age: this.data.age,
        gender: this.data.gender
      });
    }
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.usersService.createNewUser(this.userForm.value).subscribe({
        next: (response: any) => {
          this.resetForm();
          this.toastr.success(response.message);
        },
        error: (error: any) => {
     
          this.toastr.error('Error al crear usuario. Por favor, inténtalo de nuevo.');
        }
      });
    } else {
      this.userForm.markAllAsTouched();
    }
  }
  

  resetForm() {
    this.userForm.reset();
    this.onClose();
  }
  
}
