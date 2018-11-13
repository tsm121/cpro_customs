import React, { Component } from 'react'

import TextField from '@material-ui/core/TextField';
import Grid from "@material-ui/core/Grid/Grid";
import Button from "@material-ui/core/Button/Button";
import NavigationArrow from "./NavigationArrow";

var userData = {
    licencePlate:'',
    email:'',
}

export default class InputFields extends Component  {
    constructor() {
        super()
        this.state = {
            licencePlateInputError: true,
            emailInputError: true,
            inputValid: false,

        }
    }

    componentWillMount = () => {

        if(!('userData' in localStorage)){
            userData = {
                licencePlate: '',
                email: ''
            }
        } else {
            userData.licencePlate = JSON.parse(localStorage.getItem('userData')).licencePlate
            userData.email = JSON.parse(localStorage.getItem('userData')).email
        }

        var tempEmail = this.getEmailPlate()
        var tempLicencePlate = this.getLicencePlate()
        this.validateMail(tempEmail)
        this.validateLicencePlate(tempLicencePlate)
    }


    onClickHandler = ()=> {
        const {licencePlateInputError, emailInputError} = this.state
        const {closeModal, on_boarding} = this.props

        if (!licencePlateInputError && !emailInputError) {
            localStorage.setItem('userData', JSON.stringify(userData))
            this.setState({
                inputValid: true,
            })
            if (!on_boarding){
                closeModal()
            }
        } else {
        }
    }

    toggleEmailInput = (error) => {
        if (error) {
            this.setState({
                emailInputError: true,
                inputValid: false,
            })
        } else {
            this.setState({
                emailInputError: false
            })
        }

    }

    toggleLicencePlateInput = (error) => {
        if (error) {
            this.setState({
                licencePlateInputError: true,
                inpudValid: false,
            })
        } else {
            this.setState({
                licencePlateInputError: false
            })
        }

    }

    handleEmailInput = (event) =>{
        var input = event.target.value
        this.validateMail(input)
    }

    validateMail = (input) => {

        let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

        if (input.length > 2 && re.test(input)){
            userData.email = input
            setTimeout(this.toggleEmailInput(false),1000)
        } else {
            setTimeout(this.toggleEmailInput(true),1000)

        }
    }

    handleLicencePlateInput = (event) =>{
        var input = event.target.value
        this.validateLicencePlate(input)
    }

    validateLicencePlate = (input) => {
        if (input.length > 5){
            userData.licencePlate = input
            setTimeout(this.toggleLicencePlateInput(false),1000)

        } else {
            setTimeout(this.toggleLicencePlateInput(true),1000)

        }
    }

    getLicencePlate = () => {
        if (localStorage.getItem("userData") === null) {
            return ''
        }
        else{
            return JSON.parse(localStorage.getItem('userData')).licencePlate

        }
    }

    getEmailPlate = () => {
        if (localStorage.getItem("userData") === null) {
            return ''
        }
        else{
            return JSON.parse(localStorage.getItem('userData')).email
        }
    }

    handleDelete = () => {
        userData = {
            licencePlate: '',
            email: ''
        }
        localStorage.removeItem('userData')
        //TODO: send user back to main page and delete global state
        //this.props.history.replace("/");
    }
    render = () => {
        const {light, on_boarding, closeModal} = this.props
        const{licencePlateInputError,emailInputError, inputValid } = this.state

        let cancelBtn

        if(!on_boarding){
            cancelBtn = <Button
                variant={'outlined'}
                size={"large"}
                style={light ? {backgroundColor:'white'} : {backgroundColor:'transparent'}}
                onClick={closeModal}
            >
                Close
            </Button>
        } else {
            cancelBtn = ""
        }

        return (

            <div>
                <Grid container
                      spacing={8}
                      justify={"center"}
                      alignItems={"center"}
                      direction={"row"}
                >
                    <Grid item
                          xs={12}
                          md={6}
                    >
                        <Grid container
                              justify={"center"}>

                            <TextField
                                id="outlined-licence-name"
                                label="License plate"
                                placeholder="eg. AA12345"
                                margin="normal"
                                variant="outlined"
                                className={light ? 'light' : ''}
                                onChange={this.handleLicencePlateInput}
                                error={licencePlateInputError}
                                defaultValue={this.getLicencePlate()}
                            />
                        </Grid>
                    </Grid>

                    <Grid item
                          xs={12}
                          md={6}
                    >
                        <Grid container
                              justify={"center"}>
                            <TextField
                                id="outlined-email-input"
                                label="Email"
                                placeholder="mail@mail.com"
                                type="email"
                                name="email"
                                autoComplete="email"
                                margin="normal"
                                variant="outlined"
                                className={light ? 'light' : ''}
                                onChange={this.handleEmailInput}
                                error={emailInputError}
                                defaultValue={this.getEmailPlate()}
                            />
                        </Grid>
                    </Grid>


                </Grid>

                <Grid container
                      justify={"center"}
                      alignItems={"center"}
                      direction={"row"}
                      style={on_boarding ? {display:"none"} : {}}
                >
                    <Button
                        variant={"outlined"}
                        color={"secondary"}
                        className={"save_btn"}
                        onClick={this.handleDelete}
                    >
                        Delete my data
                    </Button>
                </Grid>

                <Grid container
                      spacing={8}
                      justify={"center"}
                      alignItems={"center"}
                      direction={"row"}
                      style={{marginTop:'1em', marginBottom:'1em'}}
                >

                    <Grid item>
                        <Button
                            variant={'outlined'}
                            size={"large"}
                            onClick={this.onClickHandler}
                            style={light ? {backgroundColor:'white'} : {backgroundColor:'transparent'}}
                            className={"save_btn"}
                            color={"secondary"}
                        >
                            Save
                        </Button>
                    </Grid>

                    <Grid item style={on_boarding ? {display:"none"} : {display:"unset"}}>

                        {cancelBtn}

                    </Grid>
                </Grid>

                {inputValid && on_boarding? <NavigationArrow direction={"down"} page={"persons-in-vehicle"}/> : ''}



            </div>
        )
    }
}