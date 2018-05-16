import { Component, OnInit } from '@angular/core';
import { TodosService } from '../../services/todos.service';
import { Todo } from '../../models/Todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todos: Todo[];
  constructor(private todosService: TodosService) { }
  addTodo(todoText){
    const newTodo: Todo = {text: todoText.value,isCompleted: false}

    this.todosService.addTodo(newTodo).subscribe(x => {
      todoText.value = '';
      this.todos.push(newTodo);
    });
  }
  updateEditState(todo){
    if(todo.isEditState){
      delete todo.isEditState
    }else{
      todo.isEditState = true
    }
  }
  updateStatus(todo){
    const updatedTodo = {
      _id: todo._id,
      text: todo.text,
      isCompleted: !todo.isCompleted
    }
    this.todosService.updateTodo(updatedTodo).subscribe(x =>{

    });
  }
  updateTodoText(todo, todoText){
    const updatedTodo = {
      _id: todo._id,
      text: todoText.value,
      isCompleted: todo.isCompleted
    }
    this.todosService.updateTodo(updatedTodo).subscribe(x =>{
      todo.text = todoText.value ;
      this.updateEditState(todo);
    });
  }
  deleteTodo(id){
    this.todosService.deleteTodo(id).subscribe( x => {
      this.todos = this.todos.filter( todo => todo._id !== id)
    })
  }
  ngOnInit() {
    this.todosService.fetchTodos().subscribe(todos =>{
      this.todos = todos;
    });
  }

}
