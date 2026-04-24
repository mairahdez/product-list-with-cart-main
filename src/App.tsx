
import { useState, useEffect } from 'react';
import data from './data.json';
import './App.css';

function App() {
  const [cart, setCart] = useState<{ [key: string]: number }>({});
  const [isModalOpen, setIsModalOpen] = useState(false);

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
        
        {/* SECCIÓN DE PRODUCTOS */}
        <main className="products-section">
          <h1 className="title">Desserts</h1>
          <div className="products-grid">
            {data.map((product) => {
              const qty = cart[product.name] || 0;
              return (
                <div key={product.name} className="product-card">
                  <div className="product-image-container">
                    <img 
                      src={product.image.desktop} 
                      alt={product.name} 
                      className={`product-image ${qty > 0 ? 'active' : ''}`} 
                    />
                    
                    {qty === 0 ? (
                      <button className="add-to-cart-btn" onClick={() => addToCart(product.name)}>
                        <img src="/assets/images/icon-add-to-cart.svg" alt="" />
                        Add to Cart
                      </button>
                    ) : (
                      <div className="quantity-controls">
                        {/* span interno para centrado visual del ícono */}
                        <button onClick={() => removeFromCart(product.name)} className="qty-btn">
                          <span>-</span>
                        </button>
                        <span className="qty-number">{qty}</span>
                        <button onClick={() => addToCart(product.name)} className="qty-btn">
                          <span>+</span>
                        </button>
                      </div>
                    )}
                  </div>
                  <p className="product-category">{product.category}</p>
                  <h2 className="product-name">{product.name}</h2>
                  <p className="product-price">${product.price.toFixed(2)}</p>
                </div>
              );
            })}
          </div>
        </main>

        {/* SECCIÓN DEL CARRITO */}
        <aside className="cart-aside">
          <h2 className="cart-title">Your Cart ({totalItems})</h2>
          
          {totalItems === 0 ? (
            <div className="empty-cart">
              <img src="/assets/images/illustration-empty-cart.svg" alt="Empty Cart" />
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
                    {/* El botón de eliminar tiene su clase para el hover de rotación */}
                    <button className="remove-item" onClick={() => {
                       const newCart = {...cart};
                       delete newCart[name];
                       setCart(newCart);
                    }}>×</button>
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

              <button className="confirm-button" onClick={() => setIsModalOpen(true)}>
                Confirm Order
              </button>
            </div>
          )}
        </aside>
      </div>

      {/* MODAL DE CONFIRMACIÓN */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <img src="/assets/images/icon-order-confirmed.svg" alt="Confirmed" />
            <h1 className="modal-title">Order Confirmed</h1>
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

            <button className="confirm-button" onClick={() => { setCart({}); setIsModalOpen(false); }}>
              Start New Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;