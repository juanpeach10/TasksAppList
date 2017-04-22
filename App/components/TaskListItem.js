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
  Card,
  CardItem
} from 'native-base';
import {Image} from 'react-native';

export default class TaskListItem extends Component {
  static propTypes = {
    name: React.PropTypes.string.isRequired,
    date: React.PropTypes.string.isRequired
  };
  constructor(props){
    super(props);
  }
  render() {
    return (
      <Container>
        <Content>
          <Card>
            <CardItem>
              <Left>
                <Body>
                  <Text style={{fontFamily: 'sans-serif-light'}}>{this.props.name}</Text>
                  <Text style={{fontFamily: 'sans-serif-light'}}>{this.props.date}</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Right>
                <Button transparent textStyle={{color: '#87838B'}} style={{marginTop: -10}}>
                  <Text>Ver Mas</Text>
                </Button>
              </Right>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}
