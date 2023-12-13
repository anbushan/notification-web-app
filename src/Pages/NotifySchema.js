import * as yup from "yup";
const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;

export const notifySchema = yup.object().shape({
  title: yup.mixed().required("Title must be required."),
  message: yup.mixed().required("Please enter Message."),
  linkto: yup
    .string()
    .matches(urlRegex, "URL is not valid")
    .required("Must be required your Link."),
  image: yup.string().required("Please provide an Image."),
});
