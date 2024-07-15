import {useEffect, useRef, useState} from 'react';

declare global {
  interface Window {
    cloudinary: any;
  }
}

interface UploadWidgetProps {
  onUploadComplete: (urls: string[]) => void;
  urls?: string[];
}

const UploadWidget: React.FC<UploadWidgetProps> = ({
  onUploadComplete,
  urls
}: {
  onUploadComplete: (urls: string[]) => void;
  urls?: string[];
}) => {
  const cloudinaryWidget = useRef<any>();
  const widgetRef = useRef<any>();
  const [imageUrls, setImageUrls] = useState<string[]>(urls ?? []);
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
        maxFiles: 5,
        resourceType: 'image'
      },
      function (error: any, result: any) {
        if (error) {
          console.error('Upload error:', error);
        } else if (result.event === 'success') {
          if (result.info.secure_url) {
            setImageUrls(prevUrls => {
              const newUrls = [...prevUrls, result.info.secure_url];
              if (newUrls.length > 5) {
                alert('Chỉ được tải lên tối đa 5 hình ảnh');
                return prevUrls;
              }
              onUploadComplete(newUrls);
              return newUrls;
            });
          }
        }
      }
    );
  }, [cloudinaryWidget, setImageUrls]);

  useEffect(() => {
    if (imageUrls.length) {
      onUploadComplete(imageUrls);
    }
  }, [imageUrls]);
  if (imageUrls.length > 0) {
    // Hiển thị biểu tượng dấu cộng để thêm ảnh mới
    return (
      <div className="add-more-images d-flex justify-content-center align-items-center">
        <div
          className="add-image-button d-flex flex-column align-items-center gap-1"
          onClick={() => widgetRef.current.open()} // Giả sử widgetRef là ref tới widget upload ảnh
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            className="bi bi-plus-circle"
            viewBox="0 0 16 16"
          >
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
          </svg>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="upload-images d-flex justify-content-center align-items-center">
        <div className="row">
          <div
            className="upload-button d-flex flex-column align-items-center gap-1"
            onClick={() => widgetRef.current.open()}
          >
            <label htmlFor="upload-picture">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="99"
                height="98"
                viewBox="0 0 99 98"
                fill="none"
              >
                <g clipPath="url(#clip0_3963_59332)">
                  <path
                    d="M87.612 21.7778H67.7398L64.8542 14.3733C64.4594 13.3501 63.7648 12.47 62.8613 11.8483C61.9578 11.2265 60.8876 10.8921 59.7909 10.8889H39.2109C38.1095 10.8866 37.0333 11.2185 36.1245 11.8406C35.2156 12.4627 34.5168 13.3458 34.1203 14.3733L31.262 21.7778H11.3898C9.9458 21.7778 8.56098 22.3514 7.53995 23.3724C6.51892 24.3935 5.94531 25.7783 5.94531 27.2222V81.6667C5.94531 83.1106 6.51892 84.4954 7.53995 85.5165C8.56098 86.5375 9.9458 87.1111 11.3898 87.1111H87.612C89.0559 87.1111 90.4408 86.5375 91.4618 85.5165C92.4828 84.4954 93.0564 83.1106 93.0564 81.6667V27.2222C93.0564 25.7783 92.4828 24.3935 91.4618 23.3724C90.4408 22.3514 89.0559 21.7778 87.612 21.7778ZM87.612 81.6667H11.3898V27.2222H34.9914L39.2109 16.3333H59.7909L64.0103 27.2222H87.612V81.6667Z"
                    fill="#C5EED7"
                  />
                  <path
                    d="M25 51.7222C25 56.5679 26.4369 61.3047 29.129 65.3337C31.8211 69.3627 35.6475 72.5029 40.1243 74.3573C44.601 76.2116 49.5272 76.6968 54.2797 75.7515C59.0322 74.8061 63.3977 72.4727 66.8241 69.0463C70.2505 65.62 72.5839 61.2545 73.5292 56.5019C74.4746 51.7494 73.9894 46.8233 72.135 42.3465C70.2807 37.8697 67.1405 34.0433 63.1115 31.3512C59.0825 28.6591 54.3456 27.2222 49.5 27.2222C43.0022 27.2222 36.7705 29.8035 32.1759 34.3981C27.5812 38.9928 25 45.2244 25 51.7222ZM69.6444 51.7222C69.6444 55.7064 68.463 59.6011 66.2495 62.9139C64.036 66.2266 60.8899 68.8086 57.2089 70.3333C53.528 71.858 49.4777 72.2569 45.57 71.4796C41.6624 70.7023 38.073 68.7837 35.2557 65.9665C32.4385 63.1493 30.5199 59.5599 29.7426 55.6522C28.9653 51.7446 29.3643 47.6942 30.889 44.0133C32.4136 40.3324 34.9956 37.1862 38.3083 34.9727C41.6211 32.7592 45.5158 31.5778 49.5 31.5778C54.8404 31.585 59.9601 33.7097 63.7363 37.4859C67.5126 41.2622 69.6372 46.3818 69.6444 51.7222Z"
                    fill="#C5EED7"
                  />
                  <path
                    d="M26.008 34.9261C26.008 34.3485 25.7786 33.7946 25.3702 33.3862C24.9618 32.9778 24.4078 32.7483 23.8303 32.7483H17.2969C16.7193 32.7483 16.1654 32.9778 15.757 33.3862C15.3486 33.7946 15.1191 34.3485 15.1191 34.9261C15.1191 35.5037 15.3486 36.0576 15.757 36.466C16.1654 36.8744 16.7193 37.1039 17.2969 37.1039H23.8303C24.4078 37.1039 24.9618 36.8744 25.3702 36.466C25.7786 36.0576 26.008 35.5037 26.008 34.9261Z"
                    fill="#C5EED7"
                  />
                  <path
                    d="M34.0922 51.7222C34.1228 54.5933 34.968 57.3966 36.5294 59.8062C38.0907 62.2157 40.3042 64.1324 42.9122 65.3333L45.2261 61.6039C43.6673 61.0819 42.2469 60.2137 41.0715 59.0645C39.8961 57.9152 38.9962 56.5148 38.4392 54.9682C37.8822 53.4216 37.6826 51.7689 37.8554 50.1341C38.0282 48.4994 38.5688 46.9249 39.4369 45.5289C40.3049 44.1329 41.4777 42.9516 42.8674 42.0735C44.2571 41.1953 45.8275 40.6433 47.461 40.4586C49.0945 40.274 50.7485 40.4616 52.2992 41.0074C53.8498 41.5532 55.2567 42.443 56.4144 43.61L58.7555 39.8533C56.5269 38.0477 53.8312 36.9125 50.9823 36.5799C48.1333 36.2474 45.2486 36.7312 42.664 37.9749C40.0795 39.2187 37.9015 41.1713 36.3839 43.6052C34.8663 46.0391 34.0716 48.8541 34.0922 51.7222Z"
                    fill="#C5EED7"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_3963_59332">
                    <rect
                      width="98"
                      height="98"
                      fill="white"
                      transform="translate(0.5)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </label>
            <div className="regular-14 text-color-secondary">
              Đăng tối đa 5 hình ảnh
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadWidget;
