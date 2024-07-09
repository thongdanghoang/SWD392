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
        <div className="mb-1 semibold-16 text-color-quaternary">{title}</div>
        <div className="text-color-tertiary regular-12">{time}</div>
      </div>
      <div className="mb-1 regular-14 text-color-tertiary">{content}</div>
      <div className="regular-12 text-color-quaternary">
        Nhấn để xem chi tiết giao dịch.
      </div>
    </div>
  );
};

export default NotificationItem;
