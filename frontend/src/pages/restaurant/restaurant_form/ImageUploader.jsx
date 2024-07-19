import React, { useState, useRef } from 'react';
import './css/ImageUploader.css';
const ImageUploader = () => {
    const [images, setImages] = useState([]);
    const imageTitleRef = useRef(null);
    const imageFileRef = useRef(null);

    const addImage = () => {
        const title = imageTitleRef.current.value.trim();
        const file = imageFileRef.current.files[0];

        if (title && file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const newImage = {
                    src: e.target.result,
                    title: title
                };

                setImages([...images, newImage]);

                // Clear input fields
                imageTitleRef.current.value = '';
                imageFileRef.current.value = '';
            };
            reader.readAsDataURL(file);
        } else {
            alert('Please enter a title and select an image file.');
        }
    };

    const removeImage = (index) => {
        const newImages = images.filter((_, i) => i !== index);
        setImages(newImages);
    };

    return (
        <div >
            <div className="gallery-form">
                <div className="reservation-form-group">
                    <label htmlFor="reservation-label"> Titre de l'image:</label>
                    <input type="text" id="image-title" placeholder="Enter image title" ref={imageTitleRef} />
                </div>
                <div className="reservation-form-group">
                    <label htmlFor="image-file">Choisir une image:</label>
                    <input type="file" id="image-file" accept="image/*" ref={imageFileRef} />
                </div>
                <button className="sm-button button-bg" onClick={addImage}>Add Image</button>
            </div>

            <div className="gallery-image-grid">
                {images.map((image, index) => (
                    <div key={index} className="gallery-image-item">
                        <img src={image.src} alt={image.title} />
                        <div className="gallery-image-info">
                            <div className="gallery-image-title">{image.title}</div>
                            <button className="gallery-remove-btn" onClick={() => removeImage(index)}>Remove</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ImageUploader;