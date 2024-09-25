// Content.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import artworksData from '../data/artworks.json';
import { Grid, Card, CardMedia, CardContent, Typography, Box } from '@mui/material';

function Content() {
  const { categoryName, year } = useParams();
  const isHomepage = !categoryName && !year;

  if (isHomepage) {
    // Display featured artworks without "Featured Works" heading
    return <ArtworksGrid works={artworksData.featured} />;
  }

  // Find the category and year
  const category = artworksData.categories.find(
    (cat) => cat.name === categoryName
  );

  if (!category) {
    return (
      <Typography variant="h4" sx={{ padding: 2 }}>
        Category not found
      </Typography>
    );
  }

  const yearData = category.years.find((y) => y.year === year);

  if (!yearData) {
    return (
      <Typography variant="h4" sx={{ padding: 2 }}>
        No works available for {year}
      </Typography>
    );
  }

  const works = yearData.works;

  return <ArtworksGrid works={works} />;
}

function ArtworksGrid({ works }) {
  return (
    <Grid container spacing={2} sx={{ padding: 2 }}>
      {works.map((work) => (
        <Grid item xs={12} sm={6} md={4} key={work.id}>
          <Card
            sx={{
              boxShadow: 'none',
              borderRadius: 0,
              backgroundColor: 'transparent',
            }}
          >
            {/* Updated code for image type */}
            {work.type === 'image' && (
              <>
                <CardMedia
                  component="img"
                  image={work.src}
                  alt={work.title}
                  sx={{ width: '100%', height: 'auto' }}
                />
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="subtitle1">{work.title}</Typography>
                  {work.description && (
                    <Typography variant="body2" color="textSecondary">
                      {work.description}
                    </Typography>
                  )}
                </CardContent>
              </>
            )}
            {/* Audio work remains the same */}
            {work.type === 'audio' && (
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h6">{work.title}</Typography>
                <audio controls style={{ width: '100%' }}>
                  <source src={work.src} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
                {work.description && (
                  <Typography variant="body2">{work.description}</Typography>
                )}
              </CardContent>
            )}
            {/* Text work remains the same */}
            {work.type === 'text' && (
              <TextWorkCard work={work} />
            )}
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

function TextWorkCard({ work }) {
  const [textContent, setTextContent] = useState('');

  useEffect(() => {
    fetch(work.src)
      .then((response) => response.text())
      .then((data) => setTextContent(data))
      .catch((error) => {
        console.error('Error fetching text content:', error);
        setTextContent('Failed to load content.');
      });
  }, [work.src]);

  return (
    <CardContent sx={{ textAlign: 'center' }}>
      <Typography variant="h6">{work.title}</Typography>
      <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
        {textContent}
      </Typography>
      {work.description && (
        <Typography variant="body2">{work.description}</Typography>
      )}
    </CardContent>
  );
}

export default Content;
