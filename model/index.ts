export interface ProductDetail {
  _id: string;
  productName: string;
  description: string;
  image: string;
  category: string;
  platformType: string;
  baseType: string;
  productUrl: string;
  downloadUrl: string;
  requirementSpecification: any[];
  highlights: string[];
  stripeProductId: string;
  avgRating: number;
  feedbackDetails: any[];
  skuDetails: any[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  imageDetails: ImageDetails;
}

export interface ImageDetails {
  asset_id: string;
  public_id: string;
  version: number;
  version_id: string;
  signature: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: string;
  tags: any[];
  pages: number;
  bytes: number;
  type: string;
  etag: string;
  placeholder: boolean;
  url: string;
  secure_url: string;
  folder: string;
  original_filename: string;
  api_key: string;
}

export interface feedbackDetails {}
