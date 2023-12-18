import * as yup from 'yup'
const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/

export const SettingSchema = yup.object().shape({
    contact: yup.mixed().required('Contact must be required'),
    sharelink: yup
    .string()
    .matches(urlRegex, 'URL is not valid')
    .required('Must be Share your Link'),
})
