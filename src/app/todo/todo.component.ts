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

  constructor(){
    this.loadTasksFromLocalStorage();
  }

  addTask(){
    if(this.newTask.trim()){
      this.tasks.push({name: this.newTask, completed: false});
      this.newTask = '';
      this.saveTasksToLocalStorage();
    }
  }

  deleteTask(index: number){
    this.tasks.splice(index, 1);
    this.saveTasksToLocalStorage();
  }

  toggleCompletion(index: number){
    this.tasks[index].completed = !this.tasks[index].completed;
    this.saveTasksToLocalStorage();
  }

  saveTasksToLocalStorage(){
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  loadTasksFromLocalStorage(){
    const storedTasks = localStorage.getItem('tasks');
    if(storedTasks){
      this.tasks = JSON.parse(storedTasks);
    }
  }

}
