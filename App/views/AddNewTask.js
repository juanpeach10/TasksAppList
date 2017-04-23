import React, { Component } from 'react';
import Image from 'react-native';
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
import ImagePicker from 'react-native-image-picker';
import SQLite from 'react-native-sqlite-storage';
import { Actions } from 'react-native-router-flux';

SQLite.DEBUG(true);
SQLite.enablePromise(false);

const database_name = "Task.db";
const database_version = "1.0";
const database_displayname = "Tasks Database";
const database_size = 200000;
let db;

export default class AddNewTask extends Component {
  constructor(props){
    super(props);
    this.state = {
      imageSource: '',
      imagePath: '',
      taskName: '',
      fileName: '',
      db: ''
    };
    this.onClickButton = this.onClickButton.bind(this);
    this.onSave = this.onSave.bind(this);
  }
  componentWillMount(){
    this.initDB();
  }
  componentWillUnmount(){
    this.closeDatabase();
  }
  initDB(){
    db = SQLite.openDatabase(database_name, database_version, database_displayname, database_size, this.openCB, this.errorCB);
    this.populateDatabase(db);
  }
  openCB(){
    console.log("database opened");
  }
  closeCB(){
    console.log("database closed");
  }
  errorCB(err){
    console.log("database error", err);
  }
  successCB(){
    console.log("success transaction");
  }
  onBack(e){
    Actions.index();
  }
  closeDatabase(){
    var that = this;
    if (db) {
        console.log("Closing database ...");
        db.close(that.closeCB,that.errorCB);
    } else {
        console.log("Database was not OPENED");
    }
  }
  populateDatabase(db){
    var that = this;
    db.transaction(that.populateDB, that.errorCB, function () {
      console.log("Populates");
    });
  }
  populateDB(tx){
    tx.executeSql('CREATE TABLE IF NOT EXISTS Task( '
        + 'task_id INTEGER PRIMARY KEY NOT NULL, '
        + 'name VARCHAR(100), '
        + 'date VARCHAR(100), '
        + 'photo BLOB ) ; ', [], this.successCB, this.errorCB);
  }
  onClickButton(e){
    const self = this;
    ImagePicker.showImagePicker(null , (response) => {
        const source = {uri: response.uri};
        console.log(response);
        this.setState({
          imageSource: 'data:image/jpeg;base64,' + response.data,
          imagePath: response.path,
          fileName: response.fileName
        });
    });
  }
  onSave(e){
    var that = this;

    db.transaction(function(tx){
      tx.executeSql('INSERT INTO Task (name, date, photo) VALUES("'+ that.state.taskName +'","'+ that.state.date +'","'+ that.state.imageSource +'")', [],
        function(tx,results){
         alert('Tarea agregada correctamente');
         Actions.index();
        },
        function(err){
          console.log(err);
          alert('Error inesperado, intente de nuevo');
       });
    });
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
              <Icon active name='bookmark' style={{color:"#9E9E9E"}}/>
              <Input
                placeholder='Nombre de la tarea'
                value={this.state.taskName}
                onChangeText={(text) => this.setState({taskName: text})}/>
            </Item>
            <Item>
              <Icon active name='calendar' style={{color:"#9E9E9E"}}/>
              <Input
                placeholder='Fecha'
                value={this.state.date}
                onChangeText={(text) => this.setState({date: text})}/>
            </Item>
            <Item>
               <Icon active name='ios-image' style={{color:"#9E9E9E"}}/>
               <Input
                 placeholder='Seleccionar imagen'
                 value={this.state.fileName}
                 onFocus={this.onClickButton}/>
            </Item>
          </Form>
        </Content>
        <Footer>
          <FooterTab>
            <Button full onPress={this.onSave}>
              <Text>Guardar</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}
