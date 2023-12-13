import React from 'react'
import { Button } from 'react-bootstrap'
const BasicButton = (props) => {
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
        {icon} {label}
      </Button>
    </div>
  )
}
export default BasicButton
