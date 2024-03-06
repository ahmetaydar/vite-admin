export interface ButtonProps {
  label: any;
  onClick?: () => void;
  props?: any;
  size?: "small" | "large";
  icon?: string;
  iconPosition?: "left" | "right";
  isIconOnly: boolean;
  isDisabled?: boolean;
  color: any;
}

export interface EyeClosedProps {
  onClick?: () => void;
  props?: any;
}

export interface PopUpProps {
  onClick?: () => void;
  props?: any;
  popUpMessage: string;
  popUpSubMessage?: string;
  warningIcon?: any;
  leftButtonLabel?: string;
  rightButtonLabel?: string;
  leftButtonColor?: "white" | "purple" | "blue" | "green" | "red" | "yellow";
  rightButtonColor?: "white" | "purple" | "blue" | "green" | "red" | "yellow";
  buttonSize?: "small" | "large";
  exitIconClick?: () => void;
  leftButtonClick?: () => void;
  rightButtonClick?: () => void;
}

export interface SearchProps {
  placeholder?: string;
  onChange?: (value: string) => void;
  props?: any;
  type?: "text" | "password";
  isDisabled?: boolean;
  value?: string;
  label: string;
  isIconExist?: boolean;
}

export type Brand = {
  id?: number;
  name: string;
  slug?: string;
  description: string;
  categories?: [];
};

export type Category = {
  id?: number;
  name?: string;
  slug?: string;
  description?: string;
  subCategories?: [] | null | undefined;
  parentId?: number | null | undefined;
};
