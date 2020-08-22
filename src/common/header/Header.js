import React from 'react';
import './Header.css';
import SearchBar from '../searchBar/searchBar';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import Button from '@material-ui/core/Button';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';


const Header = function (props) {

    return (
        <div className="header">
            <FastfoodIcon className="fast_food"/>
            <span className="search_btn">
                <SearchBar/>
            </span>
            <span className="login_btn">
                <Button variant="contained"><AccountCircleIcon/> LOGIN</Button>
            </span>
        </div>
    )
}

export default Header;