// Content.js
import React, { useEffect, useState } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import artworksData from '../data/artworks.json';
import {
  Box,
  Grid,
  Image,
  Text,
  Button,
  VStack,
  HStack,
} from '@chakra-ui/react';

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
    return (
      <ArtworksGrid artworkIds={artworksData.featured} artworksMap={artworksMap} />
    );
  }

  if (isCategoryPage) {
    // Find the category
    const category = artworksData.categories.find(
      (cat) => cat.name.toLowerCase() === categoryName.toLowerCase()
    );

    if (!category) {
      return (
        <Box p={4}>
          <Text fontSize="2xl">Category not found</Text>
        </Box>
      );
    }

    // Display featured artworks for the category
    return (
      <Box>
        <ArtworksGrid artworkIds={category.featured} artworksMap={artworksMap} />

        {/* List of years */}
        <Box p={4}>
          <Text fontSize="xl" mb={2}>
            Select a Year
          </Text>
          <HStack spacing={4} wrap="wrap">
            {category.years.map((yearData) => (
              <Button
                key={yearData.year}
                as={RouterLink}
                to={`/${category.name}/${yearData.year}`}
                variant="outline"
              >
                {yearData.year}
              </Button>
            ))}
          </HStack>
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
        <Box p={4}>
          <Text fontSize="2xl">Category not found</Text>
        </Box>
      );
    }

    const yearData = category.years.find((y) => y.year === year);

    if (!yearData) {
      return (
        <Box p={4}>
          <Text fontSize="2xl">No works available for {year}</Text>
        </Box>
      );
    }

    const works = yearData.works; // This is an array of artwork IDs

    return <ArtworksGrid artworkIds={works} artworksMap={artworksMap} />;
  }

  return null;
}

function ArtworksGrid({ artworkIds, artworksMap }) {
  return (
    <Box p={4}>
      <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={6}>
        {artworkIds.map((id) => {
          const work = artworksMap[id];

          // Check if the artwork exists
          if (!work) {
            return null; // Or handle the missing artwork appropriately
          }

          return (
            <Box key={work.id}>
              {work.type === 'image' && (
                <VStack spacing={2}>
                  <Image src={work.src} alt={work.title} />
                  <Text fontSize="lg" fontWeight="bold">
                    {work.title}
                  </Text>
                  {work.description && (
                    <Text fontSize="sm" color="gray.600">
                      {work.description}
                    </Text>
                  )}
                </VStack>
              )}
              {work.type === 'audio' && (
                <VStack spacing={2} align="center">
                  <Text fontSize="lg" fontWeight="bold">
                    {work.title}
                  </Text>
                  <audio controls style={{ width: '100%' }}>
                    <source src={work.src} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                  {work.description && (
                    <Text fontSize="sm" color="gray.600">
                      {work.description}
                    </Text>
                  )}
                </VStack>
              )}
              {work.type === 'text' && <TextWorkCard work={work} />}
            </Box>
          );
        })}
      </Grid>
    </Box>
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
    <VStack spacing={2} align="center">
      <Text fontSize="lg" fontWeight="bold">
        {work.title}
      </Text>
      <Text whiteSpace="pre-wrap">{textContent}</Text>
      {work.description && (
        <Text fontSize="sm" color="gray.600">
          {work.description}
        </Text>
      )}
    </VStack>
  );
}

export default Content;
