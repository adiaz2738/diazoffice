export type VideoEntry = {
  youtubeId: string;
  title: string;
  description: string;
  category: "history" | "buyers-guide" | "market";
};

// Pull the youtubeId from the video URL: youtube.com/watch?v=THIS_PART
// Update this list whenever you post something new. No rebuild logic needed,
// it's just data — Vercel redeploys on push.
export const videos: VideoEntry[] = [
  {
    youtubeId: "REPLACE_WITH_VIDEO_ID", // grab this from the watch?v= param on your channel
    title: "The Origins of Carmel-by-the-Sea's Fairy-Tale Cottages",
    description:
      "Where the storybook look actually came from, and why it's protected by code today.",
    category: "history",
  },
  {
    youtubeId: "eMgMEWLS_yk",
    title: "How the Arts Built Carmel-by-the-Sea",
    description: "The arts colony roots that shaped the town before real estate did.",
    category: "history",
  },
];
