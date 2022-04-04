import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';


function Item({key, itemName, authorName, description}) { // price, title, name
// sx={{ maxWidth: 345 }}
    return (
        <Card 
        style={{ 
            marginLeft: '5%',
            marginRight: '5%',
            marginTop: "2%"
    }}
        >
      <CardHeader
        title={itemName}
        subheader={authorName}
      />
 
      <CardContent>
        <Typography variant="v" color="text.primary">
          {description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
  
      </CardActions>
    </Card>
    );
}

export default Item;