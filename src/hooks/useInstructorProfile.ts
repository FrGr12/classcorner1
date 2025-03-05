
/**
 * Main hook for fetching and managing instructor profile data
 * This is a facade that uses either mock data or real data based on the environment
 */

import { InstructorProfileResult } from './instructor/types';
import { useMockInstructorData } from './instructor/useMockInstructorData';
import { useInstructorData } from './instructor/useInstructorData';

/**
 * Hook to fetch instructor profile data
 * In development mode with specific IDs, it returns mock data
 * Otherwise, it fetches real data from Supabase
 */
export const useInstructorProfile = (id: string | undefined): InstructorProfileResult => {
  // For demo/preview purposes, we'll use the dummy data for specific IDs
  if (import.meta.env.DEV && id && (id === "1" || id === "2" || id === "3")) {
    return useMockInstructorData(id);
  }
  
  // For all other cases, use real data
  return useInstructorData(id);
};
