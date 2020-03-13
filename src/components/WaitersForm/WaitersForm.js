import React, {useState} from 'react';
import styles from './WaitersForm.module.css';
import {connect} from "react-redux";
import { useHistory } from 'react-router-dom';
import { onWaitersSave } from '../../store/actions/waiters'

function WaitersForm({ item, onWaitersSave }) {
    
    const [waiter, setWaiter] = useState(item);
    const history = useHistory();
    
    function onChangeWaiter(e) {
        setWaiter ({
            ...waiter,
            [e.target.name]: e.target.value
        })
    }
    
    function onFormSubmit(e) {
        e.preventDefault();
        onWaitersSave(waiter);
        history.goBack();
    }
    
    return (
        <form className = { styles.groups_wrap } onSubmit = { onFormSubmit}>
            <div className = { styles.form_wrap }>
                <div>Name</div>
                <input className = { styles.input } type="text" name = 'name' value = { waiter.name } onChange = { onChangeWaiter } />
                <div>Salary</div>
                <input className = { styles.input } type="text" name = 'salary' value = { waiter.salary } onChange = { onChangeWaiter } />
                <div>StartDate</div>
                <input className = { styles.input } type="text" name = 'startDate' value = { waiter.startDate } onChange = { onChangeWaiter } />
                <button className = { styles.btn_save }>Save</button>
            </div>
        </form>
    );
}

function mapStateToProps(state, {id}) {
    return {
        item: id !== 'new'
            ? state.waiters.listWaiters.find(item => item.id ===id)
            : { id: '', name: '', description: '', sitsCount: '' }
    }
}

const mapDispatchToProps = {
    onWaitersSave: onWaitersSave
};

export default connect(mapStateToProps, mapDispatchToProps)(WaitersForm);
