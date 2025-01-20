'use client';
import React, { useState } from 'react';
import ReviewRating from './ReviewRatings';

// Mock data for products (replace with real data or API)
const products = [
  { id: 1, name: 'Product 1', price: 100 },
  { id: 2, name: 'Product 2', price: 150 },
  { id: 3, name: 'Product 3', price: 200 },
];

// Mock data for valid discount codes and gift coupons
const discountCoupons = [
  { code: 'DISCOUNT10', discountValue: 10 }, // 10% discount
  { code: 'DISCOUNT20', discountValue: 20 }, // 20% discount
];

const giftCoupons = [
  { code: 'GIFT100', discountValue: 100 }, // $100 off
];

const CheckoutPage: React.FC = () => {
  const [cart, setCart] = useState(products);
  const [total, setTotal] = useState<number>(cart.reduce((acc, product) => acc + product.price, 0));
  const [voucherCode, setVoucherCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [error, setError] = useState('');

  // Handle input changes
  const handleVoucherCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVoucherCode(e.target.value);
  };

  // Apply discount or gift coupon
  const applyVoucher = () => {
    setError('');
    const isDiscountCode = discountCoupons.find((coupon) => coupon.code === voucherCode);
    const isGiftCoupon = giftCoupons.find((coupon) => coupon.code === voucherCode);

    if (isDiscountCode) {
      // Apply discount
      const discountAmount = (total * isDiscountCode.discountValue) / 100;
      setTotal(total - discountAmount);
      setDiscountApplied(true);
      setError('');
    } else if (isGiftCoupon) {
      // Apply gift coupon
      setTotal(total - isGiftCoupon.discountValue);
      setDiscountApplied(true);
      setError('');
    } else {
      // Invalid coupon code
      setError('Invalid voucher code. Please try again.');
    }
  };

  return (
    <div className="p-8 bg-white rounded-lg shadow-lg max-w-3xl mx-auto">
      <h1 className="text-3xl font-semibold mb-8">Checkout</h1>
      {/* Cart Summary */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Cart Summary</h2>
        <ul>
          {cart.map((product) => (
            <li key={product.id} className="flex justify-between py-2 border-b">
              <span>{product.name}</span>
              <span>${product.price}</span>
            </li>
          ))}
        </ul>
        <div className="flex justify-between py-2 mt-4">
          <strong>Total:</strong>
          <span>${total}</span>
        </div>
      </div>

      {/* Voucher Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Apply Discount or Gift Coupon</h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Enter Voucher Code"
            className="p-4 border w-full rounded-lg text-lg"
            value={voucherCode}
            onChange={handleVoucherCodeChange}
          />
          <button
            onClick={applyVoucher}
            className="bg-blue-600 text-white p-4 rounded-lg w-full text-xl hover:bg-blue-700 transition-all"
          >
            Apply Voucher
          </button>
          {discountApplied && <p className="text-green-500 font-semibold">Voucher applied successfully!</p>}
          {error && <p className="text-red-500">{error}</p>}
        </div>
      </div>

      {/* Checkout Button */}
      <button className="bg-green-600 text-white p-4 rounded-lg w-full text-xl hover:bg-green-700 transition-all">
        Proceed to Payment
      </button>
      <ReviewRating/>
    </div>
  );
};

export default CheckoutPage;
