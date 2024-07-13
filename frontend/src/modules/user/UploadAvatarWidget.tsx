import React, {useEffect, useRef, useState} from 'react';

declare global {
  interface Window {
    cloudinary: any;
  }
}

interface UploadWidgetProps {
  onUploadComplete: (url: string) => void;
  avatarUrl: string;
}

const UploadAvatarWidget: React.FC<UploadWidgetProps> = ({
  onUploadComplete,
  avatarUrl
}: UploadWidgetProps) => {
  const cloudinaryWidget = useRef<any>();
  const widgetRef = useRef<any>();
  const [imageUrl, setImageUrl] = useState<string>('');
  const cloudName = import.meta.env.VITE_APP_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_APP_CLOUDINARY_UPLOAD_PRESET;

  useEffect(() => {
    cloudinaryWidget.current = window.cloudinary;
    widgetRef.current = cloudinaryWidget.current.createUploadWidget(
      {
        cloudName,
        uploadPreset,
        folders: 'swd392',
        sources: ['local', 'url', 'camera'],
        multiple: true,
        maxFiles: 1,
        resourceType: 'image'
      },
      function (error: any, result: any) {
        if (error) {
          console.error('Upload error:', error);
        } else if (result.event === 'success') {
          if (result.info.secure_url) {
            setImageUrl(() => {
              const newUrls = result.info.secure_url;
              onUploadComplete(newUrls);
              return newUrls;
            });
          }
        }
      }
    );
  }, [cloudinaryWidget, setImageUrl]);

  useEffect(() => {
    if (imageUrl.length) {
      onUploadComplete(imageUrl);
    }
  }, [imageUrl]);

  return (
    <div>
      <div
        className="upload-button d-flex flex-column align-items-center gap-1"
        onClick={() => widgetRef.current.open()}
      >
        <label htmlFor="upload-picture">
          {avatarUrl && (
            <img
              src={avatarUrl}
              alt="avatar"
              height={120}
              width={120}
              style={{objectFit: 'cover', borderRadius: '50%'}}
            />
          )}
          {!avatarUrl && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="110"
              height="110"
              fill="#1F7343"
              className="bi bi-person-circle"
              viewBox="0 0 16 16"
            >
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
              <path
                fillRule="evenodd"
                d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
              />
            </svg>
          )}
        </label>
      </div>
    </div>
  );
};

export default UploadAvatarWidget;
