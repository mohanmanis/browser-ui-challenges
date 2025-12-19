# Music Player - Interview Solution

An interview-ready music player UI built with React. Displays a list of songs with play/pause functionality, progress tracking, and search/filter capabilities.

## 🎯 Interview Requirements

✅ **Get data from API** - Mock fetchSongs() function
✅ **List of songs** - Display with play times
✅ **Current active track** - Highlighted in list
✅ **Click to play/pause** - Toggle playback on click
✅ **Show playing track** - Display at bottom of player
✅ **Show time and progress** - Current time + progress bar
✅ **Search/filter songs** - Filter by title, artist, or album

## 📁 Project Structure

```
music-player/
├── src/
│   ├── MusicPlayer.jsx    # Main component (~230 lines)
│   ├── MusicPlayer.css    # Styling
│   ├── App.jsx            # Entry point
│   ├── main.jsx           # React mount
│   └── index.css          # Global styles
└── package.json
```

## 🚀 Quick Start

```bash
# Install dependencies
bun install

# Run development server
bun dev

# Open http://localhost:5173
```

## 📊 Features

### 1. Mock API Data

```javascript
const fetchSongs = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, title: 'Bohemian Rhapsody', artist: 'Queen', duration: 354, ... },
        // ... more songs
      ]);
    }, 300);
  });
};
```

**10 sample songs** with title, artist, album, and duration

### 2. Song List Display

- Table-style layout with columns: Title, Artist, Album, Duration
- Play button icon for each song
- Duration formatted as MM:SS
- Scrollable list

### 3. Active Track Highlighting

```javascript
className={`song-item ${currentSong?.id === song.id ? 'active' : ''}`}
```

- Active song highlighted with blue background
- Special border and pulsing play icon
- Clear visual indication of current track

### 4. Play/Pause Functionality

```javascript
const handlePlayPause = (song) => {
  if (currentSong?.id === song.id) {
    setIsPlaying(!isPlaying);  // Toggle if same song
  } else {
    setCurrentSong(song);       // Start new song
    setCurrentTime(0);
    setIsPlaying(true);
  }
};
```

- Click song → starts playing
- Click again → pauses
- Click different song → switches tracks

### 5. Player Controls (Bottom)

- **Track Info**: Title and artist of current song
- **Play/Pause Button**: Large circular button
- **Progress Bar**: Visual progress indicator
- **Time Display**: Current time / Total duration

### 6. Progress Bar

```javascript
const handleProgressClick = (e) => {
  const percentage = clickX / width;
  setCurrentTime(percentage * currentSong.duration);
};
```

- Click anywhere on bar to seek
- Auto-updates as song plays
- Shows percentage complete

### 7. Search/Filter

```javascript
const filteredSongs = songs.filter((song) => {
  const query = searchQuery.toLowerCase();
  return (
    song.title.toLowerCase().includes(query) ||
    song.artist.toLowerCase().includes(query) ||
    song.album.toLowerCase().includes(query)
  );
});
```

- Search by title, artist, or album
- Real-time filtering
- Clear search button

## 🧠 Key Implementation Details

### State Management

```javascript
const [songs, setSongs] = useState([]);          // All songs from API
const [currentSong, setCurrentSong] = useState(null);  // Currently selected
const [isPlaying, setIsPlaying] = useState(false);     // Play/pause state
const [currentTime, setCurrentTime] = useState(0);     // Progress in seconds
const [searchQuery, setSearchQuery] = useState('');    // Filter text
```

### Playback Simulation

```javascript
useEffect(() => {
  if (isPlaying && currentSong) {
    intervalRef.current = setInterval(() => {
      setCurrentTime(prev => {
        if (prev >= currentSong.duration) {
          setIsPlaying(false);  // Stop at end
          return 0;
        }
        return prev + 1;
      });
    }, 1000);
  }
  return () => clearInterval(intervalRef.current);
}, [isPlaying, currentSong]);
```

**Note:** Uses setInterval to simulate playback (1 second increments)

### Time Formatting

```javascript
const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};
```

Converts seconds to `MM:SS` format (e.g., 354 → "5:54")

## 💡 Interview Talking Points

### Why This Approach?

**Simple State Management:**
"I use useState for everything because the state is simple and localized. No need for Redux or Context."

**Simulated Playback:**
"In a real app, I'd use the HTML5 Audio API. For this demo, I simulate with setInterval to show the logic."

**Search Strategy:**
"I filter the array on every keystroke. For large datasets (1000+ songs), I'd add debouncing."

**Cleanup:**
"I clear the interval in the useEffect cleanup function to prevent memory leaks."

### Real Audio Implementation (If Asked)

```javascript
const audioRef = useRef(new Audio());

const handlePlayPause = (song) => {
  if (currentSong?.id === song.id) {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
  } else {
    audioRef.current.src = song.url;
    audioRef.current.play();
  }
};

// Listen to timeupdate event
audioRef.current.ontimeupdate = () => {
  setCurrentTime(audioRef.current.currentTime);
};
```

## 🎨 UI Features

- **Gradient Background**: Purple gradient for modern look
- **Card Design**: Clean white player card
- **Hover Effects**: Songs highlight on hover
- **Active State**: Playing song has blue background
- **Pulsing Icon**: Play icon pulses when active
- **Responsive**: Works on mobile and desktop
- **Smooth Animations**: All transitions are smooth

## 📈 Complexity Analysis

### Time Complexity
- **Filter**: O(n × m) where n = songs, m = search query length
- **Play/Pause**: O(1) - direct state update
- **Progress Update**: O(1) - interval callback

### Space Complexity
- O(n) where n = number of songs

## ✨ What Makes This Interview-Ready?

1. **Complete in 45-60 min** ⏱️
2. **All requirements met** ✅
3. **Clean, readable code** 📖
4. **Single component** - easy to review
5. **Real-world patterns** - state management, effects
6. **Explainable** - clear logic flow

## 🎓 Concepts Demonstrated

- React Hooks (useState, useEffect, useRef)
- Async data fetching
- Array filtering/searching
- setInterval for timers
- Event handling (clicks)
- Conditional rendering
- CSS Grid layout
- Responsive design

## 🔧 Running the App

```bash
bun dev
```

Visit: **http://localhost:5173/**

Try:
1. Click a song → starts playing
2. Click again → pauses
3. Click different song → switches
4. Watch progress bar move
5. Click progress bar → seeks to position
6. Type in search → filters list
7. Clear search → shows all songs

## 🏁 Checklist

- ✅ Data loaded from API (mock)
- ✅ Songs listed with durations
- ✅ Active track highlighted
- ✅ Click to play/pause
- ✅ Shows current track info
- ✅ Progress bar updates
- ✅ Time display (current/total)
- ✅ Search/filter works
- ✅ Clean UI
- ✅ Responsive design

---

**Status:** ✅ Ready for Interview
**Time to Complete:** 45-60 minutes
**Difficulty:** Medium
**Key Skills:** React Hooks, State Management, Timers
