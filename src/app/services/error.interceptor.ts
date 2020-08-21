import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpErrorResponse,
  HTTP_INTERCEPTORS,
  HttpHeaders,
} from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  intercept(
    req: import("@angular/common/http").HttpRequest<any>,
    next: import("@angular/common/http").HttpHandler
  ): import("rxjs").Observable<import("@angular/common/http").HttpEvent<any>> {

    const headers = new HttpHeaders({
      'x-token': localStorage.getItem('token') || 'no-token'
    });

    const reqClone = req.clone({
      headers
    })

    return next.handle(reqClone).pipe(
      catchError((error) => {
        if (error.status === 401) {
          return throwError(error.error.mensaje || 'Error de autenticación')
        }
        if (error instanceof HttpErrorResponse) {
          if(error.status === 500) {
            console.error('Log del error: \n', error.error['log']);
            return throwError('Ocurrió un error al procesar la solicitud. Por favor revise el log de errores');
          }
          const serverError = error.error;
          let modalStateErrors = "";
          if (serverError.errors && typeof serverError.errors === "object") {
            for (const key in serverError.errors) {
              if (serverError.errors[key]) {
                modalStateErrors += serverError.errors[key]['msg'] + "\n";
              }
            }
          }
          return throwError(
            modalStateErrors || serverError || "Error desconocido"
          );
        }
      })
    );
  }
}

export const ErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true,
};
