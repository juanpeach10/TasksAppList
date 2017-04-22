import React, { Component } from 'react';
import TaskListItem from './TaskListItem';
import {
  Container,
  Content,
  Header,
  Icon,
  Left,
  Text,
  Body
} from 'native-base';

export default class TaskList extends Component {
  constructor(){
    super();
    this.state = {
      tasks: [{"id":"1","name":"My Task Example","date":"22/Abril/2017","photo":"http://react-etc.net/files/2016-07/logo-578x270.png"},{"id":"2","name":"My Task Example","date":"22/Abril/2017","photo":"http://react-etc.net/files/2016-07/logo-578x270.png"},{"id":"3","name":"My Task Example","date":"22/Abril/2017","photo":"http://react-etc.net/files/2016-07/logo-578x270.png"},{"id":"4","name":"My Task Example","date":"22/Abril/2017","photo":"http://react-etc.net/files/2016-07/logo-578x270.png"},{"id":"5","name":"My Task Example","date":"22/Abril/2017","photo":"http://react-etc.net/files/2016-07/logo-578x270.png"}]
    };
  }
  render() {
    let tasks = this.state.tasks.map((task, index, array) => {
      return <TaskListItem key={index} date={task.date} name={task.name} photo={task.photo}/>
    });
    return (
      <Container>
        {tasks}
      </Container>
    );
  }
}
