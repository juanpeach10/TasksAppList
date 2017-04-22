import React, { Component } from 'react';
import TaskList from '../components/TaskList';
import { Actions } from 'react-native-router-flux';
import {
  Container,
  Content,
  Header,
  Icon,
  Left,
  Text,
  Body,
  Right,
  Button
} from 'native-base';

export default class Index extends Component {
  onAdd(event){
    Actions.new_task();
  }
  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Text style={{color: "#FFF"}}>Lista de Tareas</Text>
          </Left>
          <Right>
            <Button transparent onPress={this.onAdd}>
              <Icon name="add" style={{color: "#FFF"}} onPress={this.onAdd}/>
            </Button>
          </Right>
        </Header>
        <Content>
          <TaskList/>
        </Content>
      </Container>
    );
  }
}
