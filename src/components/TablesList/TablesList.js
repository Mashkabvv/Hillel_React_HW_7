import React from 'react';
import styles from './TablesList.module.css';
import { connect } from "react-redux";
import { Link, useRouteMatch } from 'react-router-dom';
import { onDelete, onSearch } from '../../store/actions/tables'

//components

function TablesList({listTables, search, onDelete, onSearch}) {
    
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
                    <td className = { `${styles.tables_title} ${styles.tables_item}` } colSpan={2}>Tables</td>
                </tr>
                </thead>
        
                {
                    listTables.map(item =>
                        <tbody key = { item.id }>
                        <tr className = { styles.tables_row }>
                            <td className = { styles.tables_item }>
                                <Link className = { styles.link } to = { `${url}/${item.id}` }>
                                    <div>{ item.name }</div>
                                    <div>{ item.description }</div>
                                    <div>sitsCount: <span>{ item.sitsCount }</span></div>
                                </Link>
                            </td>
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
    const searchRegExp =new RegExp(state.tables.search, 'gi');
    
    return {
        listTables: state.tables.listTables.filter(item => item.name.match(searchRegExp)),
        search: state.tables.search
    }
}

const mapDispatchToProps = {
    onDelete: onDelete,
    onSearch: onSearch
};

export default connect(mapStateToProps, mapDispatchToProps)(TablesList);
