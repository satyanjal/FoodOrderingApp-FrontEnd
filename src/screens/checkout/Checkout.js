import React, { Component } from "react";
import './Checkout.css';
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { withStyles } from '@material-ui/core/styles';
// import Header

const styles = theme => ({
    root: {
      width: "100%",
    }
});

class Checkout extends Component {
    constructor(){
    super();
    this.state = {

    };
}

    render(){
        const { classes } = this.props;

        return (
            <div>
                {/* <Header/> */}
                    <Grid container>
                        <Grid item>
                            <div>
                                <Tabs value={0}>
                                    <Tab label='EXISTING ADDRESS' />
                                    <Tab label='NEW ADDRESS' />
                                </Tabs>
                            </div>
                        </Grid>
                    </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(Checkout);