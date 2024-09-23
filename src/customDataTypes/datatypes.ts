/* eslint-disable @typescript-eslint/no-wrapper-object-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
export type ButtonProps = {
  name?: string | any;
  className?: any;
  variant?: "text" | "outlined" | "contained";
  icon?: React.ReactNode;
  endIcon?: React.ReactNode;
  loading?: boolean;
  textcolor?: string;
  buttonWidth?: any;
  onClick?: (params?: any) => void;
  hoverBackgroundColor?: string;
  hoverTextColor?: string;
  type?: any;
  fullWidth?: boolean;
  borderRadius?: string;
};

interface SelectChangeEvent {
  target: {
    value: any;
  };
}
export type customSelectProps = {
  error?: boolean;
  errorCondition?: boolean;
  onSubmit?: () => void;
  control?: any;
  name?: any;
  form?: any;
  selectData?: any;
  placeHolder?: string;
  sx?: any;
  className?: string;
  selectFieldCss?: any;
  onChange?: (event: SelectChangeEvent, child?: React.ReactElement) => void;
  fullWidth?: boolean;
};
export interface Address {
  city: string;
  state: string;
}

export interface Hobby {
  name: string;
}

export interface FormData {
  name: string;
  price: number;
  quantity: number;
  // age: number;
  // gender: string;
  // address: Address;
  // hobbies: Hobby[];
  // startDate: Date;
  // subscribe: boolean;
  // referral: string;
}

export type DoctorPopoverProps = {
  open: boolean;
  anchorEl: HTMLButtonElement | null;
  handleClose: () => void;
};

export type PatientPopoverProps = {
  open: boolean;
  anchorEl: HTMLButtonElement | null;
  handleClose: () => void;
};

export type CheckBoxprops = {
  checked?: any;
  handleChange: any;
};
export type Fileupload = {
  classes?: string;
  form?: any;
  name?: any;
  control?: any;
  helperText?: string;
  errstyle?: any;
  error?: Boolean;
};

export type CardComponentProps = {
  directoryUsersData: Array<{
    id?: string;
    status?: string;
    displayName?: string;
    jobTitleName?: string;
    departmentName?: string;
    joiningDate?: string;
    phone?: string;
    email?: string;
  }>;
};

export type patientProfileTypes = {
  firstName?: string;
  lastName?: string;
  email?: string;
  age?: string;
  phone?: string;
  gender?: string;
  nationality?: string;
};

export type bankingDetailsTypes = {
  _id?: string;
  accountName?: string;
  bankName?: string;
  bankAddress?: string;
  bankAccountNumber?: string;
  branchCodeIFSC?: string;
  bankAccountNumberIBAN?: string;
  fullName?: string;
  speciality?: string;
  description?: string;
  experience?: string;
  consultationCharges?: string;
};
