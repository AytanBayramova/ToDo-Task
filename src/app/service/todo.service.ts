import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private _http: HttpClient) { }

  addTask(data: any): Observable<any> {
    return this._http.post('http://localhost:3004/todo', data);
  }

  updateTask(id:number, data: any): Observable<any> {
    return this._http.put(`http://localhost:3004/todo/${id}`, data);
  }

  getTaskList(): Observable<any> {
    return this._http.get('http://localhost:3004/todo');
  }

  deleteTask (id:number): Observable <any> {
    return this._http.delete(`http://localhost:3004/todo/${id}`);
  }
}
