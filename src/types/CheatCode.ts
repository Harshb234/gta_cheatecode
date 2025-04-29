export interface CheatCode {
  id: number;
  title: string;
  description: string;
  effect: string;
  category: string;
  platforms: {
    pc?: string;
    ps?: string;
    xbox?: string;
  };
  tags: string[];
}