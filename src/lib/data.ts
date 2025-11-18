import { colors } from "./colors";

export interface Playlist {
  id: string;
  title: string;
  color: (typeof colors)[keyof typeof colors];
  cover: string;
  artists: string[];
}

export const playlists: Playlist[] = [
  {
    id: "1",
    title: "Electronic Party",
    color: colors.teal,
    cover:
      "https://res.cloudinary.com/dp3ppkxo5/image/upload/v1693776174/spotify-astro/playlist_1_yci5uf.jpg",
    artists: ["Avicii", "Alok"],
  },
  {
    id: "2",
    title: "Trance",
    color: colors.green,
    cover:
      "https://res.cloudinary.com/dp3ppkxo5/image/upload/v1693776174/spotify-astro/playlist_2_f9ymlx.jpg",
    artists: ["Tiesto", "Armin Van Buuren"],
  },
  {
    id: "3",
    title: "Trap Vibes",
    color: colors.rose,
    cover:
      "https://res.cloudinary.com/dp3ppkxo5/image/upload/v1693776175/spotify-astro/playlist_3_grshca.jpg",
    artists: ["Post Malone", "Travis Scott", "21 savage"],
  },
  {
    id: "4",
    title: "Beatles Classics",
    color: colors.red,
    cover:
      "https://res.cloudinary.com/dp3ppkxo5/image/upload/v1693776175/spotify-astro/playlist_4_ap5xnb.jpg",
    artists: ["The Beatles"],
  },
  {
    id: "5",
    title: "Electronic Dance",
    color: colors.pink,
    cover:
      "https://res.cloudinary.com/dp3ppkxo5/image/upload/v1693776175/spotify-astro/playlist_5_erjyb7.jpg",
    artists: ["Deadmau5"],
  },
  {
    id: "6",
    title: "Cow songs",
    color: colors.gray,
    cover:
      "https://res.cloudinary.com/dp3ppkxo5/image/upload/v1693776474/spotify-astro/R-15112137-1586815179-1911_fsyl58.jpg",
    artists: ["Saint Hilda", "Canada Buffalo"],
  },
];

export const morePlaylists = [
  ...playlists.map((item) => ({
    ...item,
    id: item.id + "a",
  })),
];

export const sidebarPlaylists = [
  ...playlists.map((item) => ({
    ...item,
    id: item.id + "_side",
  })),
];

export const allPlaylists = [
  ...playlists,
  ...morePlaylists,
  ...sidebarPlaylists,
];

// Helper functions for managing liked playlists in localStorage
export function getLikedPlaylists(): Set<string> {
  if (typeof window === 'undefined') {
    return new Set();
  }
  
  try {
    const stored = localStorage.getItem('likedPlaylists');
    if (!stored) return new Set();
    
    const parsed = JSON.parse(stored);
    return new Set(Array.isArray(parsed) ? parsed : []);
  } catch (error) {
    console.error('Error reading liked playlists:', error);
    return new Set();
  }
}

export function isPlaylistLiked(playlistId: string): boolean {
  const liked = getLikedPlaylists();
  return liked.has(playlistId);
}

export function togglePlaylistLike(playlistId: string): boolean {
  const liked = getLikedPlaylists();
  
  if (liked.has(playlistId)) {
    liked.delete(playlistId);
  } else {
    liked.add(playlistId);
  }
  
  try {
    localStorage.setItem('likedPlaylists', JSON.stringify([...liked]));
  } catch (error) {
    console.error('Error saving liked playlists:', error);
  }
  
  return liked.has(playlistId);
}

