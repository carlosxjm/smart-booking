import { Button } from "../../../shared/components/Button/Button";
import { Modal } from "../../../shared/components/Modal/Modal";
import "./BookiingRemoveConfirmModal.css";

export const BookiingRemoveConfirmModal = ({ booking, onConfirm, onClose }) => {
  const handlConFirmClick = () => {
    onConfirm();
    onClose();
  };

  return (
    <Modal isOpen={!!booking} onClose={onClose}>
      <div className="booking-remove-modal-root">
        <h2>Are you sure you want to delete this booking?</h2>
        <div className="actions">
          <Button variant="danger" onClick={handlConFirmClick}>
            Yes, delete it!
          </Button>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
};
