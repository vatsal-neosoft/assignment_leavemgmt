import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { RegisterService } from '../services/register';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

  role!: 'HOD' | 'STAFF';
  registrationForm!: FormGroup;

  departments = ['CSE', 'ECE', 'EEE', 'MECH', 'CIVIL'];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private regService: RegisterService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.role = this.route.snapshot.data['role'];

    this.registrationForm = this.fb.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contactNumber: ['', Validators.required],
      department: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4)]],
      profileImage: [null]
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.registrationForm.patchValue({
        profileImage: input.files[0]
      });
    }
  }

  onSubmit() {
    if (this.registrationForm.invalid) {
      this.registrationForm.markAllAsTouched();
      this.toastr.error('Please complete all required fields.');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');

    // Prepare new user data
    const { profileImage, ...safeData } = this.registrationForm.value;
    safeData.role = this.role;

    if (users.some((u: any) => u.username === safeData.username)) {
      this.toastr.warning('Username already exists!');
      return;
    }

    // Add new user
    users.push(safeData);

    // Save back to localStorage
    localStorage.setItem('users', JSON.stringify(users));

      this.regService.register(this.registrationForm.value, this.role)
        .subscribe((res:any) => {
          this.toastr.success(res['message']);
          this.router.navigate(['/login']);
      });
    }
}
