import styled from 'styled-components';
import axios from 'axios';
import { Modal } from '@kazamaswap/uikit';
import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useWeb3React } from '@kazamaswap/wagmi';

interface ModalProps {
  onDismiss?: () => void
  onDone?: () => void
}

const StyledModal = styled(Modal)`
  ${({ theme }) => theme.mediaQueries.md} {
    width: 425px;
    max-width: 425px;
    border-radius: 16px;
    background: #21252b;
    border-bottom: 2px solid #11141e;
  }
`

function ImageUpload() {
  const [image, setImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [currentAvatar, setCurrentAvatar] = useState<string | null>(null);
  const { account } = useWeb3React();

  useEffect(() => {
    fetchCurrentAvatar();
  }, [account]);

  const fetchCurrentAvatar = async () => {
    if (account) {
      try {
        // Replace 'https://assets.kazama.io' with the URL where you store current avatars
        const response = await axios.get(`https://api.kazama.io/api/auth/userAvatar/${account}`);
        setCurrentAvatar(response.data.avatarUrl);
      } catch (error) {
        console.error('Error fetching current avatar:', error);
      }
    }
  };

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedImage = e.target.files[0];

      // Display the image preview
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(selectedImage);

      setImage(selectedImage);
    }
  }

  const handleImageDelete = () => {
    // Clear the selected image and preview
    setImage(null);
    setPreviewImage(null);
  }

  const handleImageUpload = async () => {
    if (image && account) {
      try {
        // Validate file type before uploading
        const allowedFileTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (!allowedFileTypes.includes(image.type)) {
          console.error('Invalid file type. Please upload a jpg, png, or gif file.');
          return;
        }

        const formData = new FormData();
        formData.append('kazama-user-avatar', image);
        formData.append('address', account);

        // Replace 'http://localhost:4000' with your nodemon server URL
        const response = await axios.post('https://assets.kazama.io/image-upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        console.log('Axios response:', response.data);
      } catch (error) {
        console.error('Axios error:', error);
      }
    }
  }

  return (
    <StyledModal title={('Set username')} >
    <div className="App" style={{ marginTop: "500px" }}>
            {currentAvatar && (
        <div>
          <h2>Current Avatar</h2>
          <img src={currentAvatar} alt="Current Avatar" style={{ maxWidth: "100%" }} />
        </div>
      )}
      <h1>Image Upload Tutorial</h1>
      <input type="file" accept=".jpg, .jpeg, .png, .gif" onChange={handleFileInput} />
      {previewImage && (
        <div>
          <h2>Preview</h2>
          <img src={previewImage} alt="Preview" style={{ maxWidth: "100%" }} />
          <button onClick={handleImageDelete} style={{ cursor: 'pointer', color: 'red' }}>
            &#10006; Delete Image
          </button>
        </div>
      )}
      
      <button onClick={handleImageUpload}>Upload!</button>
    </div>
    </StyledModal>
  );
}

export default ImageUpload;
