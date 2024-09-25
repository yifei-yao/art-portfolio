// SlidingCards.js
import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { Box, VStack, Image, Text, Heading, IconButton } from '@chakra-ui/react';
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons'; // Chakra UI icons

// Updated ArtworkCard component
function ArtworkCard({ work }) {
  const [textContent, setTextContent] = useState('');

  useEffect(() => {
    if (work.type === 'text' && work.src) {
      fetch(work.src)
        .then((response) => response.text())
        .then((text) => setTextContent(text))
        .catch((error) => {
          console.error('Error fetching text content:', error);
          setTextContent('Error loading text content.');
        });
    }
  }, [work]);

  return (
    <Box
      maxWidth="100%"
      mx="auto"
      p={4}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="lg"
    >
      {work.type === 'image' && (
        <VStack spacing={4}>
          <Image src={work.src} alt={work.title} borderRadius="md" />
          <Heading fontSize="xl">{work.title}</Heading>
          {work.description && (
            <Text fontSize="md" color="gray.600" textAlign="center">
              {work.description}
            </Text>
          )}
        </VStack>
      )}
      {work.type === 'audio' && (
        <VStack spacing={4} align="center">
          <Heading fontSize="xl">{work.title}</Heading>
          <audio controls style={{ width: '100%' }}>
            <source src={work.src} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
          {work.description && (
            <Text fontSize="md" color="gray.600" textAlign="center">
              {work.description}
            </Text>
          )}
        </VStack>
      )}
      {work.type === 'text' && (
        <VStack spacing={4} align="center">
          <Heading fontSize="xl">{work.title}</Heading>
          <Text whiteSpace="pre-wrap" p={4} textAlign="center">
            {textContent || 'Loading text...'}
          </Text>
          {work.description && (
            <Text fontSize="md" color="gray.600">
              {work.description}
            </Text>
          )}
        </VStack>
      )}
    </Box>
  );
}

// Existing SlidingCards component
function SlidingCards({ artworkIds, artworksMap }) {
  const sliderRef = React.useRef(null);

  // Slider settings
  const settings = {
    dots: true,
    infinite: false, // No infinite looping
    speed: 500,
    slidesToShow: 1, // Only one slide should be shown at a time
    slidesToScroll: 1, // Scroll one slide at a time
    arrows: false, // Disable default arrows
    draggable: false, // Disable dragging
  };

  // Handler for next and previous buttons
  const next = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  const prev = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  return (
    <Box position="relative" maxWidth="100%" mx="auto">
      {/* Navigation Arrows */}
      <IconButton
        icon={<ArrowBackIcon />}
        position="absolute"
        left="10px"
        top="50%"
        transform="translateY(-50%)"
        zIndex="2"
        onClick={prev}
        variant="ghost"
        colorScheme="blue"
        aria-label="Previous"
      />
      <IconButton
        icon={<ArrowForwardIcon />}
        position="absolute"
        right="10px"
        top="50%"
        transform="translateY(-50%)"
        zIndex="2"
        onClick={next}
        variant="ghost"
        colorScheme="blue"
        aria-label="Next"
      />

      {/* Slider */}
      <Slider ref={sliderRef} {...settings}>
        {artworkIds.map((id) => {
          const work = artworksMap[id];

          if (!work) {
            return null;
          }

          return (
            <Box key={work.id}>
              <ArtworkCard work={work} />
            </Box>
          );
        })}
      </Slider>
    </Box>
  );
}

export default SlidingCards;
