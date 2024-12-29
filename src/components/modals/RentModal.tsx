"use client"
import useRentModal from "@/hooks/useRentModal";
import Modal from "./Modal";

const RentModal = () => {
    const rentModal = useRentModal();

    return ( 
        <Modal
            title="Rent Your home"
            isOpen={rentModal.isOpen}
            onClose={rentModal.onClose}
            onSubmit={rentModal.onClose}
        />
     );
}
 
export default RentModal;