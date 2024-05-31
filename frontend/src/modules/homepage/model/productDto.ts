export interface ProductDTO {
  id: number;
  image_url?: string;
  version: number;
  created_by: string | null;
  creation_date: Date;
  modified_by: string | null;
  last_modification_date: Date;
  status: string;
  title: string;
  summary: string;
  suggestedPrice: number;
  owner: string;
  category: string;
}
