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
  useBreakpointValue,
} from '@chakra-ui/react';
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// ArtworkCard component defined within SlidingCards.js
import YouTube from 'react-youtube';

// ArtworkCard component
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
      maxWidth={{ base: '90vw', md: '80vw', lg: '70vw' }} // Responsive maxWidth
      maxHeight={{ base: '85vh', md: '80vh', lg: '75vh' }} // Responsive maxHeight
      width="100%"
      height="100%"
      mx="auto"
      p={6} // Increased padding for a more relaxed layout
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="lg"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      {work.type === 'image' && (
        <VStack spacing={6} align="center">
          <Image
            src={work.src}
            alt={work.title}
            borderRadius="md"
            maxWidth="100%"
            maxHeight={{ base: '40vh', md: '50vh', lg: '60vh' }} // Responsive maxHeight
            objectFit="contain"
          />
          <Heading fontSize={{ base: 'lg', md: 'xl', lg: '2xl' }} textAlign="center">
            {work.title}
          </Heading>
          {work.description && (
            <Text fontSize={{ base: 'sm', md: 'md' }} color="gray.600" textAlign="center">
              {work.description}
            </Text>
          )}
        </VStack>
      )}

      {work.type === 'audio' && (
        <VStack spacing={6} align="center" width="100%">
          <Heading fontSize={{ base: 'lg', md: 'xl', lg: '2xl' }} textAlign="center">
            {work.title}
          </Heading>
          <audio controls style={{ width: '100%' }}>
            <source src={work.src} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
          {work.description && (
            <Text fontSize={{ base: 'sm', md: 'md' }} color="gray.600" textAlign="center">
              {work.description}
            </Text>
          )}
        </VStack>
      )}

      {work.type === 'video' && (
        <VStack spacing={6} align="center" width="100%">
          <Heading fontSize={{ base: 'lg', md: 'xl', lg: '2xl' }} textAlign="center">
            {work.title}
          </Heading>
          <video controls style={{ width: '100%' }}>
            <source src={work.src} type="video/mp4" />
            Your browser does not support the video element.
          </video>
          {work.description && (
            <Text fontSize={{ base: 'sm', md: 'md' }} color="gray.600" textAlign="center">
              {work.description}
            </Text>
          )}
        </VStack>
      )}

      {work.type === 'youtube' && (
        <VStack spacing={6} align="center" width="100%">
          <Heading fontSize={{ base: 'lg', md: 'xl', lg: '2xl' }} textAlign="center">
            {work.title}
          </Heading>
          <YouTube videoId={work.src} opts={{ width: '100%', height: '400px' }} />
          {work.description && (
            <Text fontSize={{ base: 'sm', md: 'md' }} color="gray.600" textAlign="center">
              {work.description}
            </Text>
          )}
        </VStack>
      )}

      {work.type === 'text' && (
        <VStack spacing={6} align="center" width="100%" overflow="hidden">
          <Heading fontSize={{ base: 'lg', md: 'xl', lg: '2xl' }} textAlign="center">
            {work.title}
          </Heading>
          <Text
            whiteSpace="pre-wrap"
            p={4}
            textAlign="center"
            overflowY="auto"
            maxHeight={{ base: '35vh', md: '40vh', lg: '45vh' }} // Responsive maxHeight for text
            width="100%"
            fontSize={{ base: 'sm', md: 'md' }}
          >
            {textContent || 'Loading text...'}
          </Text>
          {work.description && (
            <Text fontSize={{ base: 'sm', md: 'md' }} color="gray.600" textAlign="center">
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
  const [isHovered, setIsHovered] = useState(false);

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

  // Responsive button size based on screen width
  const buttonSize = useBreakpointValue({ base: 'md', md: 'lg' }); // Increased sizes

  return (
    <Box
      position="relative"
      maxWidth="100%"
      mx="auto"
      p={4}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      // Optional: To ensure the hover area covers the entire slider
      // you might need to adjust width/height or use flex layouts as needed
    >
      {/* Navigation Arrows */}
      <IconButton
        icon={<ArrowBackIcon />}
        position="absolute"
        left="20px" // Increased left margin for better spacing
        top="50%"
        transform="translateY(-50%)"
        zIndex="2"
        onClick={prev}
        variant="ghost"
        colorScheme="blue"
        aria-label="Previous"
        opacity={isHovered ? 1 : 0}
        transition="opacity 0.3s ease"
        pointerEvents={isHovered ? 'auto' : 'none'} // Prevents button from capturing events when hidden
        size={buttonSize}
      />
      <IconButton
        icon={<ArrowForwardIcon />}
        position="absolute"
        right="20px" // Increased right margin for better spacing
        top="50%"
        transform="translateY(-50%)"
        zIndex="2"
        onClick={next}
        variant="ghost"
        colorScheme="blue"
        aria-label="Next"
        opacity={isHovered ? 1 : 0}
        transition="opacity 0.3s ease"
        pointerEvents={isHovered ? 'auto' : 'none'}
        size={buttonSize}
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
