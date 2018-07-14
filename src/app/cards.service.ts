import { Injectable } from '@angular/core';
import { Card } from './card';
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


export class CardsService {

  private cardsUrl = 'api/cards';  // URL to web api

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

  /** Log a CardServices message with the MessageService */
  private log(message: string) {
    this.messageService.add('HeroService: ' + message);
  }

  /**
   * Get HTTP Call to get the cards.
   */
  getCards(): Observable<Card[]> {
    return this.http.get<Card[]>(this.cardsUrl)
      .pipe(
      tap(cards => this.log(`fetched cards`)),
      catchError(this.handleError('getCards', []))
      );
  }
  /** GET card by cardnumber. Will 404 if id not found */
  getCard(cardnumber: number): Observable<Card> {
    const url = `${this.cardsUrl}/${cardnumber}`;
    return this.http.get<Card>(url).pipe(
      tap(_ => this.log(`fetched card id=${cardnumber}`)),
      catchError(this.handleError<Card>(`getHero id=${cardnumber}`))
    );
  }

  /** PUT: update the card details on the server */
  updateCard(card: Card): Observable<any> {
    return this.http.put(this.cardsUrl, card, httpOptions).pipe(
      tap(_ => this.log(`updated card id=${card.cardnumber}`)),
      catchError(this.handleError<any>('updatecard'))
    );
  }

  /** POST: add a new card details to the server */
  addCard(card: Card): Observable<Card> {
    return this.http.post<Card>(this.cardsUrl, card, httpOptions).pipe(
      tap((card: Card) => this.log(`added card with card number=${card.cardnumber}`)),
      catchError(this.handleError<Card>('addCard'))
    );
  }

  /** DELETE: delete the card from the server */
  deleteCard(card: Card | number): Observable<Card> {
    const cardnumber = typeof card === 'number' ? card : card.cardnumber;
    const url = `${this.cardsUrl}/${cardnumber}`;

    return this.http.delete<Card>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted card number=${cardnumber}`)),
      catchError(this.handleError<Card>('deleteCard'))
    );
  }

}