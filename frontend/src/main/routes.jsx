import React, { Component } from 'react'
import { Route, HashRouter, Switch } from 'react-router-dom'

import task from '../task/task'
import Trash from '../trash/trash'
 
export default class Routes extends Component {
    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route path="/tasks" component={task} />
                    <Route path="/trash" component={Trash} />
                    <Route component={task} />
                </Switch>
            </HashRouter> 
        )
    }
}