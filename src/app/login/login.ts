import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private toastr: ToastrService) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onLogin() {
    if (this.loginForm.invalid) {
      this.toastr.error("Please fill all required fields.");
      return;
    }

    const { username, password } = this.loginForm.value;

    const users = JSON.parse(localStorage.getItem('users') || '[]');

    const user = users.find((u: any) => u.username === username && u.password === password);

    if (user) {
      localStorage.setItem('userRole', user.role);
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      this.toastr.success(`Logged in as ${user.role}!`);
      this.router.navigate(['dashboard']);
    } else {
      this.toastr.error('Invalid username or password!');
    }
}



}
