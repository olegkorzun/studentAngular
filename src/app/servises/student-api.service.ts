import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class StudentApiService {
  constructor(private http: HttpClient) { }
  fetchStudent(url: string) {
    return this.http.get(url);
  }
}
