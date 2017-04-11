import * as types from '../constants/ActionTypes'
import Syncano from 'syncano-client';

const s = new Syncano('syncano-redux-todo');

function receiveTask(type, task) {
  return { type, task }
};

function receiveTasks(type, tasks) {
  return { type, tasks }
};

export const addTask = (text) => {
  return (dispatch) => {
    s.post('todo/addTask', {
      title: text,
      completed: false
    })
    .then((task) => {
      dispatch(receiveTask(types.ADD_TASK, task))
    });
  }
}
export const getTasks = () => {
  return (dispatch) => {
    s.get('todo/getTasks')
    .then((tasks) => {
      dispatch(receiveTasks(types.GET_TASKS, tasks))
    });
  }
}
export const editTask = (id, body) => {
  return (dispatch) => {
    s.post('todo/editTask', {
      id,
      ...body
    })
    .then((task) => {
      dispatch(receiveTask(types.EDIT_TASK, task))
    });
  }
}
export const deleteTask = (id) => {
  return (dispatch) => {
    s.post('todo/deleteTask', {
      id
    })
    .then(() => {
      dispatch(receiveTask(types.DELETE_TASK, { id }))
    });
  }
}
export const completeAll = () => ({ type: types.COMPLETE_ALL })
