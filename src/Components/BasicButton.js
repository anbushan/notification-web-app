import React from 'react'
import { Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next';

const BasicButton = (props) => {
  const { t } = useTranslation();

  const { variant, onClick, label, size, color, icon, className } = props
  const buttonStyle = {
    backgroundColor: color,
    borderColor: color,
  }
  return (
    <div className="mt-4">
      <Button
        style={buttonStyle}
        variant={variant}
        className={className}
        size={size}
        onClick={onClick}
      >
        {icon} {t(`${label}` )}
      </Button>
    </div>
  )
}
export default BasicButton
