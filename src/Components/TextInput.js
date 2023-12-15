import React from 'react'
import { Form } from 'react-bootstrap'
import { useTranslation } from 'react-i18next';

const TextInput = (props) => {
  const { t } = useTranslation();

  const {
    label,
    name,
    id,
    type,
    placeholder,
    htmlFor,
    lableClassName,
    value,
    onChange,
    onBlur,
    disabled,
    className,
    lg,
    md,
    xxl,
    xl,
    sm,
    validation,
    star,
  } = props
  return (
    <Form.Group>
      <Form.Label htmlFor={htmlFor} className={lableClassName}>
        {t(`${label}` )}
        <span className={`text-danger ${star === 'none' ? `d-${star}` : ''}`}>
          *
        </span>
      </Form.Label>
      <Form.Control
        name={name}
        id={id}
        type={type}
        placeholder={t(`${placeholder}` )}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        className={className}
        lg={lg}
        md={md}
        xxl={xxl}
        xl={xl}
        sm={sm}
      />
       {validation}
    </Form.Group>
  )
}
export default TextInput
