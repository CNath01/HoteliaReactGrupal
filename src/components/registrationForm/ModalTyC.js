import React from "react";
import { Overlay, ContainerModal, HeaderModal, ButtonClose, BodyModal } from "../../assets/elements/ModalTyC";

const ModalTyC = ({ children, status, changeStatus, positionModal }) => {
    return (
        <>
            {status &&
                <Overlay positionModal={positionModal}>
                    <ContainerModal>
                        <HeaderModal>
                            <h3>TERMINOS Y CONDICIONES</h3>
                        </HeaderModal>
                        <ButtonClose onClick={()=> changeStatus(false)}><i class="fa-solid fa-circle-xmark"></i></ButtonClose>
                        <BodyModal>
                            {children}
                        </BodyModal>
                    </ContainerModal>
                </Overlay>
            }
        </>
    );
}

export default ModalTyC; 