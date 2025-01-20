'use client';
import React, { useState } from 'react';
import { FaChartBar, FaBox, FaShoppingCart, FaTags, FaGift, FaUpload } from 'react-icons/fa';  // Added FaUpload for Bulk Upload
import { useForm } from 'react-hook-form';
import { Bar } from 'react-chartjs-2';
import { useDropzone } from 'react-dropzone';
import Papa from 'papaparse';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Bulk Upload Component
const BulkUpload: React.FC = () => {
  const [uploadedProducts, setUploadedProducts] = useState<any[]>([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: '.csv',
    onDrop: (acceptedFiles) => handleFileUpload(acceptedFiles),
  });

  const handleFileUpload = (files: File[]) => {
    const file = files[0];
    Papa.parse(file, {
      complete: (result) => {
        const productsData = result.data.map((item: any) => ({
          name: item[0],  // Assuming CSV columns: name, price, stock
          price: item[1],
          stock: item[2],
        }));
        setUploadedProducts(productsData);
      },
      header: false,
    });
  };

  return (
    <div className="space-y-10">
      <h3 className="text-4xl font-semibold text-gray-800">Bulk Upload Products</h3>
      <div {...getRootProps()} className="bg-white p-8 rounded-xl shadow-lg">
        <input {...getInputProps()} />
        <p>Drag & drop a CSV file here, or click to select files</p>
      </div>
      {uploadedProducts.length > 0 && (
        <div className="mt-8 bg-white p-6 rounded-xl shadow-lg">
          <h4 className="text-2xl font-semibold">Uploaded Products</h4>
          <ul>
            {uploadedProducts.map((product, index) => (
              <li key={index} className="flex justify-between py-4 border-b">
                <span className="text-lg font-semibold">{product.name}</span>
                <span className="text-lg">${product.price}</span>
                <span className="text-lg">{product.stock} in stock</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const AdminDashboard: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('dashboard');
  const [products, setProducts] = useState<any[]>([]);  // Sample products data
  const [discounts, setDiscounts] = useState<any[]>([]);  // Discounts data
  const [coupons, setCoupons] = useState<any[]>([]);  // Gift coupons data

  const { register, handleSubmit, reset } = useForm();

  // Handle form submission for adding a product
  const addProduct = (data: any) => {
    setProducts([...products, { ...data, id: products.length + 1 }]);
    reset();
  };

  // Handle form submission for adding a discount
  const addDiscount = (data: any) => {
    setDiscounts([...discounts, { ...data, id: discounts.length + 1 }]);
    reset();
  };

  // Handle form submission for creating a gift coupon
  const createCoupon = (data: any) => {
    setCoupons([...coupons, { ...data, id: coupons.length + 1 }]);
    reset();
  };

  // Data for the bar chart
  const chartData = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'Sales Data',
        data: [65, 59, 80, 81, 56],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 3,
        hoverBackgroundColor: 'rgba(75, 192, 192, 0.8)',
      },
    ],
  };

  // Options for the chart
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: 'Sales Insights',
        font: {
          size: 30,
          weight: 'bold',
        },
        color: '#333',
      },
      tooltip: {
        backgroundColor: '#333',
        titleColor: '#fff',
        bodyColor: '#fff',
      },
    },
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <div className="bg-white p-10 rounded-lg shadow-lg">
            <h3 className="text-4xl font-semibold text-gray-800 mb-8">Sales Overview</h3>
            <div className="relative h-96">
              <Bar data={chartData} options={chartOptions} />
            </div>
          </div>
        );
      case 'products':
        return (
          <div className="space-y-10">
            <h3 className="text-4xl font-semibold text-gray-800">Manage Products</h3>
            <form onSubmit={handleSubmit(addProduct)} className="space-y-6 bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all">
              <input {...register('name')} placeholder="Product Name" className="p-4 border w-full rounded-lg text-lg" required />
              <input type="number" {...register('price')} placeholder="Price" className="p-4 border w-full rounded-lg text-lg" required />
              <input type="number" {...register('stock')} placeholder="Stock" className="p-4 border w-full rounded-lg text-lg" required />
              <button type="submit" className="bg-blue-600 text-white p-4 rounded-lg w-full text-xl hover:bg-blue-700 transition-all">
                Add Product
              </button>
            </form>
            <div className="mt-8 bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all">
              <h4 className="text-2xl font-semibold">Product List</h4>
              <ul>
                {products.map(product => (
                  <li key={product.id} className="flex justify-between py-4 border-b">
                    <span className="text-lg font-semibold">{product.name}</span>
                    <span className="text-lg">${product.price}</span>
                    <span className="text-lg">{product.stock} in stock</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      case 'discounts':
        return (
          <div className="space-y-10">
            <h3 className="text-4xl font-semibold text-gray-800">Manage Discounts</h3>
            <form onSubmit={handleSubmit(addDiscount)} className="space-y-6 bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all">
              <input {...register('product')} placeholder="Product Name" className="p-4 border w-full rounded-lg text-lg" required />
              <input type="number" {...register('discount')} placeholder="Discount (%)" className="p-4 border w-full rounded-lg text-lg" required />
              <button type="submit" className="bg-green-600 text-white p-4 rounded-lg w-full text-xl hover:bg-green-700 transition-all">
                Add Discount
              </button>
            </form>
            <div className="mt-8 bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all">
              <h4 className="text-2xl font-semibold">Discount List</h4>
              <ul>
                {discounts.map(discount => (
                  <li key={discount.id} className="flex justify-between py-4 border-b">
                    <span className="text-lg">{discount.product}</span>
                    <span className="text-lg">{discount.discount}% off</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      case 'coupons':
        return (
          <div className="space-y-10">
            <h3 className="text-4xl font-semibold text-gray-800">Manage Gift Coupons</h3>
            <form onSubmit={handleSubmit(createCoupon)} className="space-y-6 bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all">
              <input {...register('code')} placeholder="Coupon Code" className="p-4 border w-full rounded-lg text-lg" required />
              <input type="number" {...register('discountValue')} placeholder="Discount Value" className="p-4 border w-full rounded-lg text-lg" required />
              <input type="date" {...register('expiryDate')} className="p-4 border w-full rounded-lg text-lg" required />
              <button type="submit" className="bg-purple-600 text-white p-4 rounded-lg w-full text-xl hover:bg-purple-700 transition-all">
                Create Coupon
              </button>
            </form>
            <div className="mt-8 bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all">
              <h4 className="text-2xl font-semibold">Gift Coupon List</h4>
              <ul>
                {coupons.map(coupon => (
                  <li key={coupon.id} className="flex justify-between py-4 border-b">
                    <span className="text-lg font-semibold">{coupon.code}</span>
                    <span className="text-lg">{coupon.discountValue}% off</span>
                    <span className="text-lg">Expires: {coupon.expiryDate}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      case 'bulkUpload':
        return <BulkUpload />;  // Adding BulkUpload component
      default:
        return <div>Select a section to manage</div>;
    }
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-1/5 bg-gray-800 text-white p-8 rounded-xl shadow-lg">
        <h2 className="text-4xl font-semibold mb-16 text-center">Admin Dashboard</h2>
        <ul>
          <li>
            <button
              onClick={() => setActiveSection('dashboard')}
              className="flex items-center space-x-3 p-5 w-full text-left hover:bg-gray-700 rounded-lg text-xl hover:text-blue-400 transition-all"
            >
              <FaChartBar size={28} />
              <span>Dashboard</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveSection('products')}
              className="flex items-center space-x-3 p-5 w-full text-left hover:bg-gray-700 rounded-lg text-xl hover:text-blue-400 transition-all"
            >
              <FaBox size={28} />
              <span>Products</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveSection('discounts')}
              className="flex items-center space-x-3 p-5 w-full text-left hover:bg-gray-700 rounded-lg text-xl hover:text-blue-400 transition-all"
            >
              <FaTags size={28} />
              <span>Discounts</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveSection('coupons')}
              className="flex items-center space-x-3 p-5 w-full text-left hover:bg-gray-700 rounded-lg text-xl hover:text-blue-400 transition-all"
            >
              <FaGift size={28} />
              <span>Gift Coupons</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveSection('bulkUpload')}
              className="flex items-center space-x-3 p-5 w-full text-left hover:bg-gray-700 rounded-lg text-xl hover:text-blue-400 transition-all"
            >
              <FaUpload size={28} />
              <span>Bulk Upload</span>
            </button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="w-4/5 p-10 bg-gray-100">{renderContent()}</div>
    </div>
  );
};

export default AdminDashboard;
