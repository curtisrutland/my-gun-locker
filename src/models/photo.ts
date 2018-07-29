import { CardAction } from "./cardAction";

export interface Photo {
  path: string;
  url: string;
  id: string;
  created: number;
}

export class PhotoWrapper implements Photo {
  constructor(
    public photo: Photo,
    public primary: boolean = false,
    public actions: CardAction[] = []
  ) {
    if (photo) {
      this._date = new Date(photo.created);
    }
  }

  get path() { return this.photo.path; }
  get url() { return this.photo.url; }
  get id() { return this.id; }
  get created() { return this.created; }
  get title() {
    return this.primary ? "Primary" : `${this.date.toLocaleDateString()} ${this.date.toLocaleTimeString()}`;
  }

  private _date: Date;
  get date() {
    return this._date;
  }
}

export function sortPhotosDesc(a: Photo, b: Photo) {
  return b.created - a.created;
}