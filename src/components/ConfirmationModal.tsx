import data from '../data.json';

interface ConfirmationModalProps {
  cart: { [key: string]: number };
  onReset: () => void;
}

const ConfirmationModal = ({ cart, onReset }: ConfirmationModalProps) => {
  const orderTotal = Object.entries(cart).reduce((total, [name, qty]) => {
    const p = data.find(prod => prod.name === name);
    return total + (p?.price || 0) * qty;
  }, 0);

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <img src="/assets/images/icon-order-confirmed.svg" alt="Order Confirmed" />
        <h2 className="modal-title">Order Confirmed</h2>
        <p className="modal-subtitle">We hope you enjoy your food!</p>

        <div className="order-summary-container">
          {Object.entries(cart).map(([name, qty]) => {
            const product = data.find(p => p.name === name);
            return (
              <div key={name} className="summary-item">
                <div className="summary-left">
                  <img src={product?.image.thumbnail} alt="" className="thumb" />
                  <div>
                    <p className="summary-name">{name}</p>
                    <div className="summary-pricing">
                      <span className="item-qty">{qty}x</span>
                      <span className="item-price">@ ${product?.price.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                <p className="summary-subtotal">${((product?.price || 0) * qty).toFixed(2)}</p>
              </div>
            );
          })}
          
          <div className="summary-total-row">
            <span>Order Total</span>
            <span className="summary-total-price">${orderTotal.toFixed(2)}</span>
          </div>
        </div>

        <button 
          type="button" 
          className="confirm-button" 
          onClick={onReset}
        >
          Start New Order
        </button>
      </div>
    </div>
  );
};

export default ConfirmationModal;