import {useState, useEffect} from 'react';
import {projectStorage, projectFirestore, timestamp} from '../firebase/config';

const useStorage = (file) =>{
    const [progress,setProgress] = useState(0);
    const [error, setError] = useState(null);
    const [url, setUrl] = useState(null);

    useEffect(()=>{
        // references
        const storageRef =  projectStorage.ref(file.name)
        const collectionRef = projectFirestore.collection('images')

        storageRef.put(file).on('state_change', (snap) =>{
            let perc = (snap.bytesTransferred / snap.totalBytes)*100;
            setProgress(perc)
        }, (err) => {
            setError(err)
        }, async()=>{
            const url = await storageRef.getDownloadURL();
            const createdAt = timestamp();
            console.log(createdAt)
            collectionRef.add({url, createdAt})
            setUrl(url)
        });

    },[file])

    return { progress, error, url};
}

export default useStorage;