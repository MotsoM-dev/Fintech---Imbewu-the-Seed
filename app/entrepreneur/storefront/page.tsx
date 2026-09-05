// app/entrepreneur/storefront/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  category: string;
  image?: string;
}

interface StorefrontData {
  businessName: string;
  businessDescription: string;
  businessLocation: string;
  phone: string;
  email: string;
  status: "draft" | "published";
  visibility: "private" | "public";
  products: Product[];
  publishedAt?: string;
}

export default function StorefrontPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const user = session?.user as any;
  
  const [storefront, setStorefront] = useState<StorefrontData>({
    businessName: user?.businessName || "Your Business",
    businessDescription: user?.businessDescription || "No description",
    businessLocation: user?.businessLocation || "Location not set",
    phone: user?.phone || "Not set",
    email: user?.email || "Not set",
    status: "draft",
    visibility: "private",
    products: [],
  });

  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productForm, setProductForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
  });
  const [showEditInfo, setShowEditInfo] = useState(false);
  const [editInfoForm, setEditInfoForm] = useState({
    businessName: "",
    businessDescription: "",
    businessLocation: "",
    phone: "",
    email: "",
  });

  // Load storefront from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('entrepreneur_storefront');
      if (saved) {
        const parsed: StorefrontData = JSON.parse(saved);
        setStorefront(parsed);
        setEditInfoForm({
          businessName: parsed.businessName || user?.businessName || "",
          businessDescription: parsed.businessDescription || user?.businessDescription || "",
          businessLocation: parsed.businessLocation || user?.businessLocation || "",
          phone: parsed.phone || user?.phone || "",
          email: parsed.email || user?.email || "",
        });
      } else if (user) {
        // Initialize from user data
        const initialData: StorefrontData = {
          businessName: user.businessName || "Your Business",
          businessDescription: user.businessDescription || "No description",
          businessLocation: user.businessLocation || "Location not set",
          phone: user.phone || "Not set",
          email: user.email || "Not set",
          status: "draft",
          visibility: "private",
          products: [],
        };
        setStorefront(initialData);
        setEditInfoForm({
          businessName: initialData.businessName,
          businessDescription: initialData.businessDescription,
          businessLocation: initialData.businessLocation,
          phone: initialData.phone,
          email: initialData.email,
        });
        localStorage.setItem('entrepreneur_storefront', JSON.stringify(initialData));
      }
    }
  }, [user]);

  // Save storefront to localStorage
  const saveStorefront = (data: StorefrontData) => {
    setStorefront(data);
    if (typeof window !== 'undefined') {
      localStorage.setItem('entrepreneur_storefront', JSON.stringify(data));
    }
  };

  // Handle publishing
  const handlePublish = () => {
    const updated: StorefrontData = {
      ...storefront,
      status: storefront.status === "draft" ? "published" : "draft",
      publishedAt: storefront.status === "draft" ? new Date().toISOString() : undefined,
    };
    saveStorefront(updated);
    alert(updated.status === "published" ? "✅ Storefront published successfully!" : "📝 Storefront unpublished");
  };

  // Handle visibility change
  const handleVisibilityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const updated: StorefrontData = {
      ...storefront,
      visibility: e.target.value as "private" | "public",
    };
    saveStorefront(updated);
  };

  // Handle add product
  const handleAddProduct = () => {
    if (!productForm.name || !productForm.price) {
      alert("Please fill in product name and price");
      return;
    }

    const newProduct: Product = {
      id: Date.now().toString(),
      name: productForm.name,
      description: productForm.description || "",
      price: productForm.price,
      category: productForm.category || "General",
    };

    const updated: StorefrontData = {
      ...storefront,
      products: [...storefront.products, newProduct],
    };
    saveStorefront(updated);
    setShowProductModal(false);
    setProductForm({ name: "", description: "", price: "", category: "" });
    alert("✅ Product added successfully!");
  };

  // Handle edit product
  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      description: product.description || "",
      price: product.price,
      category: product.category || "",
    });
    setShowProductModal(true);
  };

  // Handle update product
  const handleUpdateProduct = () => {
    if (!editingProduct) return;
    if (!productForm.name || !productForm.price) {
      alert("Please fill in product name and price");
      return;
    }

    const updatedProducts = storefront.products.map(p => 
      p.id === editingProduct.id 
        ? { ...p, name: productForm.name, description: productForm.description, price: productForm.price, category: productForm.category }
        : p
    );

    const updated: StorefrontData = {
      ...storefront,
      products: updatedProducts,
    };
    saveStorefront(updated);
    setShowProductModal(false);
    setEditingProduct(null);
    setProductForm({ name: "", description: "", price: "", category: "" });
    alert("✅ Product updated successfully!");
  };

  // Handle delete product
  const handleDeleteProduct = (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      const updated: StorefrontData = {
        ...storefront,
        products: storefront.products.filter(p => p.id !== id),
      };
      saveStorefront(updated);
    }
  };

  // Handle save business info
  const handleSaveBusinessInfo = () => {
    const updated: StorefrontData = {
      ...storefront,
      businessName: editInfoForm.businessName || storefront.businessName,
      businessDescription: editInfoForm.businessDescription || storefront.businessDescription,
      businessLocation: editInfoForm.businessLocation || storefront.businessLocation,
      phone: editInfoForm.phone || storefront.phone,
      email: editInfoForm.email || storefront.email,
    };
    saveStorefront(updated);
    setShowEditInfo(false);
    alert("✅ Business information updated!");
  };

  const handlePreview = () => {
    alert("🔍 Preview mode: Your storefront is currently " + storefront.status);
  };

  return (
    <div className="p-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Your Storefront</h1>
            <p className="text-sm text-gray-500">
              Status: <span className={`font-medium ${storefront.status === "published" ? "text-emerald-600" : "text-gray-400"}`}>
                {storefront.status === "published" ? "✅ Published" : "📝 Draft"}
              </span>
            </p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={handlePreview}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium"
            >
              Preview Public Profile
            </button>
            <button 
              onClick={handlePublish}
              className={`px-4 py-2 rounded-lg transition text-sm font-medium ${
                storefront.status === "published"
                  ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  : "bg-emerald-600 text-white hover:bg-emerald-700"
              }`}
            >
              {storefront.status === "published" ? "Unpublish" : "Publish Storefront"}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Business Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="h-20 w-20 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-3xl text-white flex-shrink-0">
                  🏢
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800">{storefront.businessName}</h3>
                  <p className="text-gray-500 text-sm">{storefront.businessDescription}</p>
                  <p className="text-gray-400 text-sm">📍 {storefront.businessLocation}</p>
                  {storefront.status === "published" && storefront.publishedAt && (
                    <p className="text-xs text-emerald-600 mt-1">
                      Published: {new Date(storefront.publishedAt).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
              <button 
                onClick={() => setShowEditInfo(!showEditInfo)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition text-sm"
              >
                {showEditInfo ? "Cancel" : "Edit Business Info"}
              </button>
            </div>

            {/* Edit Business Info Form */}
            {showEditInfo && (
              <div className="bg-white border-2 border-emerald-200 rounded-lg p-6">
                <h4 className="font-semibold text-gray-800 mb-4">Edit Business Information</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Business Name</label>
                    <input
                      type="text"
                      value={editInfoForm.businessName}
                      onChange={(e) => setEditInfoForm({...editInfoForm, businessName: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      value={editInfoForm.businessDescription}
                      onChange={(e) => setEditInfoForm({...editInfoForm, businessDescription: e.target.value})}
                      rows={2}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <input
                      type="text"
                      value={editInfoForm.businessLocation}
                      onChange={(e) => setEditInfoForm({...editInfoForm, businessLocation: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                      <input
                        type="text"
                        value={editInfoForm.phone}
                        onChange={(e) => setEditInfoForm({...editInfoForm, phone: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        value={editInfoForm.email}
                        onChange={(e) => setEditInfoForm({...editInfoForm, email: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  </div>
                  <button
                    onClick={handleSaveBusinessInfo}
                    className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            )}

            {/* Products Section */}
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-gray-800">Products & Services</h3>
                <button 
                  onClick={() => {
                    setEditingProduct(null);
                    setProductForm({ name: "", description: "", price: "", category: "" });
                    setShowProductModal(true);
                  }}
                  className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition text-sm"
                >
                  + Add Product
                </button>
              </div>
              {storefront.products.length === 0 ? (
                <div className="text-center py-8 text-gray-400">
                  <p>No products yet. Click "Add Product" to get started.</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {storefront.products.map((product) => (
                    <div key={product.id} className="bg-white border border-gray-200 rounded-lg p-3 hover:shadow-md transition">
                      <div className="text-2xl mb-1">📦</div>
                      <p className="font-medium text-gray-800 text-sm">{product.name}</p>
                      <p className="text-emerald-600 font-semibold text-sm">{product.price}</p>
                      <p className="text-xs text-gray-400">{product.category}</p>
                      <div className="flex gap-2 mt-2">
                        <button 
                          onClick={() => handleEditProduct(product)}
                          className="text-xs text-blue-600 hover:text-blue-800 transition"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDeleteProduct(product.id)}
                          className="text-xs text-red-500 hover:text-red-700 transition"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Settings */}
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold text-gray-800 mb-3">Storefront Settings</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-gray-600">Status</label>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`inline-block h-2 w-2 rounded-full ${storefront.status === "published" ? "bg-emerald-500" : "bg-gray-300"}`}></span>
                    <span className={`text-sm ${storefront.status === "published" ? "text-emerald-600" : "text-gray-400"}`}>
                      {storefront.status === "published" ? "Published" : "Draft"}
                    </span>
                  </div>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Visibility</label>
                  <select 
                    value={storefront.visibility}
                    onChange={handleVisibilityChange}
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  >
                    <option value="private">Private</option>
                    <option value="public">Public</option>
                  </select>
                </div>
                <div className="pt-3 border-t border-gray-200">
                  <p className="text-xs text-gray-400">
                    {storefront.products.length} products • 
                    {storefront.status === "published" ? " Published" : " Draft"}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold text-gray-800 mb-3">Contact Information</h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-600">📧 {storefront.email}</p>
                <p className="text-gray-600">📱 {storefront.phone}</p>
                <button 
                  onClick={() => setShowEditInfo(!showEditInfo)}
                  className="text-emerald-600 hover:text-emerald-700 text-sm font-medium"
                >
                  {showEditInfo ? "Close" : "Edit Contact Info"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Modal */}
      {showProductModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              {editingProduct ? "Edit Product" : "Add Product"}
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
                <input
                  type="text"
                  value={productForm.name}
                  onChange={(e) => setProductForm({...productForm, name: e.target.value})}
                  placeholder="Product name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={productForm.description}
                  onChange={(e) => setProductForm({...productForm, description: e.target.value})}
                  rows={2}
                  placeholder="Product description"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price *</label>
                <input
                  type="text"
                  value={productForm.price}
                  onChange={(e) => setProductForm({...productForm, price: e.target.value})}
                  placeholder="R49.99"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <input
                  type="text"
                  value={productForm.category}
                  onChange={(e) => setProductForm({...productForm, category: e.target.value})}
                  placeholder="Category"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowProductModal(false)}
                  className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={editingProduct ? handleUpdateProduct : handleAddProduct}
                  className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition"
                >
                  {editingProduct ? "Update" : "Add"} Product
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}