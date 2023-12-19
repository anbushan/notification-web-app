import * as yup from 'yup'
const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/

export const SettingSchema = yup.object().shape({
    contact: yup.mixed().required('Contact must be required'),
    sharelinkAd: yup
    .string()
    .matches(urlRegex, 'URL is not valid')
    .required('Must be Share your Android Link'),
    sharelinkIos: yup
    .string()
    .matches(urlRegex, 'URL is not valid')
    .required('Must be Share your IOS Link'),
    rateUsAd: yup
    .string()
    .matches(urlRegex, 'URL is not valid')
    .required('Please enter your Android Rate Link'),
    rateUsIos: yup
    .string()
    .matches(urlRegex, 'URL is not valid')
    .required('Please enter your IOS Rate Link'),
})
