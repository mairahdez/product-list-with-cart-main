import { useState, useEffect } from 'react';
import data from './data.json';
import './App.css';

function App() {
  const [cart, setCart] = useState<{ [key: string]: number }>({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Nota: El estilo 'overflow: hidden' se maneja aquí para el modal, 
  // pero recuerda quitar cualquier 'body { style: ... }' manual de tu index.html.
  useEffect(() => {
    document.body.style.overflow = isModalOpen ? 'hidden' : 'unset';
  }, [isModalOpen]);

  const addToCart = (name: string) => setCart(prev => ({ ...prev, [name]: (prev[name] || 0) + 1 }));
  
  const removeFromCart = (name: string) => {
    setCart(prev => {
      const newCart = { ...prev };
      if (newCart[name] > 1) newCart[name] -= 1;
      else delete newCart[name];
      return newCart;
    });
  };

  const orderTotal = Object.entries(cart).reduce((total, [name, qty]) => {
    const p = data.find(prod => prod.name === name);
    return total + (p?.price || 0) * qty;
  }, 0);

  const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);

  return (
    <div className="app-wrapper">
      <div className="main-container">
        
        {/* SECCIÓN DE PRODUCTOS - Cambiada a una estructura de lista semántica */}
        <main className="products-section">
          <h1 className="title">Desserts</h1>
          <ul className="products-grid">
            {data.map((product) => {
              const qty = cart[product.name] || 0;
              return (
                <li key={product.name}>
                  <article className="product-card">
                    <div className="product-image-container">
                      <img 
                        src={product.image.desktop} 
                        alt={product.name} 
                        className={`product-image ${qty > 0 ? 'active' : ''}`} 
                      />
                      
                      {qty === 0 ? (
                        <button 
                          type="button"
                          className="add-to-cart-btn" 
                          onClick={() => addToCart(product.name)}
                          aria-label={`Add ${product.name} to cart`}
                        >
                          <img src="/assets/images/icon-add-to-cart.svg" alt="" />
                          Add to Cart
                        </button>
                      ) : (
                        <div className="quantity-controls">
                          <button 
                            type="button"
                            onClick={() => removeFromCart(product.name)} 
                            className="qty-btn"
                            aria-label={`Remove one ${product.name} from cart`}
                          >
                            <span>-</span>
                          </button>
                          <span className="qty-number" aria-live="polite">{qty}</span>
                          <button 
                            type="button"
                            onClick={() => addToCart(product.name)} 
                            className="qty-btn"
                            aria-label={`Add one more ${product.name} to cart`}
                          >
                            <span>+</span>
                          </button>
                        </div>
                      )}
                    </div>
                    <p className="product-category">{product.category}</p>
                    {/* h3 para respetar la jerarquía (h1: Desserts, h2: Cart) */}
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-price">${product.price.toFixed(2)}</p>
                  </article>
                </li>
              );
            })}
          </ul>
        </main>

        {/* SECCIÓN DEL CARRITO */}
        <aside className="cart-aside" aria-labelledby="cart-heading">
          <h2 id="cart-heading" className="cart-title" aria-live="polite">
            Your Cart ({totalItems})
          </h2>
          
          {totalItems === 0 ? (
            <div className="empty-cart">
              <img src="/assets/images/illustration-empty-cart.svg" alt="" role="presentation" />
              <p>Your added items will appear here</p>
            </div>
          ) : (
            <div className="cart-items-list">
              {Object.entries(cart).map(([name, qty]) => {
                const p = data.find(item => item.name === name);
                return (
                  <div key={name} className="cart-item">
                    <div className="item-details">
                      <p className="item-name">{name}</p>
                      <div className="item-pricing">
                        <span className="item-qty">{qty}x</span>
                        <span className="item-price">@ ${p?.price.toFixed(2)}</span>
                        <span className="item-subtotal">${((p?.price || 0) * qty).toFixed(2)}</span>
                      </div>
                    </div>
                    <button 
                      type="button"
                      className="remove-item" 
                      aria-label={`Remove ${name} from cart`}
                      onClick={() => {
                        const newCart = {...cart};
                        delete newCart[name];
                        setCart(newCart);
                      }}
                    >×</button>
                  </div>
                );
              })}
              <div className="order-total-row">
                <span>Order Total</span>
                <span className="total-price-text">${orderTotal.toFixed(2)}</span>
              </div>
              
              <div className="carbon-neutral-ad">
                <img src="/assets/images/icon-carbon-neutral.svg" alt="" />
                <p>This is a <strong>carbon-neutral</strong> delivery</p>
              </div>

              <button 
                type="button"
                className="confirm-button" 
                onClick={() => setIsModalOpen(true)}
              >
                Confirm Order
              </button>
            </div>
          )}
        </aside>
      </div>

      {/* MODAL DE CONFIRMACIÓN */}
      {isModalOpen && (
        <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="modal-title">
          <div className="modal-content">
            <img src="/assets/images/icon-order-confirmed.svg" alt="" />
            <h2 id="modal-title" className="modal-title">Order Confirmed</h2>
            <p className="modal-subtitle">We hope you enjoy your food!</p>

            <div className="order-summary-container">
              {Object.entries(cart).map(([name, quantity]) => {
                const product = data.find(p => p.name === name);
                return (
                  <div key={name} className="summary-item">
                    <div className="summary-left">
                      <img src={product?.image.thumbnail} alt="" className="thumb" />
                      <div>
                        <p className="summary-name">{name}</p>
                        <div className="summary-pricing">
                          <span className="item-qty">{quantity}x</span>
                          <span className="item-price">@ ${product?.price.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                    <p className="summary-subtotal">${((product?.price || 0) * quantity).toFixed(2)}</p>
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
              onClick={() => { setCart({}); setIsModalOpen(false); }}
            >
              Start New Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;