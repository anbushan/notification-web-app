import { Formik } from "formik";
import React, { useState } from "react";
import { SettingSchema } from "./SettingSchema";
import { Col, Row } from "react-bootstrap";
import BasicButton from "../Components/BasicButton";
import TextInput from "../Components/TextInput";
import LanguageDropdown from "../Components/Language";
import { useTranslation } from 'react-i18next';


const Settings = () => {
    const [contact, setContact] = useState('')
    const [sharelink, setShareLink] = useState('')
    const [isEditing, setIsEditing] = useState(false) 
    const { t } = useTranslation();



    const initialValues = {
        contact: '',
        sharelink: '',
      }
      
const handleAddData = () =>{
console.log("hello")
}

  return (
    <div className="container-fluid">

         <Col className="d-flex m-2 align-items-end justify-content-end ">
              <LanguageDropdown />
            </Col>
      <Formik
        initialValues={initialValues}
        validationSchema={SettingSchema}
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
            <Row className="d-flex flex-row justify-content-between align-items-center mt-3">
              <Col className="d-flex justify-content-start align-items-center">
                <h5 className="fw-bold m-3">&nbsp;{t("Add Contact & Share Link" )} </h5>
              </Col>
              <Col className="d-sm-none d-none d-md-none d-lg-flex d-xxl-flex d-xl-flex flex-row justify-content-end align-items-center">
                <BasicButton
                  className="m-1 mb-4"
                  type="submit"
                  label= {isEditing ? 'update' : 'Create'}
                  onClick={
                    contact === '' ||
                      sharelink === '' ||
                      (touched.contact && errors.contact) ||
                      (touched.sharelink && errors.sharelink) 
                      ? handleSubmit
                      : () => handleAddData({ values, setFieldValue })
                  }
                />
              </Col>
            </Row>

            <Row className="d-flex flex-wrap flex-lg-row flex-xxl-row flex-xl-row flex-column flex-md-column flex-sm-column mx-2 my-2 ">
              <Col className="m-0 p-4 d-flex flex-wrap flex-column align-items-start justify-content-start shadow rounded bg-white">
                <Col className="col-12 mt-1 " lg="5" xl="5" md="12" sm="12">
                  <Col className="mt-4" />
                  <TextInput
                    name="contact"
                    label="Contact"
                    onChange={(e) => {
                      setContact(e.target.value)
                      handleChange(e)
                    }}
                    onBlur={handleBlur}
                    placeholder="Enter contact here.."
                    className={`input ${touched.contact && errors.contact ? 'is-invalid' : ''
                      }`}
                    validation={
                      touched.contact && errors.contact ? (
                        <p className="text-danger">{t(`${errors.contact}` )}</p>
                      ) : (
                        ''
                      )
                    }
                  />
                 
                  <Col className="mt-4" />
                  <TextInput
                    name="sharelink"
                    label="Share Link"
                    onChange={(e) => {
                      setShareLink(e.target.value)
                      handleChange(e)
                    }}
                    onBlur={handleBlur}
                    placeholder="Enter Share link here.."
                    className={` input ${touched.sharelink && errors.sharelink ? 'is-invalid' : ''
                      }`}
                    validation={
                      touched.sharelink && errors.sharelink ? (
                        <p className="text-danger">{t(`${errors.sharelink}` )}</p>) : ('')}
                  />
                </Col>
              </Col>
            </Row>

            <Row className="d-sm-flex d-flex d-md-flex d-lg-none d-xxl-none d-xl-none flex-row justify-content-between align-items-center">
              <Col className="d-flex justify-content-end align-items-center">
                <BasicButton
                  className="m-1"
                  type="submit"
                  label={isEditing ? 'update' : 'Create'}
                  onClick={
                    contact === '' ||
                    sharelink === '' ||
                      (touched.contact && errors.contact) ||
                      (touched.sharelink && errors.sharelink) 
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
};

export default Settings;
