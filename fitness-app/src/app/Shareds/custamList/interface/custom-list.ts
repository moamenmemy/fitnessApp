export interface CustomListItem {
  id: string | number;
  title: string;
  subTitle?: string;
  description: string;
  imageUrl: string;
  hasVideo?: boolean; 
}