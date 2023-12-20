import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { SettingSchema } from "./SettingSchema";
import { Col, Row } from "react-bootstrap";
import TextInput from "../Components/TextInput";
import LanguageDropdown from "../Components/Language";
import { useTranslation } from "react-i18next";
import axios from "axios";

const Settings = () => {
  const [contact, setContact] = useState("");
  const [shareLinkAd, setSharelinkAd] = useState("");
  const [shareLinkIos, setSharelinkIos] = useState("");
  const [rateUsAd, setRateUsAd] = useState("");
  const [rateUsIos, setRateUsIos] = useState("");
  const { t } = useTranslation();

  const initialValues = {
    contact: "",
    rateUsAd: "",
    sharelinkAd: "",
    sharelinkIos: "",
    rateUsIos: "",
  };

  useEffect(() => {
    axios
      .get(
        `https://notification-mysql-48f715723b35.herokuapp.com/v1/api/settings/get-contact`
      )
      .then((response) => {
        setContact(response?.data?.data.contact);
        setSharelinkAd(response?.data?.data.share.android);
        setSharelinkIos(response?.data?.data.share.ios);
        setRateUsAd(response?.data?.data.rating.android);
        setRateUsIos(response?.data?.data.rating.ios);
        console.log(response);
      })
      .catch((error) => {
        console.log("AxiosError:", error);
      });
  }, []);

  return (
    <div className="container-fluid">
      <Col className="d-flex m-2 align-items-end justify-content-end ">
        <LanguageDropdown />
      </Col>
      <Formik initialValues={initialValues} validationSchema={SettingSchema}>
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
            <Row className="d-flex flex-row justify-content-between align-items-center mt-5">
              <Col className="d-flex justify-content-start align-items-center ">
                <h5 className="fw-bold m-2">
                  &nbsp;{t("Add Contact & Share Link")}{" "}
                </h5>
              </Col>
            </Row>

            <Row className="d-flex flex-wrap mt-3 flex-lg-row flex-xxl-row flex-xl-row flex-column flex-md-column flex-sm-column mx-2 my-2 ">
              <Col className="m-1 p-4 w-100 h-100d-flex flex-wrap flex-column align-items-start justify-content-start shadow rounded bg-white">
                <Col className="mt-2" />
                <TextInput
                  value={contact}
                  label="Contact"
                  onChange={(e) => {
                    setContact(e.target.value);
                    handleChange(e);
                  }}
                  onBlur={handleBlur}
                  placeholder="Enter contact here.."
                  className={`input ${
                    touched.contact && errors.contact ? "is-invalid" : ""
                  }`}
                  validation={
                    touched.contact && errors.contact ? (
                      <p className="text-danger">{t(`${errors.contact}`)}</p>
                    ) : (
                      ""
                    )
                  }
                  disabled={true}
                />
                <Col className="mt-4 " />
                <h6>{t("Share Link")}:</h6>
                <Col className="mt-3 m-2">
                  <TextInput
                    disabled={true}
                    value={shareLinkAd}
                    label="For Android"
                    onChange={(e) => {
                      setSharelinkAd(e.target.value);
                      handleChange(e);
                    }}
                    onBlur={handleBlur}
                    placeholder="Enter Android Share link here.."
                    className={`input ${
                      touched.sharelinkAd && errors.sharelinkAd
                        ? "is-invalid"
                        : ""
                    }`}
                    validation={
                      touched.sharelinkAd && errors.sharelinkAd ? (
                        <p className="text-danger">
                          {t(`${errors.sharelinkAd}`)}
                        </p>
                      ) : (
                        ""
                      )
                    }
                  />
                </Col>
                <Col className="mt-3 m-2">
                  <TextInput
                    disabled={true}
                    value={shareLinkIos}
                    label="For IOS"
                    onChange={(e) => {
                      setSharelinkIos(e.target.value);
                      handleChange(e);
                    }}
                    onBlur={handleBlur}
                    placeholder="Enter IOS Share link here.."
                    className={` input ${
                      touched.sharelinkIos && errors.sharelinkIos
                        ? "is-invalid"
                        : ""
                    }`}
                    validation={
                      touched.sharelinkIos && errors.sharelinkIos ? (
                        <p className="text-danger">
                          {t(`${errors.sharelinkIos}`)}
                        </p>
                      ) : (
                        ""
                      )
                    }
                  />
                </Col>
              </Col>

              <Col className="m-1 p-4 d-flex w-100 h-100 flex-wrap flex-column shadow rounded bg-white">
                <Col className="mt-3" />
                <h6> {t("Rating Link")}:</h6>
                <Col className="mt-3 m-2">
                  <TextInput
                    value={rateUsAd}
                    label="For Android"
                    disabled={true}
                    onChange={(e) => {
                      setRateUsAd(e.target.value);
                      handleChange(e);
                    }}
                    onBlur={handleBlur}
                    placeholder="Enter Android Rating link here.."
                    className={` input ${
                      touched.rateUsAd && errors.rateUsAd ? "is-invalid" : ""
                    }`}
                    validation={
                      touched.rateUsAd && errors.rateUsAd ? (
                        <p className="text-danger">{t(`${errors.rateUsAd}`)}</p>
                      ) : (
                        ""
                      )
                    }
                  />
                </Col>
                <Col className="mt-3 mb-5 m-2">
                  <TextInput
                    disabled={true}
                    value={rateUsIos}
                    label="For IOS"
                    onChange={(e) => {
                      setRateUsIos(e.target.value);
                      handleChange(e);
                    }}
                    onBlur={handleBlur}
                    placeholder="Enter Android Rating link here.."
                    className={` input ${
                      touched.rateUsIos && errors.rateUsIos ? "is-invalid" : ""
                    }`}
                    validation={
                      touched.rateUsIos && errors.rateUsIos ? (
                        <p className="text-danger">
                          {t(`${errors.rateUsIos}`)}
                        </p>
                      ) : (
                        ""
                      )
                    }
                  />
                </Col>
              </Col>
            </Row>
          </>
        )}
      </Formik>
    </div>
  );
};

export default Settings;
