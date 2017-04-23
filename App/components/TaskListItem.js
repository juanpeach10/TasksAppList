import React, { Component } from 'react';
import {
  Container,
  Content,
  Header,
  Icon,
  Left,
  Text,
  Body,
  Right,
  Button,
  ListItem
} from 'native-base';
import {Image} from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class TaskListItem extends Component {
  static propTypes = {
    name: React.PropTypes.string.isRequired,
    date: React.PropTypes.string.isRequired,
    id: React.PropTypes.any.isRequired
  };
  constructor(props){
    super(props);
    this.onPress = this.onPress.bind(this);
  }
  onPress(event){
    Actions.task_detail({id: this.props.id});
  }
  render() {
    return (
      <ListItem onPress={this.onPress}>
        <Left>
          <Text style={{fontFamily: 'sans-serif-light'}}>{this.props.name}</Text>
          <Text style={{fontFamily: 'sans-serif-light'}}>{this.props.date}</Text>
        </Left>
        <Right>
          <Icon name="ios-arrow-forward-outline" onPress={this.onPress}/>
        </Right>
      </ListItem>
    );
  }
}
