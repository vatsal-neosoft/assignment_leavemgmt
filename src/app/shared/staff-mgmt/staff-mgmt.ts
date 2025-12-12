import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-staff-mgmt',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './staff-mgmt.html',
  styleUrl: './staff-mgmt.css',
})
export class StaffMgmt {


  staffList: any[] = [];
  paginatedStaff: any[] = [];
  currentPage: number = 1;
  pageSize: number = 10;
  totalPages: number = 1;

  addStaffForm!: FormGroup;
  showAddForm: boolean = false;
  showViewModal: boolean = false;
  selectedStaff: any;

  hodDepartment!: string;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    // Get logged-in HOD info
    const user = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
    this.hodDepartment = user.department;

    this.loadStaff();

    // Initialize add staff form
    this.addStaffForm = this.fb.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contactNumber: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  loadStaff() {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    // Filter staff of this HOD's department
    this.staffList = users.filter((u: any) => u.role === 'STAFF' && u.department === this.hodDepartment);
    this.totalPages = Math.ceil(this.staffList.length / this.pageSize);
    this.paginate();
  }

  paginate() {
    const start = (this.currentPage - 1) * this.pageSize;
    this.paginatedStaff = this.staffList.slice(start, start + this.pageSize);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.paginate();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginate();
    }
  }

  viewStaff(staff: any) {
    this.selectedStaff = staff;
    this.showViewModal = true;
  }

  closeView() {
    this.showViewModal = false;
  }

  deleteStaff(staff: any) {
    if (confirm(`Are you sure you want to delete ${staff.name}?`)) {
      let users = JSON.parse(localStorage.getItem('users') || '[]');
      users = users.filter((u: any) => u.username !== staff.username);
      localStorage.setItem('users', JSON.stringify(users));
      this.loadStaff();
    }
  }

  toggleAddForm() {
    this.showAddForm = !this.showAddForm;
  }

  addStaff() {
    if (this.addStaffForm.invalid) return;

    const users = JSON.parse(localStorage.getItem('users') || '[]');

    // Prevent duplicate username
    if (users.some((u: any) => u.username === this.addStaffForm.value.username)) {
      alert('Username already exists!');
      return;
    }

    const newStaff = {
      ...this.addStaffForm.value,
      role: 'STAFF',
      department: this.hodDepartment
    };

    users.push(newStaff);
    localStorage.setItem('users', JSON.stringify(users));
    alert('Staff added successfully!');
    this.addStaffForm.reset();
    this.showAddForm = false;
    this.loadStaff();
  }


}
