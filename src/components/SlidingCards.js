// SlidingCards.js
import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import {
  Box,
  VStack,
  Image,
  Text,
  Heading,
  IconButton,
} from '@chakra-ui/react';
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';

// ArtworkCard component defined within SlidingCards.js
function ArtworkCard({ work }) {
  const [textContent, setTextContent] = useState('');

  useEffect(() => {
    if (work.type === 'text' && work.src) {
      fetch(work.src)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.text();
        })
        .then((text) => setTextContent(text))
        .catch((error) => {
          console.error('Error fetching text content:', error);
          setTextContent('Error loading text content.');
        });
    }
  }, [work]);

  return (
    <Box
      // Ensure the card fits within the viewport with some padding
      maxWidth="calc(100vw - 40px)"
      maxHeight="calc(100vh - 100px)"
      width="100%"
      height="100%"
      mx="auto"
      p={4}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="lg"
      // Responsive adjustments
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      {work.type === 'image' && (
        <VStack spacing={4} width="100%" height="100%">
          <Image
            src={work.src}
            alt={work.title}
            borderRadius="md"
            maxWidth="100%"
            maxHeight="70vh" // Limit image height to 70% of viewport height
            objectFit="contain"
          />
          <Heading fontSize="xl" textAlign="center">
            {work.title}
          </Heading>
          {work.description && (
            <Text fontSize="md" color="gray.600" textAlign="center">
              {work.description}
            </Text>
          )}
        </VStack>
      )}

      {work.type === 'audio' && (
        <VStack spacing={4} align="center" width="100%">
          <Heading fontSize="xl" textAlign="center">
            {work.title}
          </Heading>
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
        <VStack
          spacing={4}
          align="center"
          width="100%"
          height="100%"
          overflow="hidden"
        >
          <Heading fontSize="xl" textAlign="center">
            {work.title}
          </Heading>
          <Text
            whiteSpace="pre-wrap"
            p={4}
            textAlign="center"
            overflowY="auto"
            maxHeight="60vh" // Limit text area to 60% of viewport height
            width="100%"
          >
            {textContent || 'Loading text...'}
          </Text>
          {work.description && (
            <Text fontSize="md" color="gray.600" textAlign="center">
              {work.description}
            </Text>
          )}
        </VStack>
      )}
    </Box>
  );
}

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
    adaptiveHeight: true, // Adjust slider height based on content
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
    <Box position="relative" maxWidth="100%" mx="auto" p={4}>
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
            <Box key={work.id} height="100vh">
              <ArtworkCard work={work} />
            </Box>
          );
        })}
      </Slider>
    </Box>
  );
}

export default SlidingCards;
