import React, {Component} from 'react';
import logo from './logo.svg';
import Logo from './components/logo';
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <Logo num={3}>
                        <h5></h5>
                    </Logo>
                </header>
            </div>
        );
    }
}

export default App;
