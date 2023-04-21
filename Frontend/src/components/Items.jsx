import { Paper } from '@mui/material';

//DESIGNED FOR RANDOM IMAGES
function Item({item})
{
    return (
        <Paper>
            <img src={item.download_url} width="675" height="500"/>
        </Paper>
    )
}

export default Item;