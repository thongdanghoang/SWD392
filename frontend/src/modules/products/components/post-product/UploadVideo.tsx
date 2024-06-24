import {useEffect, useRef, useState} from 'react';

declare global {
  interface Window {
    cloudinary: any;
  }
}
interface UploadWidgetVideoProps {
  onUploadVideoComplete: (urls: string) => void;
}

const UploadWidgetVideo: React.FC<UploadWidgetVideoProps> = ({
  onUploadVideoComplete
}: {
  onUploadVideoComplete: (urls: string) => void;
}) => {
  const cloudinaryWidget = useRef<any>();
  const widgetRef = useRef<any>();
  const [videoUrl, setVideoUrl] = useState('');
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
        resourceType: 'video'
      },
      function (error: any, result: any) {
        if (error) {
          console.error('Upload error:', error);
        } else if (result.event === 'success') {
          if (result.info.secure_url) {
            setVideoUrl(() => {
              const newUrl = result.info.secure_url;
              onUploadVideoComplete(newUrl);
              return newUrl;
            });
          }
        }
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cloudinaryWidget, setVideoUrl]);

  useEffect(() => {
    if (videoUrl.length) {
      onUploadVideoComplete(videoUrl);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoUrl]);

  return (
    <div>
      <div
        className="upload-button d-flex flex-column align-items-center gap-2"
        onClick={() => widgetRef.current.open()}
      >
        <label htmlFor="upload-videos">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="88"
            height="63"
            viewBox="0 0 88 63"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M53.3789 0H15.8789C11.7349 0 7.76062 1.6462 4.83036 4.57646C1.90011 7.50671 0.253906 11.481 0.253906 15.625V46.875C0.253906 51.019 1.90011 54.9933 4.83036 57.9235C7.76062 60.8538 11.7349 62.5 15.8789 62.5H53.3789C57.5229 62.5 61.4972 60.8538 64.4275 57.9235C67.3577 54.9933 69.0039 51.019 69.0039 46.875V15.625C69.0039 11.481 67.3577 7.50671 64.4275 4.57646C61.4972 1.6462 57.5229 0 53.3789 0ZM6.50391 15.625C6.50391 13.1386 7.49163 10.754 9.24978 8.99587C11.0079 7.23772 13.3925 6.25 15.8789 6.25H53.3789C55.8653 6.25 58.2499 7.23772 60.008 8.99587C61.7662 10.754 62.7539 13.1386 62.7539 15.625V46.875C62.7539 49.3614 61.7662 51.746 60.008 53.5041C58.2499 55.2623 55.8653 56.25 53.3789 56.25H15.8789C13.3925 56.25 11.0079 55.2623 9.24978 53.5041C7.49163 51.746 6.50391 49.3614 6.50391 46.875V15.625Z"
              fill="#C5EED7"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M82.9291 6.75003L64.3166 18.8563C63.8842 19.1366 63.5277 19.5196 63.2791 19.971C63.0305 20.4225 62.8974 20.9284 62.8916 21.4438L62.7229 37.7688C62.7165 38.2952 62.8432 38.8147 63.0912 39.2791C63.3392 39.7434 63.7006 40.1376 64.1416 40.425L82.9166 52.625C83.3882 52.9324 83.9341 53.1066 84.4966 53.1294C85.059 53.1522 85.6172 53.0226 86.1121 52.7543C86.607 52.4861 87.0202 52.0891 87.3081 51.6054C87.5961 51.1217 87.748 50.5692 87.7479 50.0063V9.37503C87.7491 8.81158 87.598 8.25828 87.3105 7.77369C87.0231 7.28909 86.6099 6.89124 86.1148 6.62224C85.6197 6.35324 85.0611 6.2231 84.4981 6.2456C83.9351 6.26809 83.3887 6.44238 82.9166 6.75003M81.5041 44.25L68.9979 36.1188L69.1291 23.1813L81.5041 15.1375V44.25Z"
              fill="#C5EED7"
            />
          </svg>
        </label>
        <div className="regular-14 text-color-secondary">
          Đăng tối đa 1 video
        </div>
      </div>
    </div>
  );
};

export default UploadWidgetVideo;
