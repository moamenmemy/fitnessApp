export interface ChatSession {
  title: string;
  messages: {
    role: string;
    text: string;
  }[];
}