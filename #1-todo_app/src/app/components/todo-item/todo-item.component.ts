import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Todo } from './interfaces/todo-item';
import { TodoService } from 'src/app/services/todo.service';
import {ChangeDetectorRef} from '@angular/core';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent{

  @Input() todo!: Todo;
  @Output() deleteTodoEvent = new EventEmitter<string>();
  isEditing: Boolean = false;
  @ViewChild('taskInput') taskInput!: ElementRef;
  

  constructor(private todoService: TodoService, private ref: ChangeDetectorRef){}

  editTodo(){
    this.isEditing = true;
    this.taskInput.nativeElement.focus();
  }

  updateTodo(){
    this.isEditing = false;
    this.todoService.updateTodo(this.todo.id, this.todo).pipe().subscribe(t=>{
      this.todo = t;
    });
  }
  
  handleChecked(){
    this.todoService.updateTodo(this.todo.id, this.todo).pipe().subscribe(t=>{
      this.todo = t;
    });
  }

  deleteTodo(){
    this.deleteTodoEvent.emit(this.todo.id);
  }

}
