import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import './Resource.css';

function Resource() {
  const [fileType, setFileType] = useState('pdf');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState('');

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('category', category);
    if (fileType === 'video') {
      if (file) {
        formData.append('file', file);
      } else {
        formData.append('url', url);
      }
    } else if (fileType === 'pdf' && file) {
      formData.append('file', file);
    }

    try {
      const response = await axios.post(
        'http://localhost:8810/echomind/api/admin/upload-resource',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      toast.success(response.data.message || 'Resource uploaded successfully!');
    } catch (error) {
      toast.error(
        error.response?.data?.message || 'Error uploading resource. Please try again.'
      );
    }
  };

  return (
    <div className="resource-container">
      <h2>Upload New Resource</h2>
      <form
        className={`resource-form ${fileType === 'video' ? 'video-form' : ''}`}
        onSubmit={handleSubmit}
      >
        <div className="resource-type">
          <label>
            <input
              type="radio"
              name="fileType"
              value="pdf"
              checked={fileType === 'pdf'}
              onChange={() => setFileType('pdf')}
            />
            PDF
          </label>
          <label>
            <input
              type="radio"
              name="fileType"
              value="video"
              checked={fileType === 'video'}
              onChange={() => setFileType('video')}
            />
            Video
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter the title"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter a brief description"
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select Category</option>
            <option value="self-help">Self-help</option>
            <option value="therapy">Therapy</option>
            <option value="mindfulness">Mindfulness</option>
          </select>
        </div>

        {fileType === 'pdf' ? (
          <div className="form-group">
            <label htmlFor="pdfFile">Upload PDF</label>
            <input
              type="file"
              id="pdfFile"
              accept=".pdf"
              onChange={handleFileChange}
              required
            />
          </div>
        ) : (
          <div className="form-group">
            <label htmlFor="videoFile">Upload Video or Provide Link</label>
            <input
              type="file"
              id="videoFile"
              accept="video/*"
              onChange={handleFileChange}
            />
            <p>Or</p>
            <input
              type="url"
              id="videoLink"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Or enter a YouTube/Vimeo link"
            />
          </div>
        )}

        <button type="submit" className="submit-btn">
          Upload Resource
        </button>
      </form>

      {/* Add Toast Container */}
      <ToastContainer />
    </div>
  );
}

export default Resource;
