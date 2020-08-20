import React, { Component } from "react";
import './Checkout.css';
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { withStyles } from '@material-ui/core/styles';
import Step from '@material-ui/core/Step';
import Stepper from '@material-ui/core/Stepper';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import AppBar from '@material-ui/core/AppBar';
// import Header

const styles = theme => ({
    root: {
      width: "100%",
    }
});

function getSteps() {
    return ['Delivery', 'Payment'];
};

class Checkout extends Component {
    constructor(){
    super();
    this.state = {
        activeStep:0,

    };
}

    render(){
        const { classes } = this.props;
        const steps = getSteps();
        
        return (
            <div>
            {/* <Header/> */}
            <Grid container= {true}>
                <Grid item>
                    <div>
                        <Stepper activeStep={0} orientation='vertical'>
                            {steps.map((label, index) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                    <StepContent>
                                        {index === 0 ?  
                                        <div className={classes.tabRoot}>
                                            <AppBar position='static'>
                                                <Tabs value={0}>
                                                    <Tab label='EXISTING ADDRESS' />
                                                    <Tab label='NEW ADDRESS' />
                                                </Tabs>
                                            </AppBar>
                                        </div>
                                        :''}
                                    </StepContent>
                                </Step>
                            ))}
                        </Stepper>
                    </div>
                </Grid>
            </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(Checkout);