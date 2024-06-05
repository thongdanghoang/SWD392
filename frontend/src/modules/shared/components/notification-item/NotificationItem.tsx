import React from 'react';

interface NotificationItemProps {
  title: string;
  time: string;
  content: string;
  onClickFn: () => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  title,
  time,
  content,
  onClickFn
}) => {
  return (
    <div
      className="list-group-item list-group-item-action clickable"
      onClick={onClickFn}
    >
      <div className="d-flex w-100 justify-content-between">
        <h5 className="mb-1">{title}</h5>
        <small className="text-body-secondary">{time}</small>
      </div>
      <p className="mb-1">{content}</p>
      <small className="text-body-secondary">Xem chi tiết giao dịch.</small>
    </div>
  );
};

export default NotificationItem;
