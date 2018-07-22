export interface Gun {
  id: string;
  name: string;
  details: string;
  serial: string;
  notes?: string;
  primaryPhotoUrl?: string;
  photos?: string[];
}