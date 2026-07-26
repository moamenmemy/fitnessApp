export interface CustomListItem {
  id: string | number;
  title: string;
  subTitle?: string;
  description: string;
  imageUrl: string;
  videoUrl?: string;
  hasVideo?: boolean;
}