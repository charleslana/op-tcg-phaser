export interface CheckboxInterface {
  positionX: number;
  positionY: number;
  text: string;
  onChange?: (value: boolean) => void;
  readOnly?: boolean;
  checked?: boolean;
  eventEmit?: string;
  valueEmit?: unknown;
  fontSize?: number;
}
