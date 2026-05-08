import { useState } from "react";

export default function AdminPanel() {

  const [updateText, setUpdateText] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const addUpdate = () => {

    const updates = JSON.parse(localStorage.getItem("updates")) || [];

    updates.push({
      title: updateText,
      date: "New",
      type: "Update"
    });

    localStorage.setItem("updates", JSON.stringify(updates));

    alert("Update Added");
    setUpdateText("");
  };

  const addImage = () => {

    const images = JSON.parse(localStorage.getItem("images")) || [];

    images.push(imageUrl);

    localStorage.setItem("images", JSON.stringify(images));

    alert("Image Added");
    setImageUrl("");
  };

  return (

    <div className="p-6 space-y-6">

      <h2 className="text-2xl font-bold text-blue-900">
        Admin Control Panel
      </h2>

      {/* ADD UPDATE */}

      <div className="bg-white p-6 rounded-xl shadow">

        <h3 className="font-semibold mb-3">Add New Update</h3>

        <input
          type="text"
          placeholder="Write update"
          className="border p-2 w-full mb-3"
          value={updateText}
          onChange={(e) => setUpdateText(e.target.value)}
        />

        <button
          onClick={addUpdate}
          className="bg-blue-900 text-white px-4 py-2 rounded"
        >
          + Add Update
        </button>

      </div>

      {/* ADD IMAGE */}

      <div className="bg-white p-6 rounded-xl shadow">

        <h3 className="font-semibold mb-3">Add Slideshow Image</h3>

        <input
          type="text"
          placeholder="Paste Image URL"
          className="border p-2 w-full mb-3"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />

        <button
          onClick={addImage}
          className="bg-blue-900 text-white px-4 py-2 rounded"
        >
          + Add Image
        </button>

      </div>

    </div>
  );
}