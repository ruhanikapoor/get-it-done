import { Component, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Task {
  name: string;
  category: string;
  completed: boolean;
  dateAdded: Date;
  dateModified: Date;
  deadline?: Date | null; // Optional property
}

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css',
})
export class TodoComponent {
  tasks: Task[] = [];

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

  isDarkMode: boolean = false;

  constructor() {
    this.loadTasksFromLocalStorage();
  }

  ngOnInit() {
    this.initializeTheme();
  }

  addTask() {
    if (!this.newTask.trim()) {
      this.inputError = 'Task cannot be empty!';
      return;
    }

    this.tasks.push({
      name: this.newTask,
      completed: false,
      category: this.selectedCategory,
      dateAdded: new Date(),
      dateModified: new Date(),
      deadline: this.newDeadline || null,
    });

    this.resetTaskInput();
    this.saveTasksToLocalStorage();
  }

  updateTask(index: number) {
    this.tasks[index].dateModified = new Date();
    this.saveTasksToLocalStorage();
  }

  deleteTask(task: Task) {
    this.tasks = this.tasks.filter((t) => t !== task);
    this.saveTasksToLocalStorage();
  }

  toggleCompletion(task: Task) {
    task.completed = !task.completed;
    task.dateModified = new Date();
    this.saveTasksToLocalStorage();
  }

  clearCompletedTasks() {
    this.tasks = this.tasks.filter((task) => !task.completed);
    this.saveTasksToLocalStorage();
  }

  get hasCompletedTasks(): boolean {
    return this.tasks.some((task) => task.completed);
  }

  getFilteredTasks(): Task[] {
    return this.filterCategory === 'All'
      ? this.tasks
      : this.tasks.filter((task) => task.category === this.filterCategory);
  }

  toggleDarkMode() {
    const htmlElement = document.documentElement;
    const newTheme = htmlElement.classList.contains('dark') ? 'light' : 'dark';
    htmlElement.classList.toggle('dark', newTheme === 'dark');
    localStorage.setItem('theme', newTheme);
    this.isDarkMode = newTheme === 'dark';
  }

  private initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
      this.isDarkMode = true;
    }
  }

  private resetTaskInput() {
    this.newTask = '';
    this.newDeadline = null;
    this.inputError = '';
  }

  private saveTasksToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  private loadTasksFromLocalStorage() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      this.tasks = JSON.parse(storedTasks);
    }
  }
}
