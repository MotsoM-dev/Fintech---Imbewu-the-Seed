// app/entrepreneur/documents/page.tsx
"use client";

import { useState, useEffect } from "react";

interface Document {
  id: string;
  name: string;
  category: string;
  uploadedAt: string;
  verified: boolean;
  file?: File;
}

export default function DocumentsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadCategory, setUploadCategory] = useState("");
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: "1",
      name: "Bank Statement - August.pdf",
      category: "Bank Statements",
      uploadedAt: "03 September 2026",
      verified: true,
    },
    {
      id: "2",
      name: "Business Registration.pdf",
      category: "Registration",
      uploadedAt: "02 September 2026",
      verified: true,
    },
    {
      id: "3",
      name: "Tax Return - 2025.pdf",
      category: "Tax",
      uploadedAt: "01 September 2026",
      verified: false,
    },
  ]);

  const categories = [
    "All",
    "Registration",
    "Tax",
    "Bank Statements",
    "Invoices",
    "Receipts",
    "Other"
  ];

  // Load documents from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('entrepreneur_documents');
      if (saved) {
        setDocuments(JSON.parse(saved));
      }
    }
  }, []);

  // Save documents to localStorage
  const saveDocuments = (newDocs: Document[]) => {
    setDocuments(newDocs);
    if (typeof window !== 'undefined') {
      localStorage.setItem('entrepreneur_documents', JSON.stringify(newDocs));
    }
  };

  const handleUpload = () => {
    if (!uploadFile || !uploadCategory) {
      alert("Please select a file and category");
      return;
    }

    const newDoc: Document = {
      id: Date.now().toString(),
      name: uploadFile.name,
      category: uploadCategory,
      uploadedAt: new Date().toLocaleDateString('en-ZA', { 
        day: '2-digit', 
        month: 'long', 
        year: 'numeric' 
      }),
      verified: false,
      file: uploadFile,
    };

    saveDocuments([newDoc, ...documents]);
    setShowUploadModal(false);
    setUploadFile(null);
    setUploadCategory("");
    alert("✅ Document uploaded successfully!");
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this document?")) {
      const newDocs = documents.filter(d => d.id !== id);
      saveDocuments(newDocs);
    }
  };

  const filteredDocs = selectedCategory === "All" 
    ? documents 
    : documents.filter(doc => doc.category === selectedCategory);

  return (
    <div className="p-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Documents</h1>
          <button 
            onClick={() => setShowUploadModal(true)}
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition text-sm font-medium flex items-center gap-2"
          >
            <span>+</span> Upload Document
          </button>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1.5 rounded-full text-sm transition ${
                selectedCategory === category
                  ? "bg-emerald-100 text-emerald-700 font-medium"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Document List */}
        <div className="space-y-3">
          {filteredDocs.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <div className="text-4xl mb-3">📄</div>
              <p>No documents in this category</p>
              <button 
                onClick={() => setShowUploadModal(true)}
                className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition text-sm"
              >
                Upload your first document
              </button>
            </div>
          ) : (
            filteredDocs.map((doc) => (
              <div key={doc.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition">
                <div className="flex items-start gap-3">
                  <div className="text-2xl">📄</div>
                  <div>
                    <p className="font-medium text-gray-800">{doc.name}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-gray-400">📂 {doc.category}</span>
                      <span className="text-xs text-gray-400">📅 {doc.uploadedAt}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 mt-2 sm:mt-0">
                  {doc.verified ? (
                    <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full">✓ Verified</span>
                  ) : (
                    <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full">Pending</span>
                  )}
                  <button 
                    onClick={() => alert(`Viewing: ${doc.name}`)}
                    className="px-3 py-1 text-sm text-emerald-600 hover:bg-emerald-50 rounded transition"
                  >
                    View
                  </button>
                  <button 
                    onClick={() => handleDelete(doc.id)}
                    className="px-3 py-1 text-sm text-red-500 hover:bg-red-50 rounded transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Upload Document</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={uploadCategory}
                  onChange={(e) => setUploadCategory(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                >
                  <option value="">Select category</option>
                  {categories.filter(c => c !== "All").map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">File</label>
                <input
                  type="file"
                  onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  accept=".pdf,.doc,.docx,.jpg,.png,.xlsx"
                />
                <p className="text-xs text-gray-400 mt-1">Supported: PDF, DOC, DOCX, JPG, PNG, XLSX</p>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpload}
                  className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition"
                >
                  Upload
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}