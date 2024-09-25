import React from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import artworksData from '../data/artworks.json';
import { Box, Text, Button, HStack } from '@chakra-ui/react';
import SlidingCards from './SlidingCards'; // Import the SlidingCards component

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
      <SlidingCards artworkIds={artworksData.featured} artworksMap={artworksMap} />
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
        <SlidingCards artworkIds={category.featured} artworksMap={artworksMap} />

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

    return <SlidingCards artworkIds={works} artworksMap={artworksMap} />;
  }

  return null;
}

export default Content;
