import { CardAction } from "./cardAction";

export interface Photo {
  path: string;
  url: string;
}

export class PhotoWrapper implements Photo {
  constructor(
    public photo: Photo,
    public primary: boolean = false,
    public actions: CardAction[] = []
  ) { }

  get path() { return this.photo.path; }
  get url() { return this.photo.url; }
}