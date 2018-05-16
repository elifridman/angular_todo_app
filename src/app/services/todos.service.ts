import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Todo } from '../models/Todo';
import { Observable } from 'rxjs';

@Injectable()
export class TodosService {

  constructor(private httpClient: HttpClient) { }
  private todos: Todo[] = [];
  fetchTodos(): Observable<Todo[]>{
    return this.httpClient.get<Todo[]>('/todos');
  }
  addTodo(todo: Todo): Observable<Todo>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    }
    return this.httpClient.post<Todo>('/todos', todo, httpOptions);
  }
  updateTodo(todo){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    }
    return this.httpClient.put(`/todos/${todo._id}`, todo, httpOptions);

  }
  deleteTodo(id){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    }
    return this.httpClient.delete(`/todos/${id}`, httpOptions);
  }

}
