import React, { useState, Fragment, useEffect, useMemo, useContext } from 'react';
import MenuService from '../../../services/MenuService';
import Paper from '@material-ui/core/Paper';
import EnhancedTable from '../../shared/EnhancedTable';
import Navigator from '../../shared/Navigator';
import FootBar from '../../shared/FootBar';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

import EditIcon from '@material-ui/icons/Edit';

import { toast } from 'react-toastify';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory, Link } from 'react-router-dom';

import auth from '../../auth/auth-helper';
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

const AppList = props => {
  const classes = useStyles();
  let history = useHistory();

  const [items, setItems] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const { menu, setMenu } = useContext(MenuContext);

  const [lastItemsProvided, setLastItemsProvided] = useState(0);
  const [totalNumberOfItems, setTotalNumberOfItems] = useState(0);
  const [totalNumberOfPages, setTotalNumberOfPages] = useState(0);
  const [pageNo, setPageNo] = useState(0);

  useEffect(() => {
    setMenu({ ...menu, header: 'Menu Applications' });
  }, []);

  const requestToSearch = pageable => {
    if (pageable.searchByWhat == '') {
      retrieveItems(pageable);
    } else {
      findBySearch(pageable);
    }
  };

  const retrieveItems = pageable => {
    MenuService.findApps(pageable)
      .then(response =>
        response.data.returnCode === '00'
          ? (setItems(response.data.menuApps),
            setLastItemsProvided(response.data.lastItemsProvided),
            setTotalNumberOfItems(response.data.totalNumberOfItems),
            setTotalNumberOfPages(response.data.totalNumberOfPages),
            toast.success('See the result here'))
          : (setItems([]), toast.warning(response.data.returnLabel))
      )
      .catch(e => {
        toast.error(e);
      });
  };

  const findBySearch = pageable => {
    return null;
  };

  const deleteHandler = row => {
    history.push({
      pathname: '/route_Z1Opt04',
      state: { ...row.original },
    });
  };

  const editHandler = row => {
    history.push({
      pathname: '/route_Z1Opt02',
      state: { ...row.original },
    });
  };

  const viewHandler = row => {
    history.push({
      pathname: '/route_Z1Opt05',
      state: { ...row.original },
    });
  };

  const addHandler = () => {
    history.push('/route_Z1F6');
  };

  const showList = useMemo(() => [10, 15, 20, 25, 50], []);

  const sortList = useMemo(
    () => [
      { label: 'Application', code: 'maApplication' }
    ],
    []
  );

  const searchList = useMemo(
    () => [
      { label: 'Application', code: 'maApplication' }
    ],
    []
  );

  const columns = useMemo(
    () => [
      { Header: 'Id', accessor: 'id' },
      { Header: 'Application', accessor: 'maApplication' },
      { Header: 'Secured.', accessor: 'maIsAccessSecured', Cell: ({ row }) => (row.original.maIsAccessSecured ? 'Yes' : 'No') },
      { Header: 'Status', accessor: 'maStatus.fullStatus' },
      {
        Header: 'No of Group Functions',
        accessor: 'maGroups.length',
        Cell: line => (
          <Link
            to={{
              pathname: '/route_Z2',
              state: { groupId: line.row.original.id, masterGroup: line.row.original.maApplication },
            }}
          >
            {line.row.original.maGroups.length} Group Functions
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
            totalNumberOfItems={totalNumberOfItems}
            lastItemsProvided={lastItemsProvided}            
            totalNumberOfPages={totalNumberOfPages}
            pageNo={pageNo}
            requestToSearch={requestToSearch}
          ></Navigator>
        </Grid>
        <Grid item xs={12}>
          <EnhancedTable
            columns={columns}
            data={items}
            setSelectedRows={setSelectedRows}
            //  fetchData={requestToSearch}>
          ></EnhancedTable>
        </Grid>
        <Grid item xs={12}>
          <FootBar
            // currentItem={item}
            addHandler={addHandler}
          ></FootBar>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default AppList;
