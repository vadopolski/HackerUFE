import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
    render() {
        return (
            <React.Fragment>
                <div>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <h3>Test Project</h3>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <form id="form1" action="">
                                    <div className="form-group">
                                        <label htmlFor="taskData">Название напоминания</label>
                                        <input type="text" className="form-control" id="taskData"
                                               aria-describedby="taskDataHelp" placeholder="Занятие"/>
                                        <small id="taskDataHelp" className="form-text text-muted">Введите название
                                            занятия
                                            на завтра.
                                        </small>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="reminderData">Когда напомнить</label>
                                        <div className="input-group">
                                            <div onClick={null} className="input-group-prepend">
                                        <span className="input-group-text" id="calendarOpener"><i
                                            className="fa fa-calendar"></i></span>
                                            </div>
                                            <input readOnly type="text" className="form-control" id="reminderData"
                                                   aria-describedby="reminderDataHelp" placeholder="Напомнить"/>
                                        </div>
                                        <small id="reminderDataHelp" className="form-text text-muted">Введите дату и
                                            время
                                            напоминания.
                                        </small>
                                    </div>
                                    <div className="form-group form-check">
                                        <input type="checkbox" className="form-check-input" id="Check1"
                                               value="some data"/>
                                        <label className="form-check-label" htmlFor="exampleCheck1">Важно</label>
                                    </div>

                                    <button type="button" className="btn btn-primary" onClick={null}>Add task
                                    </button>
                                    <button type="button" className="btn btn-light" onClick={null}>Clear Form</button>
                                </form>
                            </div>
                            <div className="col-md-6">
                                <div className="card" style={{width: '100%'}}>
                                    <div className="card-body">
                                        <h4 className="card-title">Список дел на ближайшее время:</h4>
                                        <ul className="list-group" id="task_list">
                                        </ul>
                                        <br/>
                                        <a href="#" onClick={null} className="btn btn-primary">Clear List</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default App;