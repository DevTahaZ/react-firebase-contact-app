import React from 'react'
import { createPortal } from 'react-dom'

const Model = ({onClose, isOpen, children}) => {
  return createPortal(
    <>
    {isOpen && (
        <div className='blur-bg'>
            <div className='card'>
                <div className='close-btn'>
                    <img onClick={onClose} src="cross.svg" alt="" />
                </div>
                {children}
            </div>
        </div>
    )}
    </>
  , document.getElementById("model-root"))
}

export default Model