import React, {useEffect} from 'react';
import styles from './Waiters.module.css';
import {Route, Switch, Link, useRouteMatch} from 'react-router-dom';
import {connect} from "react-redux";
import { getWaiters } from '../../store/actions/waiters';

//components
import WaitersList from "../WaitersList/WaitersList";
import WaitersForm from "../WaitersForm/WaitersForm";

function Waiters({ getWaiters, isLoading }) {
    
    const { path, url } = useRouteMatch();
    
    useEffect(() => {
        getWaiters();
    },[]);
    
    return (
        <div className = { styles.groups_wrap }>
            {
                isLoading ? 'LOADING...' :
                    <Switch>
                        <Route exact path = {`${path}/`}>
                            <WaitersList />
                            <Link className = { styles.btn_add } to = {`${url}/new`}>Add waiter</Link>
                        </Route>
                        <Route
                            path = {`${path}/:id`}
                            render = {route => <WaitersForm id = {route.match.params.id} />}
                        />
                    </Switch>
            }
        
        </div>
    );
}
function mapStateToProps(state) {
    return {
        isLoading: state.waiters.isLoading
    }
}

const mapDispatchToProps = {
    getWaiters: getWaiters
};

export default connect(mapStateToProps, mapDispatchToProps)(Waiters);

