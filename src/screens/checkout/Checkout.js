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
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import {constants} from '../../common/util'
//import MenuProps from '@material-ui/core/'
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

    selectNewAddressState: {
        width: '190px',
    },

    paydisplay: {
        display: 'flex',
    },

    payFormControl: {
        margin: theme.spacing(3),
    },

    payGroup: {
        margin: theme.spacing(0),
    },

    stepperButton: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
    },

    backnextMargin: {
        marginBottom: theme.spacing(2),
    },
});

// const MenuProps = {
//     PaperProps: {
//         style: {
//             maxHeight: 48 * 4 + 8,
//             width: 250,
//         },
//     },
// };

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
    constructor(props){
        super(props);
        this.state = {
            activeStep:0,
            tabValue:0,
            existingAddress:[],
            flatBuildingNo: '',
            flatBuildingNoRequired: 'display-none',
            localityRequired: 'display-none',
            locality: '',
            cityRequired: 'display-none',
            city: '',
            stateRequired: 'display-none',
            newAddressState: '',
            pincodeRequired: 'display-none',
            pincodeRequiredMsg: 'required',
            pincode: '',
            states: [],
            paymentModes: [],
            payValue: '',
        };
    }

    componentDidMount(){
        this.getStates();
    };

    getStates = () => {
        let that = this;
        let url = `${constants.api}/states`;
        return fetch(url,{
            method:'GET',
        }).then((response) =>{
            return response.json();
        }).then((jsonResponse) =>{
            that.setState({
                states: jsonResponse.states
            });
            //console.log(that.state.states);
        }).catch((error) => {
            console.log('error user data',error);
        });
    };

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

    localityHandler = event => {
        this.setState({ locality: event.target.value });
    };

    cityHandler = event => {
        this.setState({ city: event.target.value });
    };

    stateHandler = event => {
        this.setState({ newAddressState: event.target.value });
    };

    pincodeHandler = event => {
        this.setState({ pincode: event.target.value });
    };

    saveAddressClickHandler = () => {
        let flatBuildingNoReq = false;
        if (this.state.flatBuildingNo === '') {
            this.setState({ flatBuildingNoRequired: 'display-block' });
            flatBuildingNoReq = true;
        } else {
            this.setState({ flatBuildingNoRequired: 'display-none' });
        }

        let localityReq = false;
        if (this.state.locality === '') {
            this.setState({ localityRequired: 'display-block' });
            localityReq = true;
        } else {
            this.setState({ localityRequired: 'display-none' });
        }

        let cityReq = false;
        if (this.state.city === '') {
            this.setState({ cityRequired: 'display-block' });
            cityReq = true;
        } else {
            this.setState({ cityRequired: 'display-none' });
        }

        let stateReq = false;
        if (this.state.newAddressState === '') {
            this.setState({ stateRequired: 'display-block' });
            stateReq = true;
        } else {
            this.setState({ stateRequired: 'display-none' });
        }

        let pincodeReq = false;
        if (this.state.pincode === '') {
            this.setState({
                pincodeRequired: 'display-block',
                pincodeRequiredMsg: 'required'
            });
            pincodeReq = true;
        } else {
            this.setState({ pincodeRequired: 'display-none' });
        }

        let validatePincode = new RegExp('^[1-9][0-9]{5}$');
        if (pincodeReq === false && validatePincode.test(this.state.pincode) === false) {
            this.setState({
                pincodeRequired: 'display-block',
                pincodeRequiredMsg: 'Pincode must contain only numbers and must be 6 digits long'
            });
            return;
        }

        if (flatBuildingNoReq || localityReq || cityReq || stateReq || pincodeReq) {
            return;
        }

        let stateUUID = '';
        for (let state of this.state.states) {
            if (state.state_name === this.state.newAddressState) {
                stateUUID = state.id;
            }
        }

        let that = this;
        let dataNewAddress = {
            'city': this.state.city,
            'flat_building_name': this.state.flatBuildingNo,
            'locality': this.state.locality,
            'pincode': this.state.pincode,
            'state_uuid': stateUUID
        }

        let xhrNewAddress = new XMLHttpRequest();
        xhrNewAddress.addEventListener('readystatechange', function () {
            if (this.readyState === 4) {
                let dataCustomerAddress = null;
                let xhrCustomerAddress = new XMLHttpRequest();
                xhrCustomerAddress.addEventListener('readystatechange', function () {
                    if (this.readyState === 4) {
                        that.setState({
                            customerExistingAddresses: JSON.parse(this.responseText).addresses,
                        });
                    }
                });
                xhrCustomerAddress.open('GET', `${that.props.baseUrl}address/customer`);
                xhrCustomerAddress.setRequestHeader('authorization', 'Bearer ' + sessionStorage.getItem('access-token'));
                xhrCustomerAddress.send(dataCustomerAddress);
                window.alert('New address added!');
            }
        });
        xhrNewAddress.open('POST', `${this.props.baseUrl}address`);
        xhrNewAddress.setRequestHeader('authorization', 'Bearer ' + sessionStorage.getItem('access-token'));
        xhrNewAddress.setRequestHeader('Content-Type', 'application/json');
        xhrNewAddress.send(JSON.stringify(dataNewAddress));

    };

    
    payChangeHandler = event => {
        this.setState({ radioValue: event.target.value });
    };

    payClickHandler = (paymentId) => {
        this.setState({ selectedPaymentMode: paymentId });
    };

    render(){
        const { classes } = this.props;
        const steps = getSteps();
        const { activeStep } = this.state;
        const { tabValue } = this.state;
        let statesList =  this.state.states.map(state => (
            <MenuItem key={'state' + state.id} value={state.state_name}>                                                                            {state.state_name}
            </MenuItem>
            ));
        
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
                                                    <br /><br />

                                                    <FormControl required>
                                                        <InputLabel htmlFor='locality'>Locality</InputLabel>
                                                            <Input
                                                                id='locality'
                                                                type='text'
                                                                locality={this.state.locality}
                                                                value={this.state.locality}
                                                                onChange={this.localityHandler}/>
                                                        <FormHelperText className={this.state.localityRequired} error={true}>
                                                            <span>required</span>
                                                        </FormHelperText>
                                                    </FormControl>                                                            <br /><br />
                                                    <br /><br />

                                                    <FormControl required>
                                                        <InputLabel htmlFor='city'>City</InputLabel>
                                                            <Input
                                                                id='city'
                                                                type='text'
                                                                city={this.state.city}
                                                                value={this.state.city}
                                                                onChange={this.cityHandler}/>
                                                        <FormHelperText className={this.state.cityRequired} error={true}>
                                                            <span>required</span>
                                                        </FormHelperText>  
                                                    </FormControl>                               
                                                    <br /><br />

                                                    <FormControl required>
                                                        <InputLabel htmlFor='newAddressstate'>State</InputLabel>
                                                            <Select
                                                                id='newAddressstate'
                                                                newaddressstate={this.state.newAddressState}
                                                                value={this.state.newAddressState}
                                                                onChange={this.stateHandler}
                                                                className={classes.selectNewAddressState}>
                                                                {/* MenuProps={MenuProps} */}
                                                                {statesList}
                                                            </Select>
                                                        <FormHelperText className={this.state.stateRequired} error={true}>
                                                            <span>required</span>
                                                        </FormHelperText>
                                                    </FormControl>
                                                    <br /><br />

                                                    <FormControl required>
                                                        <InputLabel htmlFor='pincode'>Pincode</InputLabel>
                                                            <Input
                                                                id='pincode'
                                                                type='text'
                                                                pincode={this.state.pincode}
                                                                value={this.state.pincode}
                                                                onChange={this.pincodeHandler}
                                                            />
                                                        <FormHelperText className={this.state.pincodeRequired} error={true}>
                                                            <span>{this.state.pincodeRequiredMsg}</span>
                                                        </FormHelperText>
                                                    </FormControl>
                                                    <br /><br />

                                                    <Button
                                                        variant='contained'
                                                        color='secondary'
                                                        onClick={this.saveAddressClickHandler}>
                                                        Save Address
                                                    </Button>
                                                </TabContainer>
                                            }
                                        </div> 
                                        : " "}

                                        {index === 1 ?
                                            <div className={classes.paydisplay}>
                                                <FormControl component='fieldset' className={classes.payFormControl}>
                                                    <FormLabel component='legend'>Select Mode of Payment</FormLabel>
                                                    <RadioGroup
                                                        aria-label='paymentModes'
                                                        name='paymentModes'
                                                        className={classes.payGroup}
                                                        value={this.state.payValue}
                                                        onChange={this.payChangeHandler}
                                                    >
                                                    {this.state.paymentModes.map(paymentMode => (
                                                        <FormControlLabel
                                                            key={'paymentMode' + paymentMode.id}
                                                            value={paymentMode.payment_name.toLowerCase()}
                                                            control={<Radio />}
                                                            label={paymentMode.payment_name}
                                                            onClick={() => this.payClickHandler(paymentMode.id)}
                                                        />
                                                    ))}
                                                    </RadioGroup>
                                                </FormControl>
                                            </div>
                                            : ''
                                            }       
                                        <div className={classes.backnextMargin}>
                                            <div>
                                                <Button
                                                    disabled={activeStep === 0}  
                                                    className={classes.stepperButton}>
                                                        Back
                                                </Button>
                                                <Button
                                                    variant='contained'
                                                    color='primary'
                                                    className={classes.stepperButton}>
                                                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                                </Button>
                                            </div>
                                        </div>
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