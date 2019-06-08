import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import IconButton from '../template/iconButton'

import { markAsDone, markAsPending, remove, editDescription, openEdit } from './taskActions'

const taskList = props => {

    const getDate = timeStamp => {
        var t = new Date( timeStamp )
        return t.toLocaleDateString() + ' ' + t.toLocaleTimeString()
    }

    const renderRows = () => {
        const list = props.list || []

        return list.map(task => (
            <tr key={task.ID}>

                <td className={task.status.includes('deleted') ? 'hidden' : ''}>
                    <small>
                        Criada: {getDate(task.creatAt)}
                    </small>
                    <br/>
                    <small className={!task.status.includes('done') ? 'hidden' : ''}>
                        Conluída: {getDate(task.doneAt)}
                    </small>
                    <br/>
                </td>

                <td className={!task.status.includes('deleted') ? 'hidden' : ''}>
                    <small>
                        Criada: {getDate(task.creatAt)}
                        <br />
                        Excluída: {getDate(task.editAt)}
                    </small>
                </td>

                <td className={task.status.includes('done') ? 'markedAsDone' : ''}>
                    {task.title}
                </td>
                
                <td className={task.status.includes('done') ? 'markedAsDone' : ''}>
                    {task.description}
                </td>

                <td className={task.status.includes('deleted') ? 'hidden' : ''}>
                    <IconButton style='success' icon='check' 
                        hide={task.status.includes('done') ? true : false}
                        onClick={() => props.markAsDone(task)}>
                    </IconButton>

                    <IconButton style='warning' icon='undo'
                        hide={!task.status.includes('done') ? true : false }
                        onClick={() => props.markAsPending(task)}>
                    </IconButton>

                    <IconButton style='danger' icon='trash-o'
                        hide={!task.status.includes('done') ? true : false}
                        onClick={() => props.remove(task)}>
                    </IconButton>
                </td>

                <td className={!task.status.includes('deleted') ? 'hidden' : ''}>
                    <IconButton style='warning' icon='refresh'
                        hide={ false }
                        onClick={() => props.markAsPending(task, true)}>
                    </IconButton>
                </td>
            </tr>
        ))
    }

    return (
        <table className='table'>
            <thead>
                <tr>
                    <th>Edição</th>
                    <th>Título</th>
                    <th>Descrição</th>
                    <th className='tableActions'>Ações</th>
                </tr>
            </thead>
            <tbody>
                {renderRows()}
            </tbody>
        </table>
    )
}

const mapStateToProps = state => ({
    list: state.task.list
})

const mapDispatchToProps = dispatch => bindActionCreators({
    markAsDone,
    markAsPending,
    remove,
    editDescription,
    openEdit
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(taskList)