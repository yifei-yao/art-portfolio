import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';

const artworks = [
  // Example data
  { id: 1, type: 'image', src: '/path/to/image1.jpg', title: 'Artwork 1' },
  { id: 2, type: 'video', src: '/path/to/video1.mp4', title: 'Artwork 2' },
  { id: 3, type: 'audio', src: '/path/to/audio1.mp3', title: 'Artwork 3' },
  { id: 4, type: 'text', content: 'This is a literary work.', title: 'Artwork 4' },
];

function Content() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : artworks.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex < artworks.length - 1 ? prevIndex + 1 : 0));
  };

  const currentArtwork = artworks[currentIndex];

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: 'calc(100vh - 64px)', // Adjust for AppBar height
        padding: 2,
      }}
    >
      <Typography variant="h4" gutterBottom>
        {currentArtwork.title}
      </Typography>

      {/* Display Artwork Based on Type */}
      {currentArtwork.type === 'image' && (
        <img
          src={currentArtwork.src}
          alt={currentArtwork.title}
          style={{ maxWidth: '100%', maxHeight: '70vh' }}
        />
      )}
      {currentArtwork.type === 'video' && (
        <video controls style={{ maxWidth: '100%', maxHeight: '70vh' }}>
          <source src={currentArtwork.src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
      {currentArtwork.type === 'audio' && (
        <audio controls>
          <source src={currentArtwork.src} type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>
      )}
      {currentArtwork.type === 'text' && (
        <Typography variant="body1">{currentArtwork.content}</Typography>
      )}

      {/* Navigation Buttons */}
      <Box sx={{ marginTop: 2 }}>
        <Button variant="contained" onClick={handlePrev} sx={{ marginRight: 1 }}>
          Previous
        </Button>
        <Button variant="contained" onClick={handleNext}>
          Next
        </Button>
      </Box>
    </Box>
  );
}

export default Content;
