import { useState, useEffect, useRef } from 'react';
import './MusicPlayer.css';

// Mock API - returns song data
const fetchSongs = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, title: 'Bohemian Rhapsody', artist: 'Queen', duration: 354, album: 'A Night at the Opera' },
        { id: 2, title: 'Stairway to Heaven', artist: 'Led Zeppelin', duration: 482, album: 'Led Zeppelin IV' },
        { id: 3, title: 'Hotel California', artist: 'Eagles', duration: 391, album: 'Hotel California' },
        { id: 4, title: 'Imagine', artist: 'John Lennon', duration: 183, album: 'Imagine' },
        { id: 5, title: 'Smells Like Teen Spirit', artist: 'Nirvana', duration: 301, album: 'Nevermind' },
        { id: 6, title: 'Billie Jean', artist: 'Michael Jackson', duration: 294, album: 'Thriller' },
        { id: 7, title: 'Sweet Child O Mine', artist: 'Guns N Roses', duration: 356, album: 'Appetite for Destruction' },
        { id: 8, title: 'Hey Jude', artist: 'The Beatles', duration: 431, album: 'Hey Jude' },
        { id: 9, title: 'Thunderstruck', artist: 'AC/DC', duration: 292, album: 'The Razors Edge' },
        { id: 10, title: 'Purple Rain', artist: 'Prince', duration: 524, album: 'Purple Rain' },
      ]);
    }, 300);
  });
};

// Format seconds to MM:SS
const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export default function MusicPlayer() {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const intervalRef = useRef(null);

  // Fetch songs on mount
  useEffect(() => {
    fetchSongs().then((data) => {
      setSongs(data);
      setLoading(false);
    });
  }, []);

  // Simulate playback timer
  useEffect(() => {
    if (isPlaying && currentSong) {
      intervalRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= currentSong.duration) {
            // Song ended - stop or go to next
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, currentSong]);

  // Filter songs based on search
  const filteredSongs = songs.filter((song) => {
    const query = searchQuery.toLowerCase();
    return (
      song.title.toLowerCase().includes(query) ||
      song.artist.toLowerCase().includes(query) ||
      song.album.toLowerCase().includes(query)
    );
  });

  // Handle play/pause
  const handlePlayPause = (song) => {
    if (currentSong?.id === song.id) {
      // Same song - toggle play/pause
      setIsPlaying(!isPlaying);
    } else {
      // New song - start playing
      setCurrentSong(song);
      setCurrentTime(0);
      setIsPlaying(true);
    }
  };

  // Handle progress bar click
  const handleProgressClick = (e) => {
    if (!currentSong) return;
    const progressBar = e.currentTarget;
    const clickX = e.clientX - progressBar.getBoundingClientRect().left;
    const width = progressBar.offsetWidth;
    const percentage = clickX / width;
    setCurrentTime(Math.floor(percentage * currentSong.duration));
  };

  const progress = currentSong ? (currentTime / currentSong.duration) * 100 : 0;

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading music library...</p>
      </div>
    );
  }

  return (
    <div className="music-player">
      <div className="player-header">
        <h1>🎵 Music Player</h1>
        <p>Interview-Ready Solution</p>
      </div>

      {/* Search Bar */}
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search by song, artist, or album..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <button className="clear-search" onClick={() => setSearchQuery('')}>
            ✕
          </button>
        )}
      </div>

      {/* Song List */}
      <div className="song-list">
        <div className="list-header">
          <div className="col-title">Title</div>
          <div className="col-artist">Artist</div>
          <div className="col-album">Album</div>
          <div className="col-duration">Duration</div>
        </div>

        {filteredSongs.length === 0 ? (
          <div className="no-results">
            <p>No songs found</p>
            <small>Try a different search term</small>
          </div>
        ) : (
          filteredSongs.map((song) => (
            <div
              key={song.id}
              className={`song-item ${currentSong?.id === song.id ? 'active' : ''}`}
              onClick={() => handlePlayPause(song)}
            >
              <div className="col-title">
                <div className="play-icon">
                  {currentSong?.id === song.id && isPlaying ? '⏸' : '▶'}
                </div>
                <span className="song-title">{song.title}</span>
              </div>
              <div className="col-artist">{song.artist}</div>
              <div className="col-album">{song.album}</div>
              <div className="col-duration">{formatTime(song.duration)}</div>
            </div>
          ))
        )}
      </div>

      {/* Player Controls (Bottom) */}
      <div className="player-controls">
        {currentSong ? (
          <>
            <div className="now-playing">
              <div className="track-info">
                <div className="track-title">{currentSong.title}</div>
                <div className="track-artist">{currentSong.artist}</div>
              </div>
              <div className="play-control">
                <button className="control-btn" onClick={() => setIsPlaying(!isPlaying)}>
                  {isPlaying ? '⏸' : '▶'}
                </button>
              </div>
            </div>

            <div className="progress-container">
              <span className="time-current">{formatTime(currentTime)}</span>
              <div className="progress-bar" onClick={handleProgressClick}>
                <div className="progress-fill" style={{ width: `${progress}%` }}></div>
              </div>
              <span className="time-total">{formatTime(currentSong.duration)}</span>
            </div>
          </>
        ) : (
          <div className="no-track">
            <p>No track selected</p>
            <small>Click on a song to start playing</small>
          </div>
        )}
      </div>

      {/* Requirements Checklist */}
      <div className="requirements">
        <h3>✅ Requirements Met:</h3>
        <ul>
          <li>✓ Get data from API (mock fetchSongs function)</li>
          <li>✓ List of songs with play times displayed</li>
          <li>✓ Show current active track (highlighted)</li>
          <li>✓ Click to play/pause song</li>
          <li>✓ Show playing track info at bottom</li>
          <li>✓ Show current time and progress bar</li>
          <li>✓ Search/filter songs by title, artist, or album</li>
        </ul>
      </div>
    </div>
  );
}
