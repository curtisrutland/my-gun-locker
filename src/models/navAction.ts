export interface NavAction {
  text: string;
  action: string[] | (() => void);
}