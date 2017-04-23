import React, { Component } from 'react';
import {
  Container,
  Content,
  Header,
  Icon,
  Input,
  Left,
  Text,
  Form,
  Item,
  Label,
  Body,
  Right,
  Button,
  ListItem
} from 'native-base';
import {Image} from 'react-native';

import SQLite from 'react-native-sqlite-storage';
import { Actions } from 'react-native-router-flux';

SQLite.DEBUG(true);
SQLite.enablePromise(false);

const database_name = "Task.db";
const database_version = "1.0";
const database_displayname = "Tasks Database";
const database_size = 200000;
let db;

export default class TaskDetail extends Component {
  static propTypes = {
    id: React.PropTypes.any
  };
  constructor(props){
    super(props);
    this.state = {
      name: '',
      date: '',
      image: ''
    };
  }
  componentWillMount(){
    this.initDB();
  }
  onBack(event){
    Actions.index();
  }
  initDB(){
    db = SQLite.openDatabase(database_name, database_version, database_displayname, database_size, this.openCB, this.errorCB);
    this.loadTasks(db);
  }
  loadTasks(db){
    var that = this;
    db.transaction(function(tx){
      tx.executeSql("SELECT * FROM Task WHERE task_id = ?",[that.props.id],
      function(tx, results){
        let row = results.rows.item(0);
        that.setState({
          date: row.date,
          name: row.name,
          photo: row.photo
        });
        console.log(row.photo);
      }, this.errorCB);
    }, that.errorCB, function () {
      console.log("Ready");
    });
  }
  errorCB(err){
    console.log("database error", err);
  }
  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={this.onBack}>
              <Icon name="ios-arrow-back-outline" style={{color: "#FFF"}} onPress={this.onAdd}/>
            </Button>
          </Left>
        </Header>
        <Content>
            <Form>
              <Item fixedLabel>
                <Label>{this.state.name}</Label>
                <Input />
              </Item>
              <Item fixedLabel last>
                <Label>{this.state.date}</Label>
                <Input />
              </Item>
            </Form>
            <Image source={{uri: this.state.photo}} style={{width: 100, height: 100}}/>
        </Content>
      </Container>
    );
  }
}
