export type Message = string;

export interface Error {
  message: Message;
  code: string;
  [key: string]: any;
}
