import React, { Component } from "react";
import './Checkout.css';
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {withStyles} from '@material-ui/core/styles';
import Step from '@material-ui/core/Step';
import Stepper from '@material-ui/core/Stepper';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import PropTypes from 'prop-types';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
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

    existingAddressTabContainer: {
        float: 'left',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },

    check: {
        float: 'right',
        marginRight: '10px',
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
        tabValue:0,
        existingAddress:[],
        flatBuildingNo: '',
        flatBuildingNoRequired: 'display-none',

    };
}

    existingAddressOnClickHandler = (addressId) => {
        this.setState({
            [this.state.selectedExistingAddress]: 'unselect-address',
            selectedExistingAddress: addressId,
            [addressId]: 'select-address',
        });
    };

    tabHandler = (event, value) => {
        this.setState({ tabValue: value });
    };

    flatBuildingNoHandler = event => {
        this.setState({ flatBuildingNo: event.target.value });
    };

    render(){
        const { classes } = this.props;
        const steps = getSteps();
        const { activeStep } = this.state;
        const { tabValue } = this.state;
        
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
                                                <Tabs value={tabValue} onChange={this.tabHandler}>
                                                    <Tab label='EXISTING ADDRESS' />
                                                    <Tab label='NEW ADDRESS' />
                                                </Tabs>
                                            </AppBar>

                                            {tabValue===0 &&
                                                <TabContainer className={classes.existingAddressTabContainer}>
                                                    {this.state.existingAddress===null ?
                                                        <Typography variant='h6' color='black'>
                                                            There are no saved addresses! You can save an address using the 'New Address' 
                                                            tab or using your 'Profile' menu option.
                                                        </Typography>
                                                        :
                                                        <GridList className={classes.gridList} cols={3} cellHeight='auto'>
                                                            {this.state.existingAddress.map(address => (
                                                                <GridListTile
                                                                    key={'address' + address.id}
                                                                    id={this.state[address.id] || 'unselect-address'}
                                                                    className={classes.existingAddressGridListTile}
                                                                    classes={classes.existingAddressGridListTileTile}
                                                                    onClick={() => this.existingAddressOnClickHandler(address.id)}>
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
                                                                    <CheckCircleIcon
                                                                        className={classes.check}
                                                                        nativeColor={this.state[address.id] === 'select-address' ? 'green' : 'grey'}
                                                                    />
                                                                </GridListTile>
                                                            ))}
                                                        </GridList>}
                                                </TabContainer>
                                            }

                                            {tabValue === 1 &&
                                                <TabContainer>
                                                    <FormControl required>
                                                        <InputLabel htmlFor='flatBuildingNo'>Flat / Building No.</InputLabel>
                                                            <Input
                                                                id='flatBuildingNo'
                                                                type='text'
                                                                flatno={this.state.flatBuildingNo}
                                                                value={this.state.flatBuildingNo}
                                                                onChange={this.flatBuildingNoHandler}/>
                                                            <FormHelperText className={this.state.flatBuildingNoRequired} error={true}>
                                                                <span>required</span>
                                                            </FormHelperText>
                                                    </FormControl>
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