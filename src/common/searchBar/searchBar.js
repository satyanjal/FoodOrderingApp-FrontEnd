import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '0px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 300,
    background: '#273238'
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    color: 'white'
  },
  iconButton: {
    padding: 10,
  },
  iconColor: {
    color: 'white',
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

export default function SearchBar() {
  const classes = useStyles();

  return (
    <Paper component="form" className={classes.root}>
      <IconButton type="submit" className={classes.iconButton} aria-label="search">
        <SearchIcon className={classes.iconColor} />
      </IconButton>
      <InputBase
        className={classes.input}
        placeholder="Search By Restaurant Name"
        inputProps={{ 'aria-label': 'search google maps' }}
      />
    </Paper>
  );
}
