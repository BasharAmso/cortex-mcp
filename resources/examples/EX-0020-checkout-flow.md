---
id: EX-0020
name: Checkout Flow with Cart
category: examples
tags: [ecommerce, checkout, cart, payment, order, stripe, typescript]
capabilities: [cart-management, checkout-flow, order-creation]
useWhen:
  - building a shopping cart and checkout flow
  - implementing cart state management with add/remove/quantity
  - connecting a checkout to Stripe or a payment processor
estimatedTokens: 700
relatedFragments: [SKL-0258, PAT-0134, PAT-0142, SKL-0011, EX-0019, EX-0009]
dependencies: []
synonyms: ["shopping cart example", "checkout implementation", "ecommerce cart", "add to cart flow", "order processing example"]
sourceUrl: "https://github.com/medusajs/medusa"
lastUpdated: "2026-04-01"
difficulty: intermediate
owner: builder
pillar: "ecommerce"
---

# Checkout Flow with Cart

Cart state management through order creation with Stripe payment.

## Implementation

```typescript
// --- Cart Types ---
interface CartItem {
  productId: string;
  name: string;
  price: number; // cents
  quantity: number;
  image?: string;
}

interface Cart {
  items: CartItem[];
  discountCode?: string;
  discountAmount: number;
}

// --- Cart Operations ---
function addToCart(cart: Cart, product: Omit<CartItem, 'quantity'>, qty = 1): Cart {
  const existing = cart.items.find(i => i.productId === product.productId);
  if (existing) {
    return {
      ...cart,
      items: cart.items.map(i =>
        i.productId === product.productId
          ? { ...i, quantity: i.quantity + qty }
          : i
      ),
    };
  }
  return { ...cart, items: [...cart.items, { ...product, quantity: qty }] };
}

function removeFromCart(cart: Cart, productId: string): Cart {
  return { ...cart, items: cart.items.filter(i => i.productId !== productId) };
}

function updateQuantity(cart: Cart, productId: string, quantity: number): Cart {
  if (quantity <= 0) return removeFromCart(cart, productId);
  return {
    ...cart,
    items: cart.items.map(i =>
      i.productId === productId ? { ...i, quantity } : i
    ),
  };
}

function cartTotal(cart: Cart): { subtotal: number; discount: number; total: number } {
  const subtotal = cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const discount = cart.discountAmount;
  return { subtotal, discount, total: Math.max(0, subtotal - discount) };
}

// --- Checkout (server-side) ---
interface CheckoutInput {
  cart: Cart;
  email: string;
  shippingAddress: { line1: string; city: string; state: string; zip: string };
}

async function createCheckoutSession(input: CheckoutInput): Promise<{ sessionUrl: string }> {
  // Validate stock (server-side re-check)
  for (const item of input.cart.items) {
    const product = await db.product.findUnique({ where: { id: item.productId } });
    if (!product || product.stock < item.quantity) {
      throw new Error(`${item.name} is out of stock`);
    }
  }

  // Create Stripe checkout session
  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    customer_email: input.email,
    line_items: input.cart.items.map(item => ({
      price_data: {
        currency: 'usd',
        product_data: { name: item.name },
        unit_amount: item.price,
      },
      quantity: item.quantity,
    })),
    success_url: `${process.env.BASE_URL}/order/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.BASE_URL}/cart`,
  });

  // Reserve inventory
  for (const item of input.cart.items) {
    await db.product.update({
      where: { id: item.productId },
      data: { stock: { decrement: item.quantity } },
    });
  }

  return { sessionUrl: session.url! };
}
```

## Key Patterns

- **Immutable cart operations**: each function returns a new cart, enabling undo and time-travel
- **Server-side stock validation**: never trust client-side availability
- **Inventory reservation at checkout**: decrement stock when session is created, restore on expiry
- **Stripe Checkout**: offloads PCI compliance to Stripe
