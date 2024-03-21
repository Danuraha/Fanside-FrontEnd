import React from "react";
import ResponsiveDatePickers from "../Components/DatePicker";
import { Grid } from "@mui/material";
function TicketbookingPage(){
    return(
        <div>
            <h1>Ticket Booking Page</h1>
            <Grid width={'300px'}>
            <ResponsiveDatePickers/>

            </Grid>
        </div>
    )
}
export default TicketbookingPage;