import React, { Component } from 'react'

import Grid from '@material-ui/core/Grid';

import LangButton from "./LangButton";
import InputFields from "../InputFields";

export default class SettingsWindow extends Component  {
	render = () => {
	    const {closeModal} = this.props
		return (

			<div className={'modal react-transition fade-in'}>

				<Grid container spacing={24}
					  justify={"center"}
					  alignItems={"center"}
					  direction={"row"}
				>
					<Grid container
						  justify={"center"}
					>
						<h1 className={"modal_title"}>
							Settings
						</h1>
					</Grid>

					<Grid container
						  justify={"center"}
					>
						<h3 className={"modal_title"}>
							Language selection
						</h3>
					</Grid>


					<Grid container
						  spacing={8}
						  direction={"row"}
						  justify={"center"}
						  alignItems={"center"}
					>
						<Grid item>
							<LangButton
								text={'Norsk'}
								countryName={'norway'}
							/>
						</Grid>

						<Grid item>
							<LangButton
								text={'Svenska'}
								countryName={'sweden'}
							/>
						</Grid>

						<Grid item>
							<LangButton
								text={'English'}
								countryName={'uk'}
							/>
						</Grid>

					</Grid>

					<Grid container
						  justify={"center"}

					>
						<h3 className={"modal_title"} style={{marginBottom:'0'}}>
							Personal settings
						</h3>
					</Grid>

					<Grid container
						  justify={"center"}
					>

						<InputFields
                            closeModal={closeModal}
                        />
					</Grid>

                </Grid>

			</div>
		)
	}
}