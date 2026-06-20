export interface CarouselItem {
  title: string;
  subText: string;
  imageSrc: string;
  [key: string]: any;
}



export interface CarouselResponsiveOption {
  breakpoint: string;
  numVisible: number;
  numScroll: number;
}