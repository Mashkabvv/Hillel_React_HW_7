import React, { useEffect } from 'react';
import styles from './Tables.module.css';
import { Route, Switch, Link, useRouteMatch } from 'react-router-dom';
import {connect} from "react-redux";
import { getTables } from '../../store/actions/tables';

//components
import TablesList from '../TablesList/TablesList';
import TablesForm from "../TablesForm/TablesForm";

function Tables({ getTables, isLoading }) {
    
    const { path, url } = useRouteMatch();
    
    useEffect(() => {
        getTables();
    },[]);
    
    return (
        <div className = { styles.groups_wrap }>
            {
                isLoading ? 'LOADING...' :
                    <Switch>
                        <Route exact path = {`${path}/`}>
                            <TablesList />
                            <Link className = { styles.btn_add } to = {`${url}/new`}>Add table</Link>
                        </Route>
                        <Route
                            path = {`${path}/:id`}
                            render = {route => <TablesForm id = {route.match.params.id} />}
                        />
                    </Switch>
            }
            
        </div>
    );
}

function mapStateToProps(state) {
    return {
        isLoading: state.tables.isLoading
    }
}

const mapDispatchToProps = {
    getTables: getTables
};

export default connect(mapStateToProps, mapDispatchToProps)(Tables);
