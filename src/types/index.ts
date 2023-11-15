export interface Content {
  title: string;
  image: string;
  description: string;
}

export interface Rows {
  id: string;
  contents: Content[];
  duration: number;
}