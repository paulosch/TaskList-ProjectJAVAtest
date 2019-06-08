import React from 'react'

export default props => (
    <nav className="navbar-inverse bg-inverse">
        <div className="container">
            <div className="navbar-header">
                <a className="navbar-brand" href="#">
                    <i className="fa fa-calendar-check-o"></i> TaskList App
                </a>
            </div>

            <div id="navbar" className="navbar-collapse collapse">
                <ul className="nav navbar-nav">
                    <li><a href="#/tasks">Tarefas</a></li>
                    <li><a href="#/trash">Lixeira</a></li>
                </ul>
            </div>
        </div>
    </nav>
)