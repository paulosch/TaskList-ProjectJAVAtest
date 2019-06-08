import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Grid from '../template/grid'
import IconButton from '../template/iconButton'
import { add, changetitle, changedescription, search, clear } from './taskActions'

class taskForm extends Component {
    constructor(props) {
        super(props)
        this.keyHandler = this.keyHandler.bind(this)
    }

    keyHandler(e) {
        const { add, clear, search, title, description } = this.props
        if (e.key === 'Enter') {
            e.shiftKey ? search() : add(title, description)
        } else if (e.key === 'Escape') {
            clear()
        }
    }

    componentWillMount() {
        this.props.search()
    }

    render() {
        const { add, clear, search, title } = this.props

        return (
            <div role='form' className='taskForm'>

                <Grid cols='12 6 5'>
                    <input id='title' className='form-control'
                        placeholder='Título ou busque com "Shift-Enter"'
                        onChange={this.props.changetitle}
                        onKeyUp={this.keyHandler}
                        value={this.props.title}></input>
                </Grid>

                <Grid cols='12 6 5'>
                    <input id='description' className='form-control'
                        placeholder='Adicione uma descrição e tecle "Enter" para salvar'
                        onChange={this.props.changedescription}
                        onKeyUp={this.keyHandler}
                        value={this.props.description}></input>
                </Grid>

                <Grid cols='12 2 2'>

                    <IconButton style='primary' icon='plus'
                        onClick={() => add(title, description)} />

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
    title: state.task.title,
    description: state.task.description
})

const mapDispatchToProps = dispatch => bindActionCreators({
    add,
    clear,
    changetitle,
    changedescription,
    search
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(taskForm)