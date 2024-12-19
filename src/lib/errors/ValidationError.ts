export type Message = string;
export type ValidationError = string;

export interface Error {
  message: Message;
  code: string;
  [key: string]: any;
}
