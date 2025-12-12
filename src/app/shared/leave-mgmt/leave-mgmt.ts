import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-leave-mgmt',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './leave-mgmt.html',
  styleUrl: './leave-mgmt.css',
})
export class LeaveMgmt {

  role!: 'HOD' | 'STAFF';
  user!: any;

  leaves: any[] = [];
  showApplyForm: boolean = false;
  applyLeaveForm!: FormGroup;

  showViewModal: boolean = false;
  selectedLeave: any;

  constructor(private fb: FormBuilder, private route: ActivatedRoute) {}

  ngOnInit() {
    this.role = localStorage.getItem('userRole') as 'HOD' | 'STAFF';
    this.user = JSON.parse(localStorage.getItem('loggedInUser') || '{}');

    this.loadLeaves();

    this.applyLeaveForm = this.fb.group({
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required],
      reason: ['', Validators.required]
    });
  }

  loadLeaves() {
    let allLeaves = JSON.parse(localStorage.getItem('leaves') || '[]');

    if (this.role === 'STAFF') {
      // Staff sees only own leaves
      this.leaves = allLeaves.filter((l:any) => l.username === this.user.username);
    } else {
      // HOD sees leaves of staff in HIS department only
      this.leaves = allLeaves.filter(
        (l:any) => l.department === this.user.department
      );
    }
  }

  toggleApplyForm() {
    this.showApplyForm = !this.showApplyForm;
  }

  applyLeave() {
    if (this.applyLeaveForm.invalid) return;

    const allLeaves = JSON.parse(localStorage.getItem('leaves') || '[]');

    const newLeave = {
      id: Date.now(),
      username: this.user.username,
      name: this.user.name,
      department: this.user.department,
      fromDate: this.applyLeaveForm.value.fromDate,
      toDate: this.applyLeaveForm.value.toDate,
      reason: this.applyLeaveForm.value.reason,
      status: 'Pending'
    };

    allLeaves.push(newLeave);
    localStorage.setItem('leaves', JSON.stringify(allLeaves));

    this.applyLeaveForm.reset();
    this.showApplyForm = false;
    this.loadLeaves();
  }

  viewLeave(leave: any) {
    this.selectedLeave = leave;
    this.showViewModal = true;
  }

  closeView() {
    this.showViewModal = false;
  }


  //HOD Actions
  approveLeave() {
    this.updateLeaveStatus('Approved');
  }

  rejectLeave() {
    this.updateLeaveStatus('Rejected');
  }

  updateLeaveStatus(status: string) {
    let allLeaves = JSON.parse(localStorage.getItem('leaves') || '[]');

    allLeaves = allLeaves.map((l: any) =>
      l.id === this.selectedLeave.id ? { ...l, status } : l
    );

    localStorage.setItem('leaves', JSON.stringify(allLeaves));

    this.closeView();
    this.loadLeaves();
  }

}
