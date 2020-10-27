import React, { useState, Fragment, useEffect, useMemo, useContext } from 'react';
import MenuService from '../../../services/MenuService';
import Paper from '@material-ui/core/Paper';
import EnhancedTable from '../../shared/EnhancedTable';
import Navigator from '../../shared/Navigator';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

import EditIcon from '@material-ui/icons/Edit';

import { toast } from 'react-toastify';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory, Link } from 'react-router-dom';

import auth from '../../shared/authentication/auth-helper';
import { IconButton } from '@material-ui/core';
import { SettingsRemoteRounded } from '@material-ui/icons';
import { MenuContext } from '../../shared/context/MenuContext';

const styles = theme => ({
  toolbar: theme.mixings.toolbar,
});
const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
  },
}));

const GroupList = props => {
  const classes = useStyles();
  let history = useHistory();

  const [items, setItems] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const { menu, setMenu } = useContext(MenuContext);

  useEffect(() => {
    setMenu({ ...menu, header: 'Work With Menu Groups' })
   
  }, []);

  const requestToSearch = (pageable) => {
    if (pageable.searchByWhat == '') {
      retrieveItems(pageable);
    } else {
      findBySearch(pageable);
    }
  };

  const retrieveItems = (pageable) => {
    MenuService.findGroups(pageable)
      .then(response =>
        response.data.returnCode === '00'
          ? setItems(response.data.menuGroups)
          : (setItems([]), toast.warning(response.data.returnLabel))
      )
      .catch(e => {
        toast.error(e);
      });
  };

  const findBySearch = (pageable) => {
    return null;
  };

  const deleteHandler = row => {
    history.push({
      pathname: '/route_Z2Opt04',
      state: { ...row.original },
    });
  };

  const editHandler = row => {
    history.push({
      pathname: '/route_Z2Opt02',
      state: { ...row.original },
    });
  };

  const viewHandler = row => {
    history.push({
      pathname: '/route_Z2Opt05',
      state: { ...row.original },
    });
  };


  const showList = useMemo (()=>
  [
    10, 15, 20, 25, 50
  ], []
    )

    const sortList = useMemo (()=>
  [
    {label: 'Code', code:'mgCode'},
    {label: 'Route', code:'mgRoute'} 
  ], [])

  const searchList = useMemo (()=>
  [
    {label: 'Code', code:'mgCode'},
    {label: 'Route', code:'mgRoute'} 
  ],[])
  
  
  const columns = useMemo(
    () => [
      { Header: 'Id', accessor: 'id' },
      { Header: 'Code', accessor: 'mgCode' },
      { Header: 'Description.', accessor: 'mgDescription' },
      { Header: 'Route', accessor: 'mgRoute' },
      { Header: 'Label', accessor: 'mgLabel' },
      { Header: 'Sort Order', accessor: 'mgSortBy' },
      { Header: 'Active', accessor: 'mgActive', 
        Cell: ({ row }) => (row.original.mgActive ? 'Active' : 'Disabled') },
      {
        Header: 'No of Functions',
        accessor: 'mgFunctions.length',
        Cell: line => (
          <Link
            to={{
              pathname: '/route_Z2b',
              state: { searchBy: 'mfFunctionGroup', searchByWhat: line.row.original.id, masterGroup: line.row.original.mgLabel },
            }}
          >
            {line.row.original.mgFunctions.length} Functions
          </Link>
        ),
      },
      {
        id: 'delete',
        Cell: ({ row }) => (
          <div>
            <IconButton {...row.getToggleRowSelectedProps()} onClick={() => deleteHandler(row)}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </div>
        ),
      },

      {
        id: 'edit',
        Cell: ({ row }) => (
          <div>
            <IconButton {...row.getToggleRowSelectedProps()} onClick={() => editHandler(row)}>
              <EditIcon fontSize="small" />
            </IconButton>
          </div>
        ),
      },

      {
        id: 'view',
        Cell: ({ row }) => (
          <div>
            <IconButton {...row.getToggleRowSelectedProps()} onClick={() => viewHandler(row)}>
              <MoreHorizIcon fontSize="small" />
            </IconButton>
          </div>
        ),
      },
    ],
    []
  );
  return (
    <Fragment>
      <Grid container>
        <h1>
          <br />
        </h1>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <Paper className={classes.toolbar}></Paper>
        </Grid>
        <Grid item xs={12}>
          <Navigator
            searchList={searchList}
            sortList={sortList}
            showList={showList}
            // noOfItems={totalItems}
            // itemsProvided={itemsProvided}
            // pageNo={pageNo}
            requestToSearch={requestToSearch}
          ></Navigator>
        </Grid>
        <Grid item xs={12}>
          <EnhancedTable 
              columns={columns} 
              data={items} 
              setSelectedRows={setSelectedRows} 
            //  fetchData={requestToSearch}>
    >
              </EnhancedTable>
        </Grid>
        <Grid item xs={12}>
          <Paper>FooterBar here</Paper>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default GroupList;
