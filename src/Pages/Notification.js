import { Formik, useFormikContext } from 'formik'
import React, { useRef, useState, useCallback } from 'react'
import { Col, Row } from 'react-bootstrap'
import { notifySchema } from './NotifySchema'
import { useNavigate } from 'react-router-dom'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import TextArea from '../Components/TextArea'
import BasicButton from '../Components/BasicButton'
import TextInput from '../Components/TextInput'
import { useDropzone } from 'react-dropzone'
import { IoCloudUploadOutline } from 'react-icons/io5'
import axios from 'axios' // Import Axios
import { toast } from 'react-toastify'
import EmojiPicker, { EmojiStyle } from 'emoji-picker-react'

const Notification = () => {
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')
  const [image] = useState(null)
  const [linkto, setLinkTo] = useState('')
  const [imagePreview, setImagePreview] = useState(null)
  const acceptedImageTypes = ['image/jpeg', 'image/png', 'image/gif']
  const [isSaving, setIsSaving] = useState(false) // New state for loading
  const [inputValue, setInputValue] = useState('')

  const navigate = useNavigate()
  const handleCancel = () => {
    navigate('/')
  }

  const initialValues = {
    title: '',
    message: '',
    linkto: '',
    image: '',
  }

  const fileInputRef = useRef(null)

  const removeImage = ({ setFieldValue }) => {
    // Remove the selected image
    setImagePreview(null)
    // Clear the file input value
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
    // Clear Formik field
    setFieldValue('image', '')
  }



  function onClick(emojiData, event) {
    setInputValue(
      (inputValue) =>
        inputValue + (emojiData.isCustom ? emojiData.unified : emojiData.emoji),
    )
  }


  const handleAddData = (values) => {
    setIsSaving(true)
    const headers = {
      Authorization: 'YourAuthorizationToken', // Replace with your actual token
      'Content-Type': 'application/json',
    }

    const data = {
      title: title,
      message: message,
      image: imagePreview,
      link: linkto,
      emoji: inputValue
    }

 
    axios
      .post(
        'https://notification-mysql-48f715723b35.herokuapp.com/v1/api/send-push-notification',
        data,
        { headers: headers },
      )
      .then((response) => {
        if (response?.status === 200) {
          toast.success('Notification sent!', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          })
          navigate('/')
        }
      })
      .catch((error) => {
        toast.error('Something Went Wrong', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        })
      })
      .finally(() => {
        setIsSaving(false)
      })
  }

  const MyDropzone = () => {
    const { setFieldValue } = useFormikContext()

    const onDrop = useCallback((acceptedFiles) => {
      const file = acceptedFiles[0]
      const reader = new FileReader()

      reader.onloadend = () => {
        const img = new Image()
        img.src = reader.result

        img.onload = () => {
          const canvas = document.createElement('canvas')
          const ctx = canvas.getContext('2d')

          // Set the canvas dimensions to the desired width and height (50x50)
          canvas.width = 150
          canvas.height = 150

          // Draw the image onto the canvas with the desired dimensions
          ctx.drawImage(img, 0, 0, 150, 150)

          // Get the data URL of the resized image
          const resizedImage = canvas.toDataURL('image/jpeg') // Adjust format if needed

          // Set image preview and update Formik field
          setImagePreview(resizedImage)
          setFieldValue('image', resizedImage)
        }
      }

      reader.readAsDataURL(file)
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
      accept: acceptedImageTypes.join(','),
      multiple: false, // Allow only one file to be dropped
    })

    return (
      <div className="box-custom" {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <div>
            <IoCloudUploadOutline
              size={40}
              style={{ cursor: 'pointer', color: 'blue' }}
            />
            <p className="text-secondary">
              Drag 'n' drop, or click to select files
            </p>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="mr-10 container-fluid">
      <Formik
        initialValues={initialValues}
        validationSchema={notifySchema}
        onSubmit={handleAddData}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          setFieldValue,
        }) => (
          <>
            <Row className="d-flex flex-row justify-content-between align-items-center mt-4">
              <Col className="d-flex mt-4 justify-content-start align-items-center">
                <AiOutlineArrowLeft
                  onClick={handleCancel}
                  size={25}
                  className="mt-1 m-1 pointer"
                />
                <h5 className="fw-bold mt-1">&nbsp;Add Notification</h5>
              </Col>
              <Col className="d-sm-none d-none d-md-none d-lg-flex d-xxl-flex d-xl-flex flex-row justify-content-end align-items-center">
                <BasicButton
                  className="m-1 mb-4"
                  variant="secondary"
                  onClick={handleCancel}
                  label="Cancel"
                />
                <BasicButton
                  className="m-1 mb-4"
                  type="submit"
                  label={isSaving ? 'Sending...' : 'Send'}
                  onClick={
                    title === '' ||
                    message === '' ||
                    linkto === '' ||
                    image === '' ||
                    (touched.title && errors.title) ||
                    (touched.message && errors.message) ||
                    (touched.linkto && errors.linkto) ||
                    (touched.image && errors.image)
                      ? handleSubmit
                      : () => handleAddData({ values, setFieldValue })
                  }
                />
              </Col>
            </Row>

            <Row className="d-flex flex-wrap flex-lg-row flex-xxl-row flex-xl-row flex-column flex-md-column flex-sm-column mx-2 my-2 ">
              <Col className="m-0 p-4 d-flex flex-wrap flex-column align-items-start justify-content-start shadow rounded bg-white">
                <Col className="col-12 mt-1 " lg="5" xl="5" md="12" sm="12">
                  <Col className="mt-2" />
                  <TextInput
                    name="title"
                    label="Title"
                    onChange={(e) => {
                      setTitle(e.target.value)
                      handleChange(e)
                    }}
                    onBlur={handleBlur}
                    placeholder="Enter title here.. "
                    className={`input ${
                      touched.title && errors.title ? 'is-invalid' : ''
                    }`}
                    validation={
                      touched.title && errors.title ? (
                        <p className="text-danger">{errors.title}</p>
                      ) : (
                        ''
                      )
                    }
                  />
                  <Col className="mt-2" />
                  <TextArea
                    name="message"
                    label="Message"
                    onChange={(e) => {
                      setMessage(e.target.value)
                      handleChange(e)
                    }}
                    onBlur={handleBlur}
                    placeholder="Enter message here.. "
                    className={`  input ${
                      touched.message && errors.message ? 'is-invalid' : ''
                    }`}
                    validation={
                      touched.message && errors.message ? (
                        <p className="text-danger">{errors.message}</p>
                      ) : (
                        ''
                      )
                    }
                  />

                  <Col className="mt-2">
                  <div>
      <div>
       
         <TextInput
         star={"none"}
                   className="text-input"
                   type="text"
                   value={inputValue}
                   onChange={(e) => setInputValue(e.target.value)}
                   placeholder="Select Emojis..."
                   label="Emoji"
                  />

      </div>
      <EmojiPicker
        onEmojiClick={onClick}
        autoFocusSearch={false}
        emojiStyle={EmojiStyle.NATIVE}
      />
    </div>
                  </Col>

                  <Col className="mt-2" />
                  <TextInput
                    name="linkto"
                    label="Link "
                    onChange={(e) => {
                      setLinkTo(e.target.value)
                      handleChange(e)
                    }}
                    onBlur={handleBlur}
                    placeholder="Enter link here.. "
                    className={` input ${
                      touched.linkto && errors.linkto ? 'is-invalid' : ''
                    }`}
                    validation={
                      touched.linkto && errors.linkto ? (
                        <p className="text-danger">{errors.linkto}</p>
                      ) : (
                        ''
                      )
                    }
                  />
                  <p className="mt-2">
                    Image Upload
                    <span className={`text-danger`}>*</span>
                  </p>
                  <p className=" text-center ">Image Size: 150x150 pixels </p>
                  <Col>
                    <MyDropzone />
                  </Col>
                  <p className="text-primary text-center m-2">
                    {' '}
                    Only .jpeg / .png / .jpg files are accepted
                  </p>
                  <p>
                    {touched.image && errors.image && (
                      <p className="text-danger">{errors.image}</p>
                    )}
                  </p>
                  <Col>
                    {imagePreview && (
                      <>
                        <img
                          src={imagePreview}
                          alt="Img Preview"
                          style={{ maxWidth: '100%', marginTop: '10px' }}
                        />
                        <p
                          className="text-success mt-2 pointer"
                          onClick={() => removeImage({ setFieldValue })}
                        >
                          Remove Image
                        </p>
                      </>
                    )}
                  </Col>
                </Col>
              </Col>
            </Row>

            <Row className="d-sm-flex d-flex d-md-flex d-lg-none d-xxl-none d-xl-none flex-row justify-content-between align-items-center">
              <Col className="d-flex justify-content-start align-items-center">
                <BasicButton
                  className="m-1"
                  variant="secondary"
                  onClick={handleCancel}
                  label="Cancel"
                />
              </Col>
              <Col className="d-flex justify-content-end align-items-center">
                <BasicButton
                  className="m-1"
                  type="submit"
                  label={isSaving ? 'Sending...' : 'Send'}
                  onClick={
                    title === '' ||
                    message === '' ||
                    linkto === '' ||
                    image === '' ||
                    (touched.title && errors.title) ||
                    (touched.message && errors.message) ||
                    (touched.linkto && errors.linkto) ||
                    (touched.image && errors.image)
                      ? handleSubmit
                      : () => handleAddData({ values, setFieldValue })
                  }
                />
              </Col>
            </Row>
          </>
        )}
      </Formik>
    </div>
  )
}

export default Notification
