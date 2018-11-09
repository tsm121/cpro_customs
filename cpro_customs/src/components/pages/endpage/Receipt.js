import React, { Component } from 'react'

import Grid from "@material-ui/core/Grid/Grid";
import QRCode from "qrcode.react"

export default class Receipt extends Component {


	render = () => {
		const {QR_url} = this.props
		return(
			<Grid container
				  direction={"column"}
				  justify={"center"}
				  alignItems={"center"}
			>
				<Grid item>
					<h3 className={"modal_title"}>
						Declaration receipt:
					</h3>
				</Grid>

				<Grid item>
					<QRCode
                        value={QR_url}
                        renderAs="svg"
                        size="256"
                        level="M"
                    />
				</Grid>
			</Grid>
		)
	}
}