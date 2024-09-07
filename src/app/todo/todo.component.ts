import { Component, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css',
})
export class TodoComponent {
  tasks: {
    name: string;
    completed: boolean;
    category: string;
    dateAdded: Date;
    dateModified: Date;
    deadline: Date | null;
  }[] = [];

  newTask: string = '';

  inputError: string = '';

  selectedCategory: string = 'General';

  categories: string[] = [
    'General',
    'Work',
    'Personal',
    'Home',
    'Fitness',
    'Learning',
    'Shopping',
    'Hobbies',
    'Health',
    'Social',
    'Travel',
  ];

  filterCategory: string = 'All';

  newDeadline: Date | null = null;


  constructor() {
    this.loadTasksFromLocalStorage();
  }

  addTask() {
    if (!this.newTask.trim()) {
      this.inputError = 'Task cannot be empty!';
      return;
    }
    this.inputError = '';
    this.tasks.push({
      name: this.newTask,
      completed: false,
      category: this.selectedCategory,
      dateAdded: new Date(),
      dateModified: new Date(),
      deadline: this.newDeadline || null,
    });
    this.newTask = '';
    this.newDeadline = null;
    this.inputError = '';
    this.saveTasksToLocalStorage();
  }

  updateTask(index: number) {
    this.tasks[index].dateModified = new Date();
    this.saveTasksToLocalStorage();
  }

  deleteTask(index: number) {
    this.tasks.splice(index, 1);
    this.saveTasksToLocalStorage();
  }

  toggleCompletion(index: number) {
    this.tasks[index].completed = !this.tasks[index].completed;
    this.updateTask(index);
  }

  saveTasksToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  loadTasksFromLocalStorage() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      this.tasks = JSON.parse(storedTasks);
    }
  }

  clearCompletedTasks() {
    this.tasks = this.tasks.filter((task) => !task.completed);
    this.saveTasksToLocalStorage();
  }

  get hasCompletedTasks(): boolean {
    return this.tasks.some((task) => task.completed);
  }

  getFilteredTasks() {
    if (this.filterCategory === 'All') {
      return this.tasks;
    }
    return this.tasks.filter((task) => task.category === this.filterCategory);
  }
}
