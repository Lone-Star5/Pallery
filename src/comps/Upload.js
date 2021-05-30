import React, { useState } from 'react';
import ProgressBar from './ProgressBar'
const Upload = () => {

    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);

    const types = ['image/png','image/jpeg']

    const uploadFile = (e) =>{
        let selected = e.target.files[0];
        console.log(selected);

        if(selected && types.includes(selected.type)){
            setFile(selected);
            setError('');
        } else {
            setFile(null);
            setError("Please select an image file(png/jpeg)")
        }
    }

    return (
        <form>
            <input type="file" onChange={uploadFile}/>
            <div className="output">
                { error && <div className="error"> { error }</div>}
                { file && <div className="error"> { file.name }</div>}
                {file && <ProgressBar file={file} setFile={setFile} /> }
            </div>
        </form>
    )
}

export default Upload;