import React, { Component } from 'react'
import { connect } from 'react-redux'

import PageHeader from '../template/pageHeader'
import TaskForm from './taskForm'
import TaskList from './taskList'
import TaskEdit from './taskEdit'
import If from '../template/if'

class Task extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <PageHeader name='Tarefas' small='Cadastro'></PageHeader>
                <TaskForm />
                
                <If test={!this.props.taskEdit.task}>
                    <TaskList />
                </If>

                <If test={this.props.taskEdit.task}>
                    <TaskEdit />
                </If>
            </div>
        )
    }
}


const mapStateToProps = state => ({
    taskEdit: state.task.taskEdit
})

export default connect(mapStateToProps)(Task)

