import '../css/ConfirmationModal.css';

export default function ConfirmationModal({
  title = "Confirm Action",
  message = "Are you sure you want to continue?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel
}) {

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{title}</h2>
        <p>{message}</p>
        <div className="modal-buttons">
          <button onClick={onCancel} className="cancel-btn">{cancelText}</button>
          <button onClick={onConfirm} className="confirm-btn">{confirmText}</button>
        </div>
      </div>
    </div>
  );
}