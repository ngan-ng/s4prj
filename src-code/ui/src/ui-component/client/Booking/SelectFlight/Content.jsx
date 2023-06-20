import * as React from 'react';
import BookingDetails from "../BookingDetails";
import {CardContent, Box, Grid, Typography, Card} from "@mui/material";
import CustomPagination from "./CustomPagination";



const Content = () => {
    return (
        <>
        <CustomPagination />
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={4} md={4}>
                    <BookingDetails />
                </Grid>
                <Grid item xs={8} md={8}>
                    <Card variant="outlined">
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                           aaaa
                        </Typography>


                    </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
        </>
    );
}

export default Content;
