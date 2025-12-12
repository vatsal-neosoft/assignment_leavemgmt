import { Routes } from '@angular/router';
import { Register } from './register/register';
import { Login } from './login/login';
import { Dashboard } from './shared/dashboard/dashboard';
import { LeaveMgmt } from './shared/leave-mgmt/leave-mgmt';
import { StaffMgmt } from './shared/staff-mgmt/staff-mgmt';

export const routes: Routes = [
    { path: 'login', component: Login },
    { path: 'register/hod', component: Register, data: { role: 'HOD' } },
    { path: 'register/staff', component: Register, data: { role: 'STAFF' } },
    { 
        path: 'dashboard',
        component: Dashboard,
        children: [
            { path: 'leave/hod', component: LeaveMgmt, data: { role: 'HOD' } },
            { path: 'leave/staff', component: LeaveMgmt, data: { role: 'STAFF' } },
            { path: 'staff-management', component: StaffMgmt, data: { role: 'HOD' } },
        ]
    },
    
    { path: '**', redirectTo: 'login' }
];
