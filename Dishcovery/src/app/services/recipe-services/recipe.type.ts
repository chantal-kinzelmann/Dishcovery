export type Recipe = {
    id: string;
    title: string;
    description: string;
    category: string;
    rating: number;
    reviews: {
      rating: number;
      comment: string;
      date: string;
      reviewerName: string;
      reviewerEmail: string;
    }[];
    images: string[];
    thumbnail: string;
  };