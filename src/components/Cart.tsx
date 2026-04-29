import data from '../data.json';

interface CartProps {
  cart: { [key: string]: number };
  onRemoveItem: (name: string) => void;
  onConfirm: () => void;
  totalItems: number;
  orderTotal: number;
}

const Cart = ({ cart, onRemoveItem, onConfirm, totalItems, orderTotal }: CartProps) => {
  return (
    <aside className="cart-aside">
      {/* 1. Mantenemos 'cart-title' para el encabezado */}
      <h2 className="cart-title">Your Cart ({totalItems})</h2>

      {totalItems === 0 ? (
        <div className="empty-cart">
          <img src="/assets/images/illustration-empty-cart.svg" alt="" />
          <p>Your added items will appear here</p>
        </div>
      ) : (
        <div className="cart-items-list">
          {Object.entries(cart).map(([name, qty]) => {
            const p = data.find(item => item.name === name);
            return (
              /* 2. Clase 'cart-item' para el contenedor de cada fila */
              <div key={name} className="cart-item">
                <div className="item-details">
                  <p className="item-name">{name}</p>
                  <div className="item-pricing">
                    <span className="item-qty">{qty}x</span>
                    <span className="item-price">@ ${p?.price.toFixed(2)}</span>
                    <span className="item-subtotal">
                      ${((p?.price || 0) * qty).toFixed(2)}
                    </span>
                  </div>
                </div>
                {/* 3. Botón de remover con clase 'remove-item' */}
                <button 
                  className="remove-item" 
                  onClick={() => onRemoveItem(name)}
                >
                  ×
                </button>
              </div>
            );
          })}

          {/* 4. El total usa 'order-total-row' y 'total-price-text' */}
          <div className="order-total-row">
            <span>Order Total</span>
            <span className="total-price-text">${orderTotal.toFixed(2)}</span>
          </div>

          {/* 5. Banner de Carbon Neutral */}
          <div className="carbon-neutral-ad">
            <img src="/assets/images/icon-carbon-neutral.svg" alt="" />
            <p>This is a <strong>carbon-neutral</strong> delivery</p>
          </div>

          {/* 6. Botón de confirmación con 'confirm-button' */}
          <button 
            className="confirm-button" 
            onClick={onConfirm}
          >
            Confirm Order
          </button>
        </div>
      )}
    </aside>
  );
};

export default Cart;