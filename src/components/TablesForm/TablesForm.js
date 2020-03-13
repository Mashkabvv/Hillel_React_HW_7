import React, {useState} from 'react';
import styles from './TablesForm.module.css';
import {connect} from "react-redux";
import { useHistory } from 'react-router-dom';
import { onTableSave } from '../../store/actions/tables'

function TablesForm({ item, onTableSave }) {
    
    const [table, setTable] = useState(item);
    const history = useHistory();
    
    function onChangeTable(e) {
        setTable ({
            ...table,
            [e.target.name]: e.target.value
        })
    }
    
    function onFormSubmit(e) {
        e.preventDefault();
        onTableSave(table);
        history.goBack();
    }
    
    return (
        <form className = { styles.groups_wrap } onSubmit = { onFormSubmit}>
            <div className = { styles.form_wrap }>
                <div>Name</div>
                <input className = { styles.input } type="text" name = 'name' value = { table.name } onChange = { onChangeTable } />
                <div>Description</div>
                <input className = { styles.input } type="text" name = 'description' value = { table.description } onChange = { onChangeTable } />
                <div>SitsCount</div>
                <input className = { styles.input } type="text" name = 'sitsCount' value = { table.sitsCount } onChange = { onChangeTable } />
                <button className = { styles.btn_save }>Save</button>
            </div>
        </form>
    );
}

function mapStateToProps(state, {id}) {
    return {
        item: id !== 'new'
            ? state.tables.listTables.find(item => item.id ===id)
            : { id: '', name: '', description: '', sitsCount: '' }
    }
}

const mapDispatchToProps = {
    onTableSave: onTableSave
};

export default connect(mapStateToProps, mapDispatchToProps)(TablesForm);
