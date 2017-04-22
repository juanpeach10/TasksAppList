import React, { Component } from 'react';
import {
  Container,
  Content,
  Header,
  Item,
  Left,
  Input,
  Form,
  Text,
  Body,
  Icon,
  Button,
  Right,
  Footer,
  FooterTab
} from 'native-base';

export default class AddNewTask extends Component {
  onBack(){

  }
  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent>
                <Icon name="ios-arrow-back-outline" style={{color: "#FFF"}} onPress={this.onBack}/>
            </Button>
          </Left>
          <Body>
            <Text style={{color: "#FFF"}}>Agregar Tarea</Text>
          </Body>
        </Header>
        <Content>
          <Form>
            <Item>
              <Icon active name='home' />
              <Input placeholder='Nombre de la tarea'/>
            </Item>
            <Item>
              <Icon active name='home' />
              <Input placeholder='Fecha'/>
            </Item>
          </Form>
        </Content>
        <Footer>
          <FooterTab>
            <Button full>
              <Text>Cargar Foto</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}