// Helper function to get sorted playlists based on likes
export function getSortedPlaylists(playlistArray: Playlist[]): Playlist[] {
  // If running on server (no window), return original array
  if (typeof window === 'undefined') {
    return playlistArray;
  }
  
  const likedPlaylistIds = getLikedPlaylists();
  
  // Create a copy and sort it
  return [...playlistArray].sort((a, b) => {
    const aLiked = likedPlaylistIds.has(a.id);
    const bLiked = likedPlaylistIds.has(b.id);
    
    // Liked playlists come first
    if (aLiked && !bLiked) return -1;
    if (!aLiked && bLiked) return 1;
    
    // Keep original order for items with same like status
    return 0;
  });
}

interface Song {
  id: string;
  title: string;
  image: string;
  artists: string[];
  album: string;
  duration: string;
}
const songScale = "w_40,h_40,c_scale";
export const songs: Song[] = [
  {
    id: "1",
    title: "The Nights",
    image: `https://res.cloudinary.com/dp3ppkxo5/image/upload/${songScale}/v1693776175/spotify-astro/song_1_qitfwl.jpg`,
    artists: ["Avicii"],
    album: "The Days / Nights",
    duration: "2:56",
  },
  {
    id: "2",
    title: "Saint-Tropez",
    image: `https://res.cloudinary.com/dp3ppkxo5/image/upload/${songScale}/v1693776175/spotify-astro/song_2_cijs8v.jpg`,
    artists: ["Post Malone"],
    album: "Hollywood's Bleeding",
    duration: "2:23",
  },
  {
    id: "3",
    title: "SICKO MODE",
    image: `https://res.cloudinary.com/dp3ppkxo5/image/upload/${songScale}/v1693776176/spotify-astro/song_3_td9ncs.jpg`,
    artists: ["Travis Scott", "Drake"],
    album: "ASTROWORLD",
    duration: "5:13",
  },
  {
    id: "4",
    title: "Blinding Lights",
    image: `https://res.cloudinary.com/dp3ppkxo5/image/upload/${songScale}/v1693776176/spotify-astro/song_4_lwumgu.png`,
    artists: ["The Weeknd"],
    album: "After Hours",
    duration: "3:22",
  },
  {
    id: "5",
    title: "Shape of You",
    image: `https://res.cloudinary.com/dp3ppkxo5/image/upload/${songScale}/v1693776175/spotify-astro/song_5_rd5xqa.jpg`,
    artists: ["Ed Sheeran"],
    album: "÷ (Divide)",
    duration: "3:53",
  },
  {
    id: "6",
    title: "Uptown Funk",
    image: `https://res.cloudinary.com/dp3ppkxo5/image/upload/${songScale}/v1693776175/spotify-astro/song_6_f1lt7y.jpg`,
    artists: ["Mark Ronson", "Bruno Mars"],
    album: "Uptown Special",
    duration: "4:30",
  },
  {
    id: "7",
    title: "Bad Guy",
    image: `https://res.cloudinary.com/dp3ppkxo5/image/upload/${songScale}/v1693776175/spotify-astro/song_7_m7f0mh.jpg`,
    artists: ["Billie Eilish"],
    album: "When We All Fall Asleep, Where Do We Go?",
    duration: "3:14",
  },
  {
    id: "8",
    title: "Yesterday",
    image: `https://res.cloudinary.com/dp3ppkxo5/image/upload/${songScale}/v1693776175/spotify-astro/song_8_hwxisr.jpg`,
    artists: ["The Beatles"],
    album: "Today & Tomorrow",
    duration: "4:38",
  },
  {
    id: "9",
    title: "Havana",
    image: `https://res.cloudinary.com/dp3ppkxo5/image/upload/${songScale}/v1693776176/spotify-astro/song_9_szemzp.jpg`,
    artists: ["Camila Cabello", "Young Thug"],
    album: "Camila",
    duration: "3:37",
  },
  {
    id: "10",
    title: "Radioactive",
    image: `https://res.cloudinary.com/dp3ppkxo5/image/upload/${songScale}/v1693776176/spotify-astro/song_10_sz0cib.jpg`,
    artists: ["Imagine Dragons"],
    album: "Night Visions",
    duration: "3:07",
  },
];