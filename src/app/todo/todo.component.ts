import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent {
  tasks: string[] = [];
  newTask: string = '';

  addTask(){
    if(this.newTask.trim()){
      this.tasks.push(this.newTask);
      this.newTask = '';
    }
  }
}
