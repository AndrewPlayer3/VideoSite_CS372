import UploadForm from '../components/UploadForm'
import { useState } from 'react'

export default function Upload() {
    return (
        <div className="flex h-screen items-start justify-center">
            <UploadForm />
        </div>
    )
}


// export default function Upload() {
//     const [image, setImage] = useState(null);
//     const [createObjectURL, setCreateObjectURL] = useState(null);

//     const uploadToClient = (event) => {
//         if (event.target.files && event.target.files[0]) {
//             const i = event.target.files[0];
//             setImage(i);
//             setCreateObjectURL(URL.createObjectURL(i));
//         }
//     };

//     const uploadToServer = async (event) => {
//         const body = new FormData();
//         body.append("file", image);
//         const response = await fetch("/api/upload", {
//             method: "POST",
//             body
//         });
//     };

//     return (
//         <div>
//         <div>
//             <img src={createObjectURL} />
//             <h4>Select Video</h4>
//             <input type="file" name="file_upload" onChange={uploadToClient} />
//             <button
//                 className="btn btn-primary"
//                 type="submit"
//                 onClick={uploadToServer}
//             >
//                 Send to server
//             </button>
//         </div>
//         </div>
//     )
// }