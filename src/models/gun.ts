import { Photo } from "./photo";

export interface Gun {
  id: string;
  name: string;
  details: string;
  serial: string;
  notes?: string;
  primaryPhoto?: Photo;
  photos?: Photo[];
  createdOn: string;
  modifiedOn: string;
}