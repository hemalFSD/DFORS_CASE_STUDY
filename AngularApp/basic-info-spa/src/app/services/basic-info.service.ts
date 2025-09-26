import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface BasicInfo {
  id?: number;
  name: string;
  dateOfBirth: string;
  location: string;
}

@Injectable({
  providedIn: 'root'
})
export class BasicInfoService {
  private apiUrl = 'http://localhost:5018/api/basicinfo';

  constructor(private http: HttpClient) { }

  getAll(): Observable<BasicInfo[]> {
    return this.http.get<BasicInfo[]>(this.apiUrl);
  }

  add(info: BasicInfo): Observable<any> {
    return this.http.post(this.apiUrl, info);
  }

  update(info: BasicInfo): Observable<any> {
    const { id, ...payload } = info;
    return this.http.put(`${this.apiUrl}/${id}`, payload);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}?id=${id}`);
  }
}
