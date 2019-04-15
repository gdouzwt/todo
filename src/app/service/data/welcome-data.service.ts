import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BasicAuthenticationService} from "../basic-authentication.service";

export class HelloWorldBean {
  constructor(public message: string) {

  }
}


@Injectable({
  providedIn: 'root'
})
export class WelcomeDataService {

  constructor(
    private http: HttpClient,
    private basicAuth: BasicAuthenticationService
  ) {
  }

  executeHelloWorldBeanService() {
    return this.http.get<HelloWorldBean>('http://localhost:8080/hello-world-bean');
    // console.log('Execute Hello World Bean Service')
  }

  executeHelloWorldBeanServiceWithPathVariable(name) {

    // let basicAuthHeaderString = this.createBasicAuthenticationHttpHeader();
    //
    // let headers = new HttpHeaders({
    //     Authorization: basicAuthHeaderString
    //   }
    // );

    let headers = new HttpHeaders({
      Authorization: this.basicAuth.getAuthenticatedToken()
    });

    return this.http.get<HelloWorldBean>(`http://localhost:8080/hello-world/path-variable/${name}`,
      {headers}
      // {headers}
    );
    // console.log('Execute Hello World Bean Service')
  }


  // createBasicAuthenticationHttpHeader() {
  //   let username = 'tao';
  //   let password = 'wing';
  //   let basicAuthHeaderString = 'Basic ' + window.btoa(username + ':' + password);
  //
  //   return basicAuthHeaderString;
  // }


  // Access to XMLHttpRequest at 'http://localhost:8080/users/tao/todos' from origin 'http://localhost:4200'
  // has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.

}
