import { ADD_TASK, GET_TASKS, DELETE_TASK, EDIT_TASK, COMPLETE_ALL } from '../constants/ActionTypes';

export default function todos(state = [], action) {
  switch (action.type) {
    case ADD_TASK:
      return [
        action.task,
        ...state
      ];

    case GET_TASKS:
      return action.tasks

    case EDIT_TASK:
      return state.map((todo) =>
        todo.id === action.task.id ?
          { ...todo, ...action.task } :
          todo
      );

    case DELETE_TASK:
      return state.filter((todo) =>
        todo.id !== action.task.id
      );

    case COMPLETE_ALL:
      const areAllMarked = state.every(todo => todo.completed)
      return state.map(todo => ({
        ...todo,
        completed: !areAllMarked
      }));


    default:
      return state;
  }
}
