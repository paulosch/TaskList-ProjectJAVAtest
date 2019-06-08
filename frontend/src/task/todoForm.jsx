import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Grid from '../template/grid'
import IconButton from '../template/iconButton'
import { add, changeDescription, search, clear } from './taskActions'

class taskForm extends Component {
    constructor(props) {
        super(props)
        this.keyHandler = this.keyHandler.bind(this)
    }

    keyHandler(e) {
        const { add, clear, search, description } = this.props
        if (e.key === 'Enter') {
            e.shiftKey ? search() : add(description)
        } else if (e.key === 'Escape') {
            clear()
        }
    }

    componentWillMount() {
        this.props.search()
    }

    render() {
        const { add, clear, search, description } = this.props

        return (
            <div role='form' className='taskForm'>

                <Grid cols='12 9 10'>
                    <input id='description' className='form-control'
                        placeholder='Adicione uma tarefa com "Enter" ou busque com "Shift-Enter"'
                        onChange={this.props.changeDescription}
                        onKeyUp={this.keyHandler}
                        value={this.props.description}></input>
                </Grid>

                <Grid cols='12 3 2'>

                    <IconButton style='primary' icon='plus'
                        onClick={() => add(description)} />

                    <IconButton style='info' icon='search'
                        onClick={search} />

                    <IconButton style='default' icon='close'
                        onClick={clear} />
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    description: state.task.description
})

const mapDispatchToProps = dispatch => bindActionCreators({
    add,
    clear,
    changeDescription,
    search
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(taskForm)