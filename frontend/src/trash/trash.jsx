import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import PageHeader from '../template/pageHeader'
import TaskList from '../task/taskList'
import { search } from '../task/taskActions'

class Trash extends Component {

    componentWillMount() {
        this.props.search(true)
    }

    render() {
        return (
            <div>
                <PageHeader name='Tarefas' small='Excluídas'></PageHeader>
                <TaskList />
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    search
}, dispatch)

export default connect(null, mapDispatchToProps)(Trash)