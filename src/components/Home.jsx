import { useEffect, useState } from "react";

export default function Home({ isAdmin }) {

const text = "Welcome to Placement Cell";

const [displayText, setDisplayText] = useState("");
const [current, setCurrent] = useState(0);
const [updates, setUpdates] = useState([]);
const [images, setImages] = useState([]);

const [showUpdateForm, setShowUpdateForm] = useState(false);
const [type, setType] = useState("updates");
const [title, setTitle] = useState("");

/* ADD UPDATE */

const addUpdate = () => {

const stored = JSON.parse(localStorage.getItem("updates")) || [];

stored.push({
 title,
 type,
 date: new Date().toLocaleDateString(),
 link:"#"
});

localStorage.setItem("updates", JSON.stringify(stored));

setUpdates(stored);
setTitle("");
setShowUpdateForm(false);

};

/* IMAGE UPLOAD */

const handleImageUpload = (e) => {

 const file = e.target.files[0];

 if (!file) return;

 const reader = new FileReader();

 reader.onload = () => {

  const stored = JSON.parse(localStorage.getItem("images")) || [];

  stored.push(reader.result);

  localStorage.setItem("images", JSON.stringify(stored));

  setImages(stored);

 };

 reader.readAsDataURL(file);

};

/* DELETE IMAGE */

const deleteImage = (index) => {

 const stored = JSON.parse(localStorage.getItem("images")) || [];

 stored.splice(index,1);

 localStorage.setItem("images", JSON.stringify(stored));

 setImages(stored);

};

/* TYPING EFFECT */

useEffect(()=>{

let i=0;

const interval=setInterval(()=>{

setDisplayText(text.slice(0,i+1));

i++;

if(i===text.length) clearInterval(interval);

},80);

return()=>clearInterval(interval);

},[]);

/* LOAD DATA */

useEffect(()=>{

const storedUpdates=JSON.parse(localStorage.getItem("updates"));

if(storedUpdates) setUpdates(storedUpdates);

},[]);

useEffect(()=>{

const storedImages=JSON.parse(localStorage.getItem("images"));

if(storedImages) setImages(storedImages);

},[]);

/* IMAGE SLIDER */

useEffect(()=>{

if(images.length===0) return;

const slider=setInterval(()=>{

setCurrent(prev=>(prev+1)%images.length);

},2500);

return()=>clearInterval(slider);

},[images]);

return(

<div className="flex p-10 gap-8">

{/* LEFT SIDE */}

<div className="w-1/2 space-y-6">

<div className="bg-white p-6 rounded-xl shadow">

<h2 className="text-lg font-semibold text-blue-900 mb-2">
{displayText}
</h2>

<p className="text-gray-600">
The Placement Cell at IIPS connects students with top recruiters.
</p>

</div>

{/* UPDATES */}

<div className="bg-white p-6 rounded-xl shadow">

<h2 className="flex justify-between font-semibold mb-4">

Latest Updates

{isAdmin && (
<button
onClick={()=>setShowUpdateForm(true)}
className="bg-blue-900 text-white px-2 rounded"
>
+
</button>
)}

</h2>

{showUpdateForm && (

<div className="bg-gray-100 p-4 rounded mb-4">

<select
className="border p-2 w-full mb-2"
value={type}
onChange={(e)=>setType(e.target.value)}
>

<option value="updates">Updates</option>
<option value="internship">Internship</option>
<option value="drives">Drives</option>

</select>

<input
type="text"
placeholder="Enter title"
className="border p-2 w-full mb-2"
value={title}
onChange={(e)=>setTitle(e.target.value)}
/>

<button
onClick={addUpdate}
className="bg-blue-900 text-white px-4 py-1 rounded"
>
Save
</button>

</div>

)}

<div className="space-y-4">

{updates.map((item,index)=>(

<div
key={index}
className="border-l-4 border-blue-900 pl-4 p-2 rounded"
>

<p className="font-semibold">{item.title}</p>

<p className="text-sm text-gray-500">
{item.type} • {item.date}
</p>

</div>

))}

</div>

</div>

</div>

{/* RIGHT SIDE */}

<div className="w-1/2 space-y-4">

<img
src={images[current] || "https://via.placeholder.com/800x400"}
className="rounded-xl w-full h-80 object-cover"
/>

<div className="flex gap-3 overflow-x-auto">

{images.map((img,index)=>(

<div key={index} className="relative">

<img
src={img}
onClick={()=>setCurrent(index)}
className="w-28 h-20 object-cover rounded-lg cursor-pointer"
/>

{isAdmin && (

<button
onClick={()=>deleteImage(index)}
className="absolute top-0 right-0 bg-red-600 text-white text-xs px-1 rounded"
>
✕
</button>

)}

</div>

))}

</div>

{isAdmin && (

<div className="flex justify-center">

<label className="bg-blue-900 text-white w-8 h-8 flex items-center justify-center rounded cursor-pointer">

+

<input
type="file"
onChange={handleImageUpload}
className="hidden"
/>

</label>

</div>

)}

</div>

</div>

);

}