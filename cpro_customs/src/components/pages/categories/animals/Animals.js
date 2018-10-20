import React, {Component} from "react";
import PageTitle from "../PageTitle";

import SubSelection from "./SubSelection";
import Grid from "@material-ui/core/Grid/Grid";


class Animals extends Component {
    render = () => {
        return (
            <div>
                <PageTitle title={"Animals"}/>
                <Grid container spacing={32} direction={"column"}>
                    <Grid item>
                        <SubSelection
                            text={"I am travelling with my pet"}
                            icon={"dog"}
                            route={"/categories/animals/pet"}
                        />
                    </Grid>
                    <Grid item>
                        <SubSelection
                            text={"I am travelling with my horse"}
                            icon={"horse"}
                            route={"/categories/animals/horse"}
                        />
                    </Grid>
                    <Grid item>
                        <SubSelection
                            text={"I bought an animal abroad"}
                            icon={"animal"}
                            route={"/categories/animals/bought"}
                        />
                    </Grid>
                    <Grid item>
                        <SubSelection
                            text={"I want to import an animal"}
                            icon={"animal"}
                            route={"/categories/animals/import"}
                        />
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default Animals;