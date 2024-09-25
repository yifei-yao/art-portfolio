// Content.js
import React from 'react';
import { useParams } from 'react-router-dom';
import artworksData from '../data/artworks.json';
import { Grid, Card, CardMedia, CardContent, Typography } from '@mui/material';

function Content() {
  const { categoryName, year } = useParams();

  // Find the category and year
  const category = artworksData.categories.find(
    (cat) => cat.name === categoryName
  );
  const yearData = category?.years.find((y) => y.year === year);
  const works = yearData?.works || [];

  return (
    <Grid container spacing={2} sx={{ padding: 2 }}>
      {works.map((work) => (
        <Grid item xs={12} sm={6} md={4} key={work.id}>
          <Card>
            {work.type === 'image' && (
              <CardMedia
                component="img"
                height="200"
                image={work.src}
                alt={work.title}
              />
            )}
            {work.type === 'audio' && (
              <CardContent>
                <Typography variant="h6">{work.title}</Typography>
                <Typography variant="subtitle1">
                  {work.artist || work.author}
                </Typography>
                <audio controls style={{ width: '100%' }}>
                  <source src={work.src} type="audio/mp3" />
                  Your browser does not support the audio element.
                </audio>
              </CardContent>
            )}
            {work.type === 'text' && (
              <CardContent>
                <Typography variant="h6">{work.title}</Typography>
                <Typography variant="subtitle1">
                  {work.artist || work.author}
                </Typography>
                <Typography variant="body1">{work.content}</Typography>
              </CardContent>
            )}
            {work.type === 'image' && (
              <CardContent>
                <Typography variant="h6">{work.title}</Typography>
                <Typography variant="subtitle1">
                  {work.artist || work.author}
                </Typography>
                <Typography variant="body2">{work.description}</Typography>
              </CardContent>
            )}
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default Content;
