import React, { Component } from 'react'

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';


const styles =({
    category_text: {
        textAlign: 'center',
        margin: '5px',
        textTransform: 'none'
    },

    category_button: {
        borderRadius: '0',
        background: 'white',
        margin: '10px'
    }
});


export default class CategoryButton extends Component  {
    render = () => {
        const { text, filename } = this.props

        return (
            <div>
                <Button className={"category_button"} variant='contained' size={"large"} style={styles.category_button}>
                    <Grid container spacing={0}
                          direction={"column"}
                    >
                        <Grid item>
                            <img className="icon_md" src={require(`assets/img/icons/512x512/${filename}.png`)}
                            />
                        </Grid>
                        <Grid item>
                            <h2 style={styles.category_text}>{text}</h2>
                        </Grid>
                    </Grid>
                </Button>
            </div>
        )
    }
}