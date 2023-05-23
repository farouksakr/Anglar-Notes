import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor() {}

  intercept( request: HttpRequest<unknown>, next: HttpHandler ): Observable<HttpEvent<unknown>> {
    if (request.url.startsWith(environment.apiUrl)) {
      // her you can send your headers
      request = request.clone({
        setHeaders: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFiaGFyd29ya3MuY29tIiwicGFzc3dvcmQiOiIxMjM0NTYiLCJpYXQiOjE2NzE3MDAxNDUsImV4cCI6MTY3MTcwMzc0NX0.TpsXNhvMfCOYtXvCJ8aPmSw36BaY_Fvhx9CF_vDwxRk',
        },
      });
    }
    return next.handle(request);
  }
}
