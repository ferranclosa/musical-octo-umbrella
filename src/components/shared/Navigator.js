import React, { Fragment, useState, useContext, useEffect, useMemo } from 'react';

import { MenuContext } from '../shared/context/MenuContext';
import { CssBaseline, makeStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import SearchIcon from '@material-ui/icons/Search';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';

const useSTyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
    marginTop: theme.spacing(2),
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const Navigator = props => {
  const classes = useSTyles();

  const directionList = useMemo(
    () => [
      { label: 'Descending', code: 'desc' },
      { label: 'Ascending', code: 'asc' },
    ]
  );
  const [sortBy, setSortBy] = useState(props.sortList[0].code);
  const [sortDirection, setSortDirection] = useState(directionList[0].code);
  const [pageSize, setPageSize] = useState(10);
  const [pageNo, setPageNo] = useState(0);
  const [searchBy, setSearchBy] = useState('');
  const [searchByWhat, setSearchByWhat] = useState('');
  const [filterBy, setFilterByWhat] = useState('');
  const [filterValues, setFilterValues] = useState(props.filterValues || []);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const { menu, setMenu } = useContext(MenuContext);

  const [pageable, setPageable] = useState({
    sortBy: sortBy,
    sortDirection: sortDirection,
    pageSize: pageSize,
    pageNo: pageNo,
    searchBy: searchBy,
    searchByWhat: '',
    filterBy: '',
    filterByWhat: '',
  });

  const [searchList, setSearchList] = useState([]);
  const [showList, setShowList] = useState([]);
  const [sortList, setSortList] = useState([]);
  const [filterList, setFilterList] = useState([]);

  const [searchString, setSearchString] = useState('');

  useEffect(() => {
      setMenu({...menu , needsRefreh:true})
      props.requestToSearch(pageable)
  }, [pageable])
  useEffect(() => {
    setSearchList(props.searchList);
    setShowList(props.showList);
    setSortList(props.sortList);
    setFilterList(props.filterList);
    setFilterValues(props.filterValues);
  }, [props.noOfPages, props.itemsProvided]);

  useEffect(() => {
    setSearchList(props.searchList);
    setShowList(props.showList);
    setSortList(props.sortList);
    setFilterList(props.filterList);
    setFilterValues(props.filterValues);
  }, [
    pageable.searchByWhat,
    pageable.searchBy,
    pageable.sortBy,
    pageable.sortDirecttion,
    pageable.pageSize,
    pageable.pageNo,
    pageable.sortDirection,
  ]);

  const onChangeSearchString = e => {
    setSearchString(e.target.value);
  };

  const handlePageSizeChange = event => {
    setPageable({ ...pageable, pageSize: event.target.value, pageNo: 0 });
    setPageSize(event.target.value);
  };

  const handleSortByChange = event => {
    setPageable({ ...pageable, sortBy: event.target.value, pageNo: 0 });
    setSortBy(event.target.value);
  };

  const handleSortDirectionChange = event => {
    setPageable({ ...pageable, sortDirection: event.target.value, pageNo: 0 });
    setSortDirection(event.target.value);
  };

  const handleNext = event => {
    setPageable({ ...pageable, pageNo: pageable.pageNo + 1 });
    setPageNo(pageNo + 1);
  };
  const handlePrevious = event => {
    if (pageable.pageNo > 0) {
      setPageable({ ...pageable, pageNo: pageable.pageNo - 1 });
      setPageNo(pageNo - 1);
    }
  };
  
  return (
    <Fragment>
      <CssBaseline />
      <Grid container className={'flex-start'} marginLeft={5} spacing={3} marginTop={1}>
        <Grid item>
          <FormControl className={classes.formControl}>
            <InputLabel id="page-size">Items per page</InputLabel>
            <Select
              margin="dense"
              labelId="page-size"
              id="page-size-select"
              value={pageSize}
              autoWidth
              onChange={event => handlePageSizeChange(event)}
            >
              {showList.map((fields, i) => (
                <MenuItem key={i} value={fields}>
                  {fields}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl className={classes.formControl}>
            <InputLabel id="sort-by">Sort by</InputLabel>
            <Select
              margin="dense"
              labelId="sort-by"
              id="sort-by-select"
              value={sortBy}
              autoWidth
              onChange={event => handleSortByChange(event)}
            >
              {sortList.map((fields, i) => (
                <MenuItem key={i} value={fields.code}>
                  {fields.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item>
          <FormControl className={classes.formControl}>
            <InputLabel id="sort-direction">Direction</InputLabel>
            <Select
              margin="dense"
              labelId="sort-direction"
              id="sort-direction-select"
              value={sortDirection}
              autoWidth
              onChange={event => handleSortDirectionChange(event)}
            >
              {directionList.map((fields, i) => (
                <MenuItem key={i} value={fields.code}>
                  {fields.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Navigator;
