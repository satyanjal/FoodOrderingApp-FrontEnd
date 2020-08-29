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
import {constants} from '../../common/util';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
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

    cardDivider: {
        marginTop: '5px',
    },

    netAmount: {
        marginTop: '15px',
    },

    placeOrderButton: {
        marginTop: '20px',
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
            flatNo: '',
            flatNoRequired: 'display-none',
            flatNoMsg: "required",
            locality: '',
            localityRequired: 'display-none',
            localityMsg: "required",
            city: '',
            cityRequired: 'display-none',
            cityMsg: "required",
            addstate: '',
            addstateRequired: 'display-none',
            addstateMsg: "required",
            pincode: '',
            pincodeRequired: 'display-none',
            pincodeRequiredMsg: 'required',
            states: [],
            paymentModes: [],
            payValue: '',
            selectedExistingAddress: null,
            selectedPaymentMode: null,
            customerCart: {
                "restaurantDetails": {
                    "restaurant_name": "Gateway Taproom",
                    "id": "246165d2-a238-11e8-9077-720006ceb890"
                },
                "cartItems": [{
                    "id": "c860e78a-a29b-11e8-9a3a-720006ceb890",
                    "name": "Pizza",
                    "totalPrice": 10,
                    "quantity": 1,
                    "type": "V"
                },
                {
                    "id": "7c174b25-bb31-46a8-87b4-c06ffc9d5f8f",
                    "name": "Chicken Burger",
                    "totalPrice": 20,
                    "quantity": 1,
                    "type": "N"
                }],
                "totalPrice": 30
            } //JSON.parse(sessionStorage.getItem('customer-cart')),
        };
    }

    preState = {
        activeStep: 0,
    };

    componentDidMount(){        
        this.getExistingAddress();
        this.getStates();
        this.getPaymentMethods();
        console.log(this.state.customerCart);
        sessionStorage.setItem("authorization", 
        "Bearer eyJraWQiOiJiMWViNzlmMy1mNTAwLTQ2MmEtYTlhOC01ZmI5MWRjYzAxMTIiLCJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJhdWQiOiIxZjRjMzhkOS01NmM1LTQ5YjItODZmMC0yN2EzYjdjNTM4MDMiLCJpc3MiOiJodHRwczovL0Zvb2RPcmRlcmluZ0FwcC5pbyIsImV4cCI6MTU5ODcyNCwiaWF0IjoxNTk4Njk2fQ.Oit0fZjcH1w1R9snJ485Lfzkk5-H80XOxh83-0SvyXwyqDTiCIns3v909A5qYVjLyw_iiWIIzCSlmOcQcc_xrw");
        sessionStorage.setItem("access-token", 
        "eyJraWQiOiJiMWViNzlmMy1mNTAwLTQ2MmEtYTlhOC01ZmI5MWRjYzAxMTIiLCJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJhdWQiOiIxZjRjMzhkOS01NmM1LTQ5YjItODZmMC0yN2EzYjdjNTM4MDMiLCJpc3MiOiJodHRwczovL0Zvb2RPcmRlcmluZ0FwcC5pbyIsImV4cCI6MTU5ODcyNCwiaWF0IjoxNTk4Njk2fQ.Oit0fZjcH1w1R9snJ485Lfzkk5-H80XOxh83-0SvyXwyqDTiCIns3v909A5qYVjLyw_iiWIIzCSlmOcQcc_xrw");
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

    getExistingAddress = () => {
        let that = this;
        let url = `${constants.api}/address/customer`;
        return fetch(url,{
            method:'GET',
            headers: {
                // 'Content-Type': 'application/json',
                "Accept": "application/json;charset=UTF-8",
                "authorization": "Bearer eyJraWQiOiJiMWViNzlmMy1mNTAwLTQ2MmEtYTlhOC01ZmI5MWRjYzAxMTIiLCJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJhdWQiOiIxZjRjMzhkOS01NmM1LTQ5YjItODZmMC0yN2EzYjdjNTM4MDMiLCJpc3MiOiJodHRwczovL0Zvb2RPcmRlcmluZ0FwcC5pbyIsImV4cCI6MTU5ODcyNCwiaWF0IjoxNTk4Njk2fQ.Oit0fZjcH1w1R9snJ485Lfzkk5-H80XOxh83-0SvyXwyqDTiCIns3v909A5qYVjLyw_iiWIIzCSlmOcQcc_xrw"
            }
        }).then((response) =>{
            return response.json();
        }).then((jsonResponse) =>{
            that.setState({
                existingAddress: jsonResponse.addresses
            });
            // console.log(that.state.addresses);
        }).catch((error) => {
            console.log('error user data',error);
        });
    };

    // addNewAddress = (newAddress) => {
    //     let that = this;
    //     let url = `${constants.api}/address`;
    //     return fetch(url, {
    //         method:'POST',
    //         mode: 'cors',
    //         credentials: 'same-origin',
    //         headers: {
    //             // 'Content-Type': 'application/json',
    //             "Accept": "application/json;charset=UTF-8",
    //             "authorization": "Bearer eyJraWQiOiJiMWViNzlmMy1mNTAwLTQ2MmEtYTlhOC01ZmI5MWRjYzAxMTIiLCJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJhdWQiOiIxZjRjMzhkOS01NmM1LTQ5YjItODZmMC0yN2EzYjdjNTM4MDMiLCJpc3MiOiJodHRwczovL0Zvb2RPcmRlcmluZ0FwcC5pbyIsImV4cCI6MTU5ODcyNCwiaWF0IjoxNTk4Njk2fQ.Oit0fZjcH1w1R9snJ485Lfzkk5-H80XOxh83-0SvyXwyqDTiCIns3v909A5qYVjLyw_iiWIIzCSlmOcQcc_xrw"
    //         },
    //         body: JSON.stringify(newAddress)
    //     });
    // };

    getPaymentMethods = () => {
        let that = this;
        let url = `${constants.api}/payment`;
        return fetch(url,{
            method:'GET',
        }).then((response) =>{
            return response.json();
        }).then((jsonResponse) =>{
            that.setState({
                paymentModes: jsonResponse.paymentMethods
            });
            // console.log(that.state.addresses);
        }).catch((error) => {
            console.log('error user data',error);
        });
    };

    componentWillUnmount = () => {
        sessionStorage.removeItem('customer-cart');
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

    flatNoHandler = event => {
        this.setState({
            flatNo: event.target.value,
            flatNoMsg: (event.target.value === "" ? "required" : "")
        })
    };

    localityHandler = event => {
        this.setState({
            locality: event.target.value,
            localityMsg: (event.target.value === "" ? "required" : "")
        })
    };

    cityHandler = event => {
        this.setState({
            city: event.target.value,
            cityMsg: (event.target.value === "" ? "required" : "")
        })
    };

    stateHandler = event => {
        this.setState({
            addstate: event.target.value,
            addstateMsg: (event.target.value === "" ? "required" : "")
        })
    };

    pincodeHandler = event => {
        let validatePincode = new RegExp('^[1-9][0-9]{5}$');
        let message = "";
        if(validatePincode.test(event.target.value) === false){
            message = "Pincode must contain only numbers and must be 6 digits long"
        } else if(event.target.value === "" ) {
            message = "required"
        }
        this.setState({
            pincode: event.target.value,
            pincodeRequiredMsg: message
        })
    };

    saveAddressClickHandler = () => {
        let flatNoReq = (this.state.flatNo === '' ? true : false);
        let localityReq = (this.state.locality === '' ? true : false);
        let cityReq = (this.state.city === '' ? true : false);
        let stateReq = (this.state.addstate === '' ? true : false);
        let pincodeReq = (this.state.pincode === '' ? true : false);

        if (flatNoReq || localityReq || cityReq || stateReq || pincodeReq) {
            return;
        }

        let stateUUID = '';
        for (let state of this.state.states) {
            if (state.state_name === this.state.addstate) {
                stateUUID = state.id;
            }
        }

        let newAddress = ('flatBuildingName=' + this.state.flatNo
        + '&locality=' + this.state.locality 
        + '&city=' + this.state.city 
        + '&pincode=' + this.state.pincode
        + '&stateUuid=' + stateUUID)
        let url = `${constants.api}/address/?${newAddress}`;

        // let newAddress = {'flatBuildingName': this.state.flatNo,
        // 'locality': this.state.locality,
        // 'city': this.state.city,
        // 'pincode': this.state.pincode,
        // 'stateUuid': stateUUID};

        return fetch(url, {
            method:'POST',
            mode: 'cors',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                "Accept": "application/json;charset=UTF-8",
                "authorization": "Bearer eyJraWQiOiJiMWViNzlmMy1mNTAwLTQ2MmEtYTlhOC01ZmI5MWRjYzAxMTIiLCJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJhdWQiOiIxZjRjMzhkOS01NmM1LTQ5YjItODZmMC0yN2EzYjdjNTM4MDMiLCJpc3MiOiJodHRwczovL0Zvb2RPcmRlcmluZ0FwcC5pbyIsImV4cCI6MTU5ODcyNCwiaWF0IjoxNTk4Njk2fQ.Oit0fZjcH1w1R9snJ485Lfzkk5-H80XOxh83-0SvyXwyqDTiCIns3v909A5qYVjLyw_iiWIIzCSlmOcQcc_xrw",
                'Access-Control-Allow-Origin': "*"
            },
            body: JSON.stringify(newAddress)
        });

        // let xhrNewAddress = new XMLHttpRequest();
        // xhrNewAddress.open('POST', `${constants.api}/address/?${newAddress}`, true);
        // xhrNewAddress.setRequestHeader('authorization', 'Bearer ' + sessionStorage.getItem('access-token'));
        // xhrNewAddress.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        // xhrNewAddress.setRequestHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
        // xhrNewAddress.setRequestHeader('Accept', 'application/json');
        // xhrNewAddress.send(null);
        // this.getExistingAddress();
    };

    payChangeHandler = event => {
        this.setState({ payValue: event.target.value });
    };

    payClickHandler = (paymentId) => {
        this.setState({ selectedPaymentMode: paymentId });
    };

    backHandler = () => {
        this.setState(preState => ({
            activeStep: preState.activeStep - 1,
        }));
    };

    stepperNextHandler = () => {   
        if (this.state.activeStep === 0 && this.state.selectedExistingAddress === null) {
            return;
        }

        if (this.state.activeStep === 1 && this.state.selectedPaymentMode === null) {
            return;
        }

        this.setState(preState => ({
            activeStep: preState.activeStep + 1,
        }));
    };


    render(){
        const { classes } = this.props;
        const steps = getSteps();
        const { activeStep } = this.state;
        const { tabValue } = this.state;
        let statesList =  this.state.states.map(state => (
            <MenuItem key={'state' + state.id} value={state.state_name}>                     
            {state.state_name}
            </MenuItem>
            ));
        
        return (
            <div>
            {/* <Header/> */}
            <Grid container= {true}>
                <Grid item={true} xs={9}>
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
                                                                        nativecolor={this.state[address.id] === 'select-address' ? 'green' : 'grey'}
                                                                    />
                                                                </GridListTile>
                                                            ))}
                                                        </GridList>}
                                                </TabContainer>
                                            }

                                            {tabValue === 1 &&
                                                <TabContainer>
                                                    <FormControl required>
                                                        <InputLabel htmlFor='flatNo'>Flat / Building No.</InputLabel>
                                                            <Input
                                                                id='flatNo'
                                                                type='text'
                                                                flatno={this.state.flatNo}
                                                                value={this.state.flatNo}
                                                                onChange={this.flatNoHandler}/>
                                                        <FormHelperText error={true}>
                                                            <span>{this.state.flatNoMsg}</span>
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
                                                        <FormHelperText error={true}>
                                                            <span>{this.state.localityMsg}</span>
                                                        </FormHelperText>
                                                    </FormControl>
                                                    <br /><br />

                                                    <FormControl required>
                                                        <InputLabel htmlFor='city'>City</InputLabel>
                                                            <Input
                                                                id='city'
                                                                type='text'
                                                                city={this.state.city}
                                                                value={this.state.city}
                                                                onChange={this.cityHandler}/>
                                                        <FormHelperText error={true}>
                                                            <span>{this.state.cityMsg}</span>
                                                        </FormHelperText>  
                                                    </FormControl>                               
                                                    <br /><br />

                                                    <FormControl required>
                                                        <InputLabel htmlFor='addstate'>State</InputLabel>
                                                            <Select
                                                                id='addstate'
                                                                addstate={this.state.addstate}
                                                                value={this.state.addstate}
                                                                onChange={this.stateHandler}
                                                                className={classes.selectNewAddressState}>
                                                                {/* MenuProps={MenuProps} */}
                                                                {statesList}
                                                            </Select>
                                                        <FormHelperText error={true}>
                                                            <span>{this.state.addstateMsg}</span>
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
                                                        <FormHelperText error={true}>
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
                                                    className={classes.stepperButton}
                                                    onClick={this.backHandler}>
                                                        Back
                                                </Button>
                                                <Button
                                                    variant='contained'
                                                    color='primary'
                                                    className={classes.stepperButton}
                                                    onClick={this.stepperNextHandler}>
                                                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                                </Button>
                                            </div>
                                        </div>
                                    </StepContent>
                                </Step>
                            ))}
                        </Stepper>
                        {activeStep === steps.length && (
                            <Paper square elevation={0} className={classes.resetContainer}>
                                <Typography variant='h6'>
                                    View the summary &#38; place your order now!
                                </Typography>
                                <Button onClick={this.stepperResetHandler} className={classes.stepperButton}>
                                    CHANGE
                                </Button>
                            </Paper>
                        )}
                    </div>
                </Grid>

                <Grid item={true} xs>
                    <Card id='summary-card'>
                        <CardContent>
                            <Typography variant='h5'>
                                Summary
                            </Typography>
                            <br/>

                            {this.state.customerCart.cartItems.map(item => (
                                <div key={'item' + item.id + item.category_name} className='flex width-100 pd-1-per'>
                                    <span className='width-10'><i className={item.type === "N" ? 'fa fa-stop-circle-o non-veg' : 'fa fa-stop-circle-o veg'}></i></span>
                                    <span className='width-50 capital checkout-grey-color'>{item.name}</span>
                                    <span className='width-25 checkout-grey-color'>{item.quantity}</span>
                                    <span className='width-4 checkout-grey-color'><i className='fa fa-inr'></i></span>
                                    <span className='checkout-grey-color'>{item.totalPrice}.00</span>
                                </div>
                            ))}

                            {/* <Typography variant='h6' color='textSecondary' gutterBottom>
                                {this.state.customerCart.restaurantDetails.restaurant_name}
                            </Typography> */}

                            <Divider className={classes.cardDivider} />

                            <div className={classes.netAmount}>
                                Net Amount
                                <span className='right'>
                                    <span className='width-15 checkout-grey-color'>
                                        <i className='fa fa-inr'></i>
                                    </span>{this.state.customerCart.totalPrice}.00
                                </span>                               
                            </div>

                            <Button
                                variant='contained'
                                color='primary'
                                className={classes.placeOrderButton}
                                fullWidth={true}>
                                Place Order
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(Checkout);