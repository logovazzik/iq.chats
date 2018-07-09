import React, {Component} from 'react';
import Chats from './chats/containers/chats/chats'
import './app.scss';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Chats/>
            </div>
        );
    }
}

export default App;
