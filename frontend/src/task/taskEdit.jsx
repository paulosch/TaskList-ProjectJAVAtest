import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Grid from '../template/grid'
import IconButton from '../template/iconButton'
import { edit, changeTasktitle, changeTaskdescription, clear } from './taskActions'

class TaskEdit extends Component {
    constructor(props) {
        super(props)
        this.keyHandler = this.keyHandler.bind(this)
        console.log(this.props)
    }

    keyHandler(e) {
        const { edit, clear, task } = this.props
        if (e.key === 'Enter') {
            edit(task)
        } else if (e.key === 'Escape') {
            clear()
        }
    }

    render() {
        const { edit, clear, taskEdit } = this.props

        return (
            <div role='form' className='taskForm'>

                <Grid cols='12 6 5'>
                    <input id='title' className='form-control'
                        placeholder='Altere o título'
                        onChange={this.props.changeTasktitle}
                        onKeyUp={this.keyHandler}
                        value={taskEdit.task.title}></input>
                </Grid>

                <Grid cols='12 6 5'>
                    <input id='description' className='form-control'
                        placeholder='Altere a descrição e tecle "Enter" para salvar'
                        onChange={this.props.changeTaskdescription}
                        onKeyUp={this.keyHandler}
                        value={taskEdit.task.description}></input>
                </Grid>

                <Grid cols='12 2 2'>
                    <IconButton style='primary' icon='plus'
                        onClick={() => edit(task)} />

                    <IconButton style='default' icon='close'
                        onClick={clear} />
                </Grid>
                
            </div>
        )
    }
}

const mapStateToProps = state => ({
    taskEdit: state.task.taskEdit
})

const mapDispatchToProps = dispatch => bindActionCreators({
    edit,
    clear,
    changeTasktitle,
    changeTaskdescription
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(TaskEdit)