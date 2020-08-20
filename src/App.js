import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Checkout from './screens/checkout/Checkout';

const App = () => (
    <Switch>
        <Route exact path='/checkout' render={({history}, props) => <Checkout {...props} history={history}/>} />
    </Switch>
)
export default App;