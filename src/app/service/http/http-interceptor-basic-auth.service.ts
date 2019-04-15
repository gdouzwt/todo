import {Injectable} from '@angular/core';
import {HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {BasicAuthenticationService} from "../basic-authentication.service";

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorBasicAuthService implements HttpInterceptor {

  constructor(
    private basicAuth: BasicAuthenticationService
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let username = this.basicAuth.getAuthenticatedUser();
    let basicAuthHeaderString = this.basicAuth.getAuthenticatedToken();

    if (basicAuthHeaderString && username) {
      req = req.clone({
        setHeaders: {
          Authorization: basicAuthHeaderString
        }
      });
    }
    return next.handle(req);
  }
}
