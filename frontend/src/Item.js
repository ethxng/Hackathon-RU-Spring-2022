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
        <Card >
      <CardHeader
        title={itemName + key}
        subheader={authorName}
      />
      <CardContent>
        <Typography variant="caption" color="text.primary">
          {description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
  
      </CardActions>
    </Card>
    );
}

export default Item;