import { Component, OnInit } from '@angular/core';
import { Todo } from '../todo-item/interfaces/todo-item';
import { TodoService } from 'src/app/services/todo.service';
import {ChangeDetectorRef} from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit{

  todos: Todo[] = [];
  isLoading = true;
  newTask: string = '';

  constructor(private todoService: TodoService, private ref: ChangeDetectorRef){
  }

  ngOnInit(){
    this.todoService.getTodos().subscribe(todos=>{
      this.todos = todos;
      this.isLoading = false;
    })
  }

  
  createTodo(){
    this.todoService.createTodo(this.newTask).subscribe(t=>{
      this.ref.detectChanges();
      this.newTask = '';
    });
  }
  
  deleteTodo(id: string){
    this.todoService.deleteTodo(id).subscribe(todos=>{
      this.todos = todos;
    });
  }

}
