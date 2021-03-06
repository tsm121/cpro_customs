import React, { Component } from 'react'

import IconButton from '@material-ui/core/IconButton';
import "./ShoppingCartStyle.css"

export default class RemoveButton extends Component  {
    render = () => {
        return (
            <div>
                <IconButton
                    onClick={this.handleDeleteClick}
                    onMouseOver={this.onMouseOver}
                    onMouseOut={this.onMouseOut}
                    role="button"
                    type="submit"
                    value="remove item"
                >
                    <img className={"remove_button_img"}
                         src={require(`assets/img/icons/512x512/close_button_grey.png`)}
                         alt={"close-icon-grey"}
                    />
                </IconButton>
            </div>
        )
    }

    handleDeleteClick = () => {
        const {onDelete, enablePayButton} = this.props
        onDelete()
}

}

/*RemoveButton.propTypes = {
    onDelete: PropTypes.func.isRequired
};*/