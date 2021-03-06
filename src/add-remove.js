import TodoListItems from './todolist.js';
import * as storage from './storage.js';
import { changeStatus } from './interactive.js';

const updateListener = (taskss) => {
  TodoListItems(taskss);
  TodoListDelete(taskss);
  TodoListEdit(taskss);
  changeStatus(taskss);
  storage.setTasksToStorage(taskss);
};

const reindexTasks = (taskss) => {
  taskss.forEach((element, i) => {
    element.index = i;
  });
  return taskss;
};
const TodoListEdit = (tasks) => {
  const editTask = document.querySelectorAll('.item');
  editTask.forEach((i, index) => {
    i.addEventListener('change', (e) => {
      if (e.keyCode === 13) {
        e.preventDefault();
      }

      const task = {
        description: i.value,
        completed: false,
        index,
      };
      tasks[index] = task;
      reindexTasks(tasks);
      updateListener(tasks);
    });
  });
};
const TodoListDelete = (taskss) => {
  let removeTask = document.querySelectorAll('.item');
  removeTask.forEach((e, eindex) => {
    removeTask = document.querySelectorAll('.item');
    let deleteButton = e.parentNode.nextSibling.nextSibling;
    e.addEventListener('focus', () => {
      deleteButton = e.parentNode.nextSibling.nextSibling;
      if (deleteButton.classList[1] === 'fa-ellipsis-vertical') {
        deleteButton.classList.remove('fa-ellipsis-vertical');
        deleteButton.classList.add('fa-trash-can');
        deleteButton.addEventListener('click', () => {
          if (deleteButton.classList[1] === 'fa-trash-can') {
            taskss = reindexTasks(taskss);
            taskss = taskss.filter((t) => t.index !== eindex);
            taskss = reindexTasks(taskss);
            updateListener(taskss);
          }
        });
        removeTask.forEach((t) => {
          if (t !== e) {
            deleteButton = t.parentNode.nextSibling.nextSibling;
            deleteButton.classList.remove('fa-trash-can');
            deleteButton.classList.add('fa-ellipsis-vertical');
            deleteButton = e.parentNode.nextSibling.nextSibling;
            TodoListEdit(taskss);
          }
        });
      }
    });
  });
};
const TodoListAdd = (taskss) => {
  const addTask = document.querySelector('.text-area');
  addTask.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
      if (addTask.value.length < 2) {
        addTask.value = null;
        return;
      }
      const task = {
        description: addTask.value,
        completed: false,
        index: taskss.length,
      };
      taskss.push(task);
      updateListener(taskss);
      addTask.value = null;
    }
  });
};

export {
  TodoListAdd, TodoListDelete, reindexTasks, TodoListEdit,
};
