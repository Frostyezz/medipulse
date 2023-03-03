export interface CloudinaryResponseType {
  asset_id: string;
  public_id: string;
  version: number;
  version_id: string;
  signature: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: Date;
  tags: any[];
  pages: number;
  bytes: number;
  type: string;
  etag: string;
  placeholder: boolean;
  url: string;
  secure_url: string;
  access_mode: string;
  original_filename: string;
  eager: Eager[];
  media_metadata: MediaMetadata;
}

interface Eager {
  transformation: string;
  width: number;
  height: number;
  url: string;
  secure_url: string;
}

interface MediaMetadata {
  PerspectiveHorizontal: string;
  RedHue: string;
  Exposure: string;
  ExposureTime: string;
}
