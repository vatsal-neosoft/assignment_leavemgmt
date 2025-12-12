import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

export const mockApiInterceptor: HttpInterceptorFn = (req, next) => {

  console.log('Mock Interceptor Triggered:', req.url);

  // -------------------------------
  // MOCK HOD REGISTRATION
  // -------------------------------
  if (req.url.endsWith('/api/register/hod') && req.method === 'POST') {

    const body = req.body;

    return of(
      new HttpResponse({
        status: 200,
        body: {
          success: true,
          message: 'HOD registered successfully (Mock API)',
          data: body
        }
      })
    ).pipe(delay(900));
  }

  // -------------------------------
  // MOCK STAFF REGISTRATION
  // -------------------------------
  if (req.url.endsWith('/api/register/staff') && req.method === 'POST') {

    const body = req.body;

    return of(
      new HttpResponse({
        status: 200,
        body: {
          success: true,
          message: 'Staff registered successfully (Mock API)',
          data: body
        }
      })
    ).pipe(delay(900));
  }

  // DEFAULT → pass request to real backend
  return next(req);
};
