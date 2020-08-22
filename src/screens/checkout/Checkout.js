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
import Typography from '@material-ui/core/Typography';
import GridListTile from '@material-ui/core/GridListTile';
// import Header

const styles = theme => ({
    root: {
        width: "100%",
    },

    gridList: {
        flexWrap: 'nowrap',
        transform: 'translateZ(0)',
        overflowY: 'hidden',
    },

    existingAddressGridListTile: {
        marginBottom: '50px',
        cursor: 'pointer',
    },

    existingAddressGridListClass: {
        padding: '25px',
    },
});

function getSteps() {
    return ['Delivery', 'Payment'];
};

function TabContainer(props) {
    return (
        <Typography component='div' style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    )
};

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

class Checkout extends Component {
    constructor(){
    super();
    this.state = {
        activeStep:0,
        tabvalue:0,
        existingAddress:[],

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
                        <Stepper activeStep={activeStep} orientation='vertical'>
                            {steps.map((label, index) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                    <StepContent>
                                        {index === 0 ?  
                                        <div className={classes.tabRoot}>
                                            <AppBar position='static'>
                                                <Tabs value={tabvalue}>
                                                    <Tab label='EXISTING ADDRESS' />
                                                    <Tab label='NEW ADDRESS' />
                                                </Tabs>
                                            </AppBar>

                                            {tabValue===0 &&
                                                <TabContainer className={classes.existingAddressTabContainer}>
                                                    {this.state.existingAddress===null ?
                                                        <Typography variant='h6' color='textSecondary'>
                                                            There are no saved addresses! You can save an address using the 'New Address' tab or using your 'Profile' menu option.
                                                        </Typography>
                                                        :
                                                        <GridList className={classes.gridList} cols={3} cellHeight='auto'>
                                                            {this.state.existingAddress.map(address => (
                                                                <GridListTile
                                                                    key={'address' + address.id}
                                                                    id={this.state[address.id] || 'unselect-address'}
                                                                    className={classes.existingAddressGridListTile}>
                                                                    <Typography variant='subtitle1'>
                                                                        {address.flat_building_name}
                                                                    </Typography>

                                                                    <Typography variant='subtitle1'>
                                                                        {address.locality}
                                                                    </Typography>

                                                                    <Typography variant='subtitle1'>
                                                                        {address.city}
                                                                    </Typography>

                                                                    <Typography variant='subtitle1'>
                                                                        {address.state.state_name}
                                                                    </Typography>

                                                                    <Typography variant='subtitle1'>
                                                                        {address.pincode}
                                                                    </Typography>
                                                                </GridListTile>
                                                            ))}
                                                        </GridList>}
                                                </TabContainer>
                                            }
                                        </div> 
                                        : " "}
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