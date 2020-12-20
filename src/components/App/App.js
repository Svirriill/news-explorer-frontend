import React from 'react';
import {
    BrowserRouter, Switch, Route
} from 'react-router-dom';
import './App.css';
import Main from '../Main/Main';
import SavedNews from '../SavedNews/SavedNews';

const App = () => {
    const [isRegister, setIsRegister] = React.useState(false);
    const [isLoginOpen, setIsLoginOpen] = React.useState(false);
    const [isConfirmOpen, setIsConfirmOpen] = React.useState(false);


    return (
        <div className="page">
            <BrowserRouter>
                <Switch>
                    <Route
                        exact
                        path='/saved-news'
                    >
                        <SavedNews />
                    </Route>
                    <Route exact path='/'>
                        <Main
                            isRegister={isRegister}
                            setIsRegister={setIsRegister}
                            isConfirmOpen={isConfirmOpen}
                            setIsConfirmOpen={setIsConfirmOpen}
                            isLoginOpen={isLoginOpen}
                            setIsLoginOpen={setIsLoginOpen}
                        />
                    </Route>
                </Switch>
            </BrowserRouter>
        </div>
    );
};

export default App;