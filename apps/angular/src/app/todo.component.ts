import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Todo {
  title: string;
  content: string;
  date: string;
}

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class TodoComponent {
  todos: Todo[] = [];
  newTodo: Todo = { title: '', content: '', date: '' };
  sortColumn: keyof Todo | '' = '';
  sortAsc: boolean = true;
  dragIndex: number | null = null;

  addTodo() {
    if (this.newTodo.title && this.newTodo.content && this.newTodo.date) {
      this.todos.push({ ...this.newTodo });
      this.newTodo = { title: '', content: '', date: '' };
    }
  }

  deleteTodo(index: number) {
    this.todos.splice(index, 1);
  }

  sortBy(column: keyof Todo) {
    if (this.sortColumn === column) {
      this.sortAsc = !this.sortAsc;
    } else {
      this.sortColumn = column;
      this.sortAsc = true;
    }
    this.todos.sort((a, b) => {
      if (a[column] < b[column]) return this.sortAsc ? -1 : 1;
      if (a[column] > b[column]) return this.sortAsc ? 1 : -1;
      return 0;
    });
  }

  onDragStart(index: number) {
    this.dragIndex = index;
  }

  onDrop(index: number) {
    if (this.dragIndex === null || this.dragIndex === index) return;
    const moved = this.todos.splice(this.dragIndex, 1)[0];
    this.todos.splice(index, 0, moved);
    this.dragIndex = null;
  }
}
