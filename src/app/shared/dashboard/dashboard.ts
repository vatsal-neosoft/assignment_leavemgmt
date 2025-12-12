import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {

  role!: 'HOD' | 'STAFF';
  user!: any;

  ngOnInit() {
    this.role = localStorage.getItem('userRole') as 'HOD' | 'STAFF';
    this.user = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
  }

  logout() {
    localStorage.removeItem('userRole');
    localStorage.removeItem('loggedInUser');
  }

}
