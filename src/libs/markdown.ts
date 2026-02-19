// This file now re-exports all content fetching functions from the Sanity client.
// The original filesystem-based implementation has been replaced.
// All functions return the same types (BlogPost, EventPost) to maintain backward compatibility.

export {
  getAllBlogs,
  getBlogBySlug,
  getAllEvents,
  getEventBySlug,
  getAllWebinars,
  getWebinarBySlug,
  getAllDinnerEvents,
  getDinnerEventBySlug,
} from './sanity';
