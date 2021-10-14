import React from 'react';

interface Interface {
    isOpen: boolean
    onClose: () => void
}

const ModalWindow:React.FC<Interface> = ({isOpen, onClose, children}) => {
    return (
        <div className={isOpen ? 'modal active' : 'modal'} onClick={() => onClose()}>
            <div className={isOpen ? 'modal__content active' : 'modal__content'} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
}


export default ModalWindow;