import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Todo } from '../components/todo-item/interfaces/todo-item';
import { TodoDTO } from '../components/todo-item/interfaces/todoDTO';
import {v4 as uuid} from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private todos!: Todo[];
  constructor() { }

  getTodos(): Observable<Todo[]>{
    const todos: Todo[] = JSON.parse(localStorage.getItem('todos')!) ?? []; 
    this.todos = todos;
    return of(todos);
  }

  updateTodo(id: string, todo: Todo ): Observable<Todo>{
    this.todos = this.todos.filter(t=> t.id !== id);
    this.todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(this.todos));
    return of(todo);
  }
  
  createTodo(task: string): Observable<Todo>{
    const todo: Todo = {
      id: uuid(),
      isDone: false,
      task: task,
    }
    this.todos.push(todo as Todo);
    localStorage.setItem('todos', JSON.stringify(this.todos));
    return of(todo as Todo);
  }

  deleteTodo(id: string){
    this.todos = this.todos.filter(t=> t.id !== id);
    localStorage.setItem('todos', JSON.stringify(this.todos));
    return of(this.todos);
  }
  
}
