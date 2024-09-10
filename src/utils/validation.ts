import * as Yup from "yup";
let emailRegex =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const createDoctorsSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("Please enter the first name")
    .min(2, "First name must be at least 2 characters long")
    .max(50, "First name must be less than 50 characters long")
    .matches(/^[A-Za-z\s]+$/, "First name can only contain letters and spaces"),
  lastName: Yup.string()
    .required("Please enter the last name")
    .min(2, "Last name must be at least 2 characters long")
    .max(50, "Last name must be less than 50 characters long")
    .matches(/^[A-Za-z\s]+$/, "Last name can only contain letters and spaces"),
  password: Yup.string()
    .required("Please enter your password")
    .min(8, "Password must be at least 8 characters long")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/\d/, "Password must contain at least one number")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    ),
  confirmPassword: Yup.string()
    .required("Please confirm your password")
    .oneOf([Yup.ref("password"), ""], "Passwords must match"),
  gender: Yup.string().required("Please select your gender"),
  nationality: Yup.string().required("Please select your nationality"),
  email: Yup.string()
    .required("Please enter your email address")
    .matches(emailRegex, { message: "Please enter a valid email" }),
  age: Yup.string()
    .required("Please select your age")
    .matches(/^\d+$/, "Age must be a valid number")
    .test("is-valid-age", "Age must be between 18 and 120", (value) => {
      const age = Number(value);
      return age >= 18 && age <= 120;
    }),
  phone: Yup.string().required("Please enter the Mobile Number"),
});

export const signinSchema = Yup.object().shape({
  email: Yup.string()
    .required("Please enter your email address")
    .matches(emailRegex, { message: "Please enter a valid email" }),

  password: Yup.string()
    .required("Please enter your password")
    .min(8, "Password must be at least 8 characters long")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/\d/, "Password must contain at least one number")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    ),
});

export const doctorSigninSchema = Yup.object().shape({
  email: Yup.string()
    .required("Please enter your email address")
    .matches(emailRegex, { message: "Please enter a valid email" }),

  password: Yup.string()
    .required("Please enter your password")
    .min(8, "Password must be at least 8 characters long")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/\d/, "Password must contain at least one number")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    ),
});

export const createPatientSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("Please enter the first name")
    .min(2, "First name must be at least 2 characters long")
    .max(50, "First name must be less than 50 characters long")
    .matches(/^[A-Za-z\s]+$/, "First name can only contain letters and spaces"),
  lastName: Yup.string()
    .required("Please enter the last name")
    .min(2, "Last name must be at least 2 characters long")
    .max(50, "Last name must be less than 50 characters long")
    .matches(/^[A-Za-z\s]+$/, "Last name can only contain letters and spaces"),
  password: Yup.string()
    .required("Please enter your password")
    .min(8, "Password must be at least 8 characters long")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/\d/, "Password must contain at least one number")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    ),
  confirmPassword: Yup.string()
    .required("Please confirm your password")
    .oneOf([Yup.ref("password"), ""], "Passwords must match"),
  gender: Yup.string().required("Please select your gender"),
  nationality: Yup.string().required("Please select your nationality"),
  email: Yup.string()
    .required("Please enter your email address")
    .matches(emailRegex, { message: "Please enter a valid email" }),
  age: Yup.string()
    .required("Please select your age")
    .matches(/^\d+$/, "Age must be a valid number")
    .test("is-valid-age", "Age must be between 18 and 120", (value) => {
      const age = Number(value);
      return age >= 18 && age <= 120;
    }),
  phone: Yup.string().required("Please enter the Mobile Number"),
});

export const consultationBookingSchema = Yup.object().shape({
  fullName: Yup.string()
    .required("Please enter the first name")
    .min(2, "First name must be at least 2 characters long")
    .max(50, "First name must be less than 50 characters long")
    .matches(/^[A-Za-z\s]+$/, "First name can only contain letters and spaces"),

  // nationality: Yup.string().required("Please select your nationality"),
  phone: Yup.string().required("Please enter the Mobile Number"),
  timezone: Yup.string().required("Please select your Time Zone"),
  email: Yup.string()
    .required("Please enter your email address")
    .matches(emailRegex, { message: "Please enter a valid email" }),

  additionalNotes: Yup.string()
    .min(2, "additionalNotes must be at least 2 characters long")
    .max(850, "additionalNotesmust be less than 50 characters long"),
  prefferDate: Yup.string().required("Please select the preffered date"),
});
