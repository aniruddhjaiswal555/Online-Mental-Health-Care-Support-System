import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ResourceManage.css";

function ResourceManage() {
  const [books, setBooks] = useState([]);
  const [videos, setVideos] = useState([]);
  const [activeTab, setActiveTab] = useState("books");
  const [editIndex, setEditIndex] = useState(null);
  const [editData, setEditData] = useState(null);
  const [isVideoLink, setIsVideoLink] = useState(false);
  const [deletingRow, setDeletingRow] = useState(null); // Track row for deletion

  useEffect(() => {
    if (activeTab === "books") {
      fetchBooks();
    } else {
      fetchVideos();
    }
  }, [activeTab]);

  const fetchBooks = async () => {
    try {
      const response = await axios.get("http://localhost:8810/echomind/api/admin/fetch-book");
      setBooks(response.data.books);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const fetchVideos = async () => {
    try {
      const response = await axios.get("http://localhost:8810/echomind/api/admin/fetch-vedio");
      setVideos(response.data.vedios);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  const handleEdit = (index, data) => {
    setEditIndex(index);
    setEditData({ ...data });
    setIsVideoLink(data.file.startsWith("http"));
  };

  const handleSave = async (resourceType) => {
    try {
      const updatedData = resourceType === "books" ? books : videos;
      updatedData[editIndex] = { ...editData };

      if (resourceType === "books") setBooks([...updatedData]);
      if (resourceType === "videos") setVideos([...updatedData]);

      await axios.put(
        `http://localhost:8810/echomind/api/admin/update-${resourceType.slice(0, -1)}`,
        editData
      );

      setEditIndex(null);
      setEditData(null);
      setIsVideoLink(false);
    } catch (error) {
      console.error("Error saving changes:", error);
    }
  };

  const handleInputChange = (field, value) => {
    setEditData((prev) => ({ ...prev, [field]: value }));
  };

  const handleDelete = (resourceType, title, index) => {
    setDeletingRow(index); // Set the row to be deleted
  };

  const handleConfirmDelete = (resourceType, index) => {
    if (resourceType === "books") {
      setBooks(books.filter((_, i) => i !== index));
    } else {
      setVideos(videos.filter((_, i) => i !== index));
    }

    setDeletingRow(null); // Reset the deletion state
  };

  const handleCancelDelete = () => {
    setDeletingRow(null); // Reset the deletion state if cancel is clicked
  };

  const handleFileChange = (e, field) => {
    const file = e.target.files[0]; // Get the first selected file
    if (file) {
      // If the file exists, update the respective field in the editData state
      setEditData((prev) => ({
        ...prev,
        [field]: file,
      }));
    }
  };

  const renderTableRows = (data, resourceType) => {
    return data.map((item, index) => (
      <tr key={index} className={editIndex === index ? "editing-row" : ""}>
        {editIndex === index ? (
          <>
            <td>
              <input
                type="text"
                value={editData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
              />
            </td>
            <td>
              <input
                type="text"
                value={editData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
              />
            </td>
            <td>
              <select
                value={editData.category}
                onChange={(e) => handleInputChange("category", e.target.value)}
              >
                <option value="self-help">Self-help</option>
                <option value="therapy">Therapy</option>
                <option value="mindfulness">Mindfulness</option>
              </select>
            </td>
            <td>
              {resourceType === "books" ? (
                <input
                  type="file"
                  onChange={(e) => handleFileChange(e, "file")}
                />
              ) : (
                <>
                  <input
                    type="file"
                    style={{ display: isVideoLink ? "none" : "block" }}
                    onChange={(e) => handleFileChange(e, "file")}
                  />
                  <input
                    type="text"
                    style={{ display: isVideoLink ? "block" : "none" }}
                    value={editData.file}
                    onChange={(e) => handleInputChange("file", e.target.value)}
                    placeholder="YouTube URL"
                  />
                  <label>
                    <input
                      type="checkbox"
                      checked={isVideoLink}
                      onChange={() => setIsVideoLink(!isVideoLink)}
                    />{" "}
                    Use YouTube Link
                  </label>
                </>
              )}
            </td>
            <td>{item.createdAt}</td>
            <td>
              <button
                className="save-btn"
                onClick={() => handleSave(resourceType)}
              >
                Save
              </button>
              <button
                className="cancel-btn"
                onClick={() => setEditIndex(null)}
              >
                Cancel
              </button>
            </td>
          </>
        ) : (
          <>
            <td>{item.title}</td>
            <td>{item.description}</td>
            <td>{item.category}</td>
            <td>{item.file}</td>
            <td>{item.createdAt}</td>
            <td>
              {deletingRow === index ? (
                <>
                  <button
                    className="confirm-btn"
                    onClick={() => handleConfirmDelete(resourceType, index)}
                  >
                    Confirm
                  </button>
                  <button
                    className="cancel-btn"
                    onClick={handleCancelDelete}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(index, item)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(resourceType, item.title, index)}
                  >
                    Delete
                  </button>
                </>
              )}
            </td>
          </>
        )}
      </tr>
    ));
  };

  return (
    <div className="resource-manage-container">
      <h1>Manage Resources</h1>
      <div className="tabs">
        <button
          className={`tab-btn ${activeTab === "books" ? "active" : ""}`}
          onClick={() => setActiveTab("books")}
        >
          Books
        </button>
        <button
          className={`tab-btn ${activeTab === "videos" ? "active" : ""}`}
          onClick={() => setActiveTab("videos")}
        >
          Videos
        </button>
      </div>

      <div className="resource-table">
        <h2>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h2>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Category</th>
              <th>File</th>
              <th>Date Uploaded</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {activeTab === "books"
              ? renderTableRows(books, "books")
              : renderTableRows(videos, "videos")}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ResourceManage;
