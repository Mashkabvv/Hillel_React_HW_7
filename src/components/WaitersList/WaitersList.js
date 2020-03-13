import React from 'react';
import styles from './WaitersList.module.css';
import { connect } from "react-redux";
import { Link, useRouteMatch } from 'react-router-dom';
import { onDelete, onSearch } from '../../store/actions/waiters'

//components

function WaitersList({listWaiters, search, onDelete, onSearch}) {
    const { url } = useRouteMatch();
    
    function onChangeSearch(e) {
        onSearch(e.target.value)
    }
    
    return (
        <div>
            <div>Search</div>
            <input className = { styles.input } type="text" value = { search } onChange = { onChangeSearch } />
            <table className = { styles.tables }>
                <thead>
                <tr className = { styles.tables_head }>
                    <td className = { `${styles.tables_title} ${styles.tables_item}` }>Waiters</td>
                    <td className = { `${styles.tables_title} ${styles.tables_item}` }>Tables?..</td>
                    <td className = {styles.tables_item} />
                </tr>
                </thead>
        
                {
                    listWaiters.map(item =>
                        <tbody key = { item.id }>
                        <tr className = { styles.tables_row }>
                            <td className = { styles.tables_item }>
                                <Link className = { styles.link } to = { `${url}/${item.id}` }>
                                    <div>{ item.name }</div>
                                    <div>salary: <span>{ item.salary }</span></div>
                                    <div>startDate: <span>{ item.startDate }</span></div>
                                </Link>
                            </td>
                            <td className = { styles.tables_item }></td>
                            <td className = { styles.tables_item }>
                                <button className = { styles.btn_del } onClick = { () => onDelete(item.id) }>Del</button>
                            </td>
                        </tr>
                        </tbody>)
                }
            </table>
        </div>
        
        
    );
}

function mapStateToProps(state) {
    // console.log(state);
    const searchRegExp = new RegExp(state.waiters.search, 'gi');
    
    return {
        listWaiters: state.waiters.listWaiters.filter(item => item.name.match(searchRegExp)),
        search: state.waiters.search
    }
}

const mapDispatchToProps = {
    onDelete: onDelete,
    onSearch: onSearch
};

export default connect(mapStateToProps, mapDispatchToProps)(WaitersList);
