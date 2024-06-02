export interface ProductDTO {
  id: number;
  imageUrl?: string;
  version: number;
  createdBy: string | null;
  creationDate: Date;
  modifiedBy: string | null;
  lastModificationDate: Date;
  status: string;
  title: string;
  summary: string;
  suggestedPrice: number;
  owner: string;
  category: string;
}
