import { CheatCode } from '../types/CheatCode';

const API_URL = 'http://localhost:3001';

export const fetchCheatCodes = async (): Promise<CheatCode[]> => {
  try {
    const response = await fetch(`${API_URL}/cheatcodes`);
    if (!response.ok) {
      throw new Error('Failed to fetch cheat codes');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching cheat codes:', error);
    return [];
  }
};

export const fetchCheatCodeById = async (id: number): Promise<CheatCode | null> => {
  try {
    const response = await fetch(`${API_URL}/cheatcodes/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch cheat code with id ${id}`);
    }
    return response.json();
  } catch (error) {
    console.error(`Error fetching cheat code with id ${id}:`, error);
    return null;
  }
};

export const fetchCheatCodesByCategory = async (category: string): Promise<CheatCode[]> => {
  try {
    const response = await fetch(`${API_URL}/cheatcodes?category=${category}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch cheat codes in category ${category}`);
    }
    return response.json();
  } catch (error) {
    console.error(`Error fetching cheat codes in category ${category}:`, error);
    return [];
  }
};

export const searchCheatCodes = async (query: string): Promise<CheatCode[]> => {
  try {
    // Search in title, description, and tags
    const response = await fetch(
      `${API_URL}/cheatcodes?q=${query}`
    );
    if (!response.ok) {
      throw new Error(`Failed to search cheat codes with query ${query}`);
    }
    return response.json();
  } catch (error) {
    console.error(`Error searching cheat codes with query ${query}:`, error);
    return [];
  }
};