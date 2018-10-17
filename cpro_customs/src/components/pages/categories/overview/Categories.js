import React, { Component } from 'react'

import Grid from '@material-ui/core/Grid';

import CategoryButton from "./CategoryButton";
import SkipWindow from "./SkipWindow";
import ArrowButton from "./ArrowButton";
import {categories} from "./categoryData";
import "./CategoryStyle.css"

const styles =({
    bottom_line: {
    	position:'relative',
        top:'0',
   		paddingBottom: '1em',
    },
});

export default class Categories extends Component  {
    constructor() {
        super()
        this.state = {
            more_categories: false
        }
    }

    render = () => {
        return (
            <div>
                <Grid container
                      spacing={0}
                      direction={'row'}
                      justify={'center'}
                      alignItems={'center'}
                >
                    <Grid item xs={12} sm={12} md={12} >
                        <h3 className={"cdp category_title"}>
                            What would you like to <span className={"cdp_yellow"}>declare</span>?
                        </h3>
                    </Grid>

                    <Grid item className={"category_grid"} xs={12} sm={9} md={9}
                    >
                        <Grid container
                              spacing={8}
                              direction={'row'}
                              justify={'center'}
                              alignItems={'center'}
                        >
                            {(this.renderCategories()).map (category => (
                                <Grid item xs={5} sm={4} md={3} >
                                    <CategoryButton text={category.text}
                                                    filename={category.filename}
                                                    route={"/categories/XXX"}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>

                    <Grid item xs={12} sm={12} md={12} style={styles.bottom_line}>
                        <Grid container
                              spacing={0}
                              direction={'row'}
                              justify={'space-between'}
                              alignItems={'flex-end'}
                        >
                            <Grid item xs={4} sm={4} md={4}></Grid>

                            <Grid item xs={4} sm={4} md={4} alignContent={'center'}
                             >
                                <ArrowButton
                                    direction={this.state.more_categories ? "up" : "down"}
                                    text={this.state.more_categories ? "Less categories" : "More categories"}
                                    onClick={this.handleOnClickCategories}
                                />
                            </Grid>

                            <Grid item xs={4} sm={4} md={4}>
                                <Grid container justify={"flex-end"} >
                                    <SkipWindow/>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>



        )
    }

    handleOnClickCategories = ()  =>{
        const {more_categories} = this.state
        this.setState({
            more_categories: !more_categories
        })
        this.renderCategories()
    }

    renderCategories = () => {
        const {more_categories} = this.state
        if(more_categories) {
            return categories.secondList

        } else {
            return categories.firstList
        }
    }
}