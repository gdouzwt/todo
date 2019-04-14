import {Component, OnInit} from '@angular/core';
import {TodoDataService} from "../service/data/todo-data.service";
import {Router} from "@angular/router";

export class Todo {

  constructor(
    public id: number,
    public description: string,
    public done: boolean,
    public targetDate: Date
  ) {

  }
}


@Component({
  selector: 'app-list-todos',
  templateUrl: './list-todos.component.html',
  styleUrls: ['./list-todos.component.css']
})
export class ListTodosComponent implements OnInit {


  todos: Todo[];

  message: string;

  //   [
  //   new Todo(1, 'Learn to Love', false, new Date()),
  //   new Todo(2, 'Become an Expert at Angular', false, new Date()),
  //   new Todo(3, 'To be with you', false, new Date()),
  // ];

  // todo = {
  //   id: 1,
  //   description: 'Learn to Love'
  // };

  constructor(
    private todoService: TodoDataService,
    private router: Router
  ) {
  }

  ngOnInit() {

    this.refreshTodo()
  }


  refreshTodo() {
    this.todoService.retrieveAllTodos('tao').subscribe(
      response => {
        console.log(response);
        this.todos = response;
      }
    )
  }

  deleteTodo(id) {
    console.log(`delete todo ${id}`);
    this.todoService.deleteTodo('tao', id).subscribe(
      response => {
        console.log(response);
        this.message = `Delete of Todo ${id} Successful!`;
        this.refreshTodo();
      }
    )
  }

  updateTodo(id) {
    console.log(`update todo ${id}`);
    // this.todoService.deleteTodo('tao', id).subscribe(
    //   response => {
    //     console.log(response);
    //     this.message = `Delete of Todo ${id} Successful!`;
    //     this.refreshTodo();
    //   }
    // )
    this.router.navigate(['todos', id])
  }

}
