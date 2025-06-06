import { useEffect, useState, useRef } from 'react';

interface Cover {
  id: string;
  title: string;
  artist: string;
  duration: string;
  image: string;
  audioFile: string;
}

// Sample covers data - replace with your actual covers
const sampleCovers: Cover[] = [
  {
    id: '1',
    title: 'Soft Piano Melody',
    artist: 'Piano Artist',
    duration: '3:45',
    image: '/images/covers/soft-cover.jpg',
    audioFile: '/sounds/soft.mp3'
  },
  {
    id: '2',
    title: 'Moonlight Sonata',
    artist: 'Beethoven (Piano Cover)',
    duration: '4:20',
    image: '/images/covers/moonlight-cover.jpg',
    audioFile: '/sounds/moonlight.mp3'
  },
  {
    id: '3',
    title: 'Canon in D',
    artist: 'Pachelbel (Piano Version)',
    duration: '5:15',
    image: '/images/covers/canon-cover.jpg',
    audioFile: '/sounds/canon.mp3'
  },
  {
    id: '4',
    title: 'River Flows in You',
    artist: 'Yiruma',
    duration: '3:30',
    image: '/images/covers/river-cover.jpg',
    audioFile: '/sounds/river.mp3'
  },
  {
    id: '5',
    title: 'Für Elise',
    artist: 'Beethoven (Modern Cover)',
    duration: '2:58',
    image: '/images/covers/elise-cover.jpg',
    audioFile: '/sounds/elise.mp3'
  },
  {
    id: '6',
    title: 'Clair de Lune',
    artist: 'Debussy',
    duration: '4:45',
    image: '/images/covers/clair-cover.jpg',
    audioFile: '/sounds/clair.mp3'
  }
];

export default function CoversPage() {
  const [covers, setCovers] = useState<Cover[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Simulate loading from server or use actual API call
    const loadCovers = async () => {
      try {
        setLoading(true);
        // Replace this with actual API call if needed
        // const response = await axios.get('/api/covers');
        // setCovers(response.data);
        
        // For now, using sample data
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate loading
        setCovers(sampleCovers);
      } catch (err) {
        setError('Failed to load covers');
        console.error('Error loading covers:', err);
      } finally {
        setLoading(false);
      }
    };

    loadCovers();
  }, []);

  const handlePlayCover = async (cover: Cover) => {
    try {
      // Stop current audio if playing
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }

      // If clicking the same cover that's playing, stop it
      if (currentlyPlaying === cover.id) {
        setCurrentlyPlaying(null);
        return;
      }

      // Create new audio instance
      const audio = new Audio(cover.audioFile);
      audioRef.current = audio;

      // Set up audio event listeners
      audio.addEventListener('loadstart', () => {
        setCurrentlyPlaying(cover.id);
      });

      audio.addEventListener('ended', () => {
        setCurrentlyPlaying(null);
      });

      audio.addEventListener('error', (e) => {
        console.error('Audio playback error:', e);
        setError(`Failed to play ${cover.title}`);
        setCurrentlyPlaying(null);
      });

      // Start playing
      await audio.play();
    } catch (error) {
      console.error('Error playing cover:', error);
      setError(`Failed to play ${cover.title}`);
      setCurrentlyPlaying(null);
    }
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    // Fallback to a default image if cover image fails to load
    e.currentTarget.src = '/images/default-cover.jpg';
  };

  if (loading) {
    return (
      <div className="covers-page">
        <div className="covers-header">
          <h1 className="covers-title">Piano Covers</h1>
          <p className="covers-subtitle">Beautiful piano melodies to inspire your playing</p>
        </div>
        <div className="loading">
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="covers-page">
        <div className="covers-header">
          <h1 className="covers-title">Piano Covers</h1>
          <div style={{ 
            color: '#e94560', 
            textAlign: 'center', 
            fontSize: '1.1rem', 
            marginTop: '2rem' 
          }}>
            {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="covers-page">
      <div className="covers-header">
        <h1 className="covers-title">Piano Covers</h1>
        <p className="covers-subtitle">
          Click on any cover to listen to beautiful piano melodies
        </p>
      </div>

      <div className="covers-grid">
        {covers.map((cover) => (
          <div
            key={cover.id}
            className={`cover-card ${currentlyPlaying === cover.id ? 'playing' : ''}`}
            onClick={() => handlePlayCover(cover)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handlePlayCover(cover);
              }
            }}
          >
            <div style={{ position: 'relative', overflow: 'hidden' }}>
              <img
                src={cover.image}
                alt={`${cover.title} cover`}
                className="cover-image"
                onError={handleImageError}
                loading="lazy"
              />
              <div className="play-overlay">
                {currentlyPlaying === cover.id ? '⏸️' : '▶️'}
              </div>
            </div>
            
            <div className="cover-content">
              <h3 className="cover-title">{cover.title}</h3>
              <p className="cover-artist">{cover.artist}</p>
              <p className="cover-duration">{cover.duration}</p>
            </div>
          </div>
        ))}
      </div>

      {covers.length === 0 && (
        <div style={{ 
          textAlign: 'center', 
          color: '#666666', 
          fontSize: '1.1rem', 
          marginTop: '3rem' 
        }}>
          No covers available at the moment.
        </div>
      )}
    </div>
  );
}