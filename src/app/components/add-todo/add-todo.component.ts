import { Component, OnInit } from '@angular/core';
import { TodosService } from '../../services/todos.service';
import { Todo } from '../../models/Todo';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent implements OnInit {

  constructor(private todosService: TodosService) { }

  addTodo(todoText){
    const newTodo: Todo = {
      text: todoText.value,
      isCompleted: false
    }

    this.todosService.addTodo(newTodo).subscribe(x => {
      todoText.value = '';
    });
  }
  ngOnInit() {
  }

}
