// // AddNote.js
// import React, { useState } from "react";
// import { getFirestore, collection, addDoc } from 'firebase/firestore';
// import { app } from '../FireBase/firebaseConfig';

// const AddNote = () => {

//   const [note, setNote] = useState("");

//   function handleSaveNote()
//   {
//     const db = getFirestore(app);
//     const docRef = addDoc(collection(db,"SaveNote"),{
//       Note: note
//     })
//     console.log("note saved on database", docRef.id);
    

//   }

//   return (
//     <div className="flex flex-col w-full max-w-[400px] p-4 border rounded-md shadow-lg bg-white">
//       <h3 className="text-lg font-bold mb-2 text-gray-800">Add a Note</h3>
//       <textarea
//         value={note}
//         onChange={(e)=>{setNote(e.target.value)}}
//         placeholder="Write your note here..."
//         className="w-full h-[100px] border rounded-md p-2 text-gray-800 mb-2"
//       />
//       <button
//       onClick={handleSaveNote}
//         className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
//       >
//         Save Note
//       </button>
//     </div>
//   );
// };

// export default AddNote;
