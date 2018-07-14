import { Injectable } from '@angular/core';
import { Payment } from './payment';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable(
  {
    providedIn: 'root'
  }
)
export class PaymentsService {

  private paymentsUrl = 'api/payments';  // URL to web api

  constructor(private http: HttpClient,
    private messageService: MessageService) { }

  /**
  * Handle Http operation that failed.
  * Let the app continue.
  * @param operation - name of the operation that failed
  * @param result - optional value to return as the observable result
  */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a PaymentService message with the MessageService */
  private log(message: string) {
    this.messageService.add('HeroService: ' + message);
  }

  /**
   * Get HTTP Call to get the Payments.
   */
  getPayments(): Observable<Payment[]> {
    return this.http.get<Payment[]>(this.paymentsUrl)
      .pipe(
      tap(Payments => this.log(`fetched Payments`)),
      catchError(this.handleError('getPayments', []))
      );
  }


  /** GET Payment by Paymentnumber. Will 404 if id not found */
  getPayment(paymentId: number): Observable<Payment> {
    const url = `${this.paymentsUrl}/${paymentId}`;
    return this.http.get<Payment>(url).pipe(
      tap(_ => this.log(`fetched Payment id=${paymentId}`)),
      catchError(this.handleError<Payment>(`getHero id=${paymentId}`))
    );
  }

  /** PUT: update the Payment details on the server */
  updatePayment(payment: Payment): Observable<any> {
    return this.http.put(this.paymentsUrl, payment, httpOptions).pipe(
      tap(_ => this.log(`updated Payment id=${payment.paymentid}`)),
      catchError(this.handleError<any>('updatePayment'))
    );
  }

  /** POST: add a new Payment details to the server */
  addPayment(payment: Payment): Observable<Payment> {
    return this.http.post<Payment>(this.paymentsUrl, payment, httpOptions).pipe(
      tap((payment: Payment) => this.log(`added Payment with Payment number=${payment.paymentid}`)),
      catchError(this.handleError<Payment>('addPayment'))
    );
  }

  /** DELETE: delete the Payment from the server */
  deletePayment(payment: Payment | number): Observable<Payment> {
    const paymentId = typeof payment === 'number' ? payment : payment.paymentid;
    const url = `${this.paymentsUrl}/${paymentId}`;

    return this.http.delete<Payment>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted Payment number=${paymentId}`)),
      catchError(this.handleError<Payment>('deletePayment'))
    );
  }

}