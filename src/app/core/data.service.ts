import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map, tap } from 'rxjs/operators';

import { allBooks, allReaders } from 'app/data';
import { LoggerService } from './logger.service';
import { Reader } from '../models/reader';
import { Book } from '../models/book';
import { OldBook } from '../models/oldBook';
import { BookTrackerError } from 'app/models/bookTrackerError';
import { AddBookComponent } from '../add-book/add-book.component';

@Injectable()
export class DataService {

  mostPopularBook: Book = allBooks[0];

  constructor(private loggerService: LoggerService, private http: HttpClient) { }

  setMostPopularBook(popularBook: Book): void {
    this.mostPopularBook = popularBook;
  }

  getAllReaders(): Observable<Reader[]> {
    return this.http.get<Reader[]>('/api/readers');
  }

  getReaderById(id: number): Observable<Reader> {
    return this.http.get<Reader>(`/api/readers/${id}`, {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': 'my-token'
      })
    });
  }

  getAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>('/api/books');
  }

  getBookById(id: number): Observable<Book> {
    return this.http.get<Book>(`/api/books/${id}`, {
      headers:  new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': 'my-token'
      })
    });
  }

  getOldBooksById(id: number): Observable<OldBook> {
    return this.http.get<Book>(`/api/books/${id}`)
      .pipe(
        map(b => <OldBook> {
          bookTitle: b.title,
          year: b.publicationYear
        }),
        tap(classicBook => console.log(classicBook))
      );
  }

  addBook(newBook: Book): Observable<Book> {
    return this.http.post<Book>('/api/books', newBook, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
  }

  updateBook(updatedBook: Book): Observable<void> {
    return this.http.put<void>(`/api/books/${updatedBook.bookID}`, updatedBook, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
  }

  deleteBook(bookID: number): Observable<void> {
    return this.http.delete<void>(`/api/books/${bookID}`);
  }

  addReader(newReader: Reader): Observable<Reader> {
    return this.http.post<Reader>('/api/readers', newReader, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
  }

  updateReader(updatedReader: Reader): Observable<void> {
    return this.http.put<void>(`/api/readers/${updatedReader.readerID}`, updatedReader, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
  }

  deleteReader(readerID: number): Observable<void> {
    return this.http.delete<void>(`/api/readers/${readerID}`);
  }
}
