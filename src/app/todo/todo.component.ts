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
  tasks: {name: string, completed: boolean}[] = [];
  newTask: string = '';

  addTask(){
    if(this.newTask.trim()){
      this.tasks.push({name: this.newTask, completed: false});
      this.newTask = '';
    }
  }

  deleteTask(index: number){
    this.tasks.splice(index, 1);
  }

  toggleCompletion(index: number){
    this.tasks[index].completed = !this.tasks[index].completed;
  }

}
