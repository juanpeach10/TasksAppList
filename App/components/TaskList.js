import React, { Component } from 'react';
import TaskListItem from './TaskListItem';
import {
  Container,
  Content,
  Header,
  List,
  Icon,
  Left,
  Text,
  Body
} from 'native-base';

import SQLite from 'react-native-sqlite-storage';

SQLite.DEBUG(true);
SQLite.enablePromise(false);

const database_name = "Task.db";
const database_version = "1.0";
const database_displayname = "Tasks Database";
const database_size = 200000;
let db;

export default class TaskList extends Component {
  constructor(){
    super();
    this.state = {
      tasks: []
    };
  }
  componentWillMount(){
    this.initDB();
  }
  initDB(){
    db = SQLite.openDatabase(database_name, database_version, database_displayname, database_size, this.openCB, this.errorCB);
    this.loadTasks(db);
  }
  loadTasks(db){
    var that = this;
    db.transaction(function(tx){
      tx.executeSql("SELECT * FROM Task",[],
      function(tx, results){
        var len = results.rows.length;
        var object = [];
        for (let i = 0; i < len; i++) {
            let row = results.rows.item(i);
            var obj = new Object();
            obj.id = row.task_id;
            obj.name = row.name;
            obj.date = row.date;
            obj.photo = row.photo;
            object.push(obj);
        }
        that.setState({tasks: object});
      }, this.errorCB);
    }, that.errorCB, function () {
      console.log("Ready");
    });
  }
  errorCB(err){
    console.log("database error", err);
  }
  render() {
    let tasks = this.state.tasks.map((task, index, array) => {
      return <TaskListItem
                key={index}
                date={task.date}
                name={task.name}
                photo={task.photo}
                id={task.id}/>
    });
    return (
      <Container>
        <List>
          {tasks}
        </List>
      </Container>
    );
  }
}
