import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material';
import amber from "@mui/material/colors/amber"

const theme = createTheme({
    palette: {
      primary: amber,
    },
});

export default function MultiActionAreaCard({item}) {
  return (
    <ThemeProvider theme={theme}>
        <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
            <CardMedia
            component="img"
            height="210"
            image="https://static.remove.bg/sample-gallery/graphics/bird-thumbnail.jpg"
            alt="Product"
            />
            <CardContent>
            <Typography gutterBottom variant="h5" component="div">
                {item.Pname}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                {item.description}
            </Typography>
            </CardContent>
        </CardActionArea>
        <CardActions>
            <Button size="small" color="primary">
                Add to Cart
            </Button>
        </CardActions>
        </Card>
    </ThemeProvider>
  );
}