// types/react-day-picker.d.ts
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { CustomComponents } from "react-day-picker";

declare module "react-day-picker" {
  interface CustomComponents {
    IconLeft: (props: { [key: string]: unknown }) => JSX.Element;
    IconRight: (props: { [key: string]: unknown }) => JSX.Element;
  }
}