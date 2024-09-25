// Content.js
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import artworksData from '../data/artworks.json';
import { Grid, Typography, Box, Button } from '@mui/material';

function Content() {
  const { categoryName, year } = useParams();
  const isHomepage = !categoryName && !year;
  const isCategoryPage = categoryName && !year;
  const isYearPage = categoryName && year;

  // Create a map of artworks for easy access by ID
  const artworksMap = {};
  artworksData.artworks.forEach((artwork) => {
    artworksMap[artwork.id] = artwork;
  });

  if (isHomepage) {
    // Display featured artworks on the home page
    return <ArtworksGrid artworkIds={artworksData.featured} artworksMap={artworksMap} />;
  }

  if (isCategoryPage) {
    // Find the category
    const category = artworksData.categories.find(
      (cat) => cat.name.toLowerCase() === categoryName.toLowerCase()
    );

    if (!category) {
      return (
        <Typography variant="h4" sx={{ padding: 2 }}>
          Category not found
        </Typography>
      );
    }

    // Display featured artworks for the category
    return (
      <Box>
        <ArtworksGrid artworkIds={category.featured} artworksMap={artworksMap} />

        {/* List of years */}
        <Box sx={{ padding: 2 }}>
          <Typography variant="h6">Select a Year</Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
            {category.years.map((yearData) => (
              <Button
                key={yearData.year}
                component={Link}
                to={`/${category.name}/${yearData.year}`}
                sx={{ margin: 1 }}
                variant="outlined"
              >
                {yearData.year}
              </Button>
            ))}
          </Box>
        </Box>
      </Box>
    );
  }

  if (isYearPage) {
    // Find the category
    const category = artworksData.categories.find(
      (cat) => cat.name.toLowerCase() === categoryName.toLowerCase()
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

    const works = yearData.works; // This is an array of artwork IDs

    return <ArtworksGrid artworkIds={works} artworksMap={artworksMap} />;
  }

  return null;
}

function ArtworksGrid({ artworkIds, artworksMap }) {
  return (
    <Grid container spacing={2} sx={{ padding: 2 }}>
      {artworkIds.map((id) => {
        const work = artworksMap[id];

        // Check if the artwork exists
        if (!work) {
          return null; // Or handle the missing artwork appropriately
        }

        return (
          <Grid item xs={12} sm={6} md={4} key={work.id}>
            <Box>
              {work.type === 'image' && (
                <>
                  <img
                    src={work.src}
                    alt={work.title}
                    style={{ width: '100%', height: 'auto' }}
                  />
                  <Box sx={{ marginTop: 1, textAlign: 'center' }}>
                    <Typography variant="subtitle1">{work.title}</Typography>
                    {work.description && (
                      <Typography variant="body2" color="textSecondary">
                        {work.description}
                      </Typography>
                    )}
                  </Box>
                </>
              )}
              {work.type === 'audio' && (
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="subtitle1">{work.title}</Typography>
                  <audio controls style={{ width: '100%' }}>
                    <source src={work.src} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                  {work.description && (
                    <Typography variant="body2" color="textSecondary">
                      {work.description}
                    </Typography>
                  )}
                </Box>
              )}
              {work.type === 'text' && (
                <TextWorkCard work={work} />
              )}
            </Box>
          </Grid>
        );
      })}
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
    <Box sx={{ textAlign: 'center' }}>
      <Typography variant="subtitle1">{work.title}</Typography>
      <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
        {textContent}
      </Typography>
      {work.description && (
        <Typography variant="body2" color="textSecondary">
          {work.description}
        </Typography>
      )}
    </Box>
  );
}

export default Content;
