import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import CategoryButton from "./CategoryButton";
import SkipWindow from "./SkipWindow";
import ExtendButton from "./ExtendButton";
import NavigationArrow from "../../NavigationArrow";


const h1Style = {
    fontFamily: 'Arial, serif',
    fontWeight: 'normal',
    fontSize: '5vw',
    paddingLeft: '3vw',
    paddingRight: '3v',
    marginBottom: '150px',
    textAlign: 'center',
    color: '#ffffff',
};

const h1Style_secondary = {
    fontFamily: 'Arial, serif',
    fontWeight: 'normal',
    fontSize: '3vw',
    paddingLeft: '3vw',
    paddingRight: '3vw',
    textAlign: 'center',
    color: '#ffd200'
};

const categories = {
    firstList: [
        {
            text: 'Alcohol',
            filename: 'alcohol' },
        {
            text: 'Tobacco',
            filename: 'logo' },
        {
            text: 'Food',
            filename: 'logo'},
        {
            text: 'Goods',
            filename: 'logo'},
    ],

    secondList: [
        {
            text: 'Alcohol',
            filename: 'alcohol' },
        {
            text: 'Tobacco',
            filename: 'tobacco' },
        {
            text: 'Food',
            filename: 'food'},
        {
            text: 'Goods',
            filename: 'goods'},
        {
            text: 'Animal',
            filename: 'animal'}
    ]
}

export default class Categories extends Component  {

    render = () => {
        return (

            <div>
                {/* Outer Grid */}
                <Grid container
                      spacing={0}
                      direction={'column'}
                      justify={'center'}
                      alignItems={'center'}
                >
                    {/* Outer Grid item 1 */}
                    <Grid item xl={1}>
                        <h1 style={h1Style}>
                            What would you like to <span style={{color: '#ffd200'}}>declare</span>?
                        </h1>
                    </Grid>

                    {/* Outer Grid item 2 */}
                    <Grid item xl={1}>
                        {/* Inner Grid */}
                        <Grid container
                              spacing={0}
                              direction={'row'}
                              justify={'center'}
                              alignItems={'center'}
                        >

                            {categories.firstList.map(category => (
                                <Grid item xl={1}>
                                    <CategoryButton text={category.text} filename={category.filename}/>
                                </Grid>
                                ))}

                        </Grid>
                    </Grid>

                </Grid>
                <ExtendButton/>
                <SkipWindow/>
            </div>

        )
    }
}