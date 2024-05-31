export interface ProductDTO {
        id: number;
        version: number;
        created_by: string | null;
        creation_date: Date; // or Date if you want to parse it into a Date object
        modified_by: string | null;
        last_modification_date: Date; // or Date if you want to parse it into a Date object
        owner_id: string;
        title: string;
        summary: string;
        suggested_price: number;
        status: string;
      }
      