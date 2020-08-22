import React from 'react';
import './Header.css';
import SearchBar from '../searchBar/searchBar';
import FastfoodIcon from '@material-ui/icons/Fastfood';


const Header = function (props) {

    return (
        <div className="header">
            <FastfoodIcon className="fast_food"/>
            <span className="search_btn">
                <SearchBar/>
            </span>
        </div>
    )
}

export default Header;