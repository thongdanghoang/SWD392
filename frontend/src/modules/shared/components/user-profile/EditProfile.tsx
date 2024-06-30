import {UserDto} from '../../models/userDto';
import './EditProfile.scss';
import {ReactElement} from 'react';

export default function EditProfile({
  currentUser
}: {
  currentUser: UserDto | null;
}): ReactElement {
  return (
    <div className="container edit-profile">
      <div className="box d-flex flex-column gap-5">
        <div className="d-flex">
          <div className="bold-32 text-color-quaternary">Email:</div>
          <div className="semibold-20 text-color-tertiary">
            {currentUser?.email}
          </div>
        </div>
        <div className="text-color-quaternary">
          First Name: {currentUser?.firstName}
        </div>
        <div className="text-color-quaternary">
          Last Name: {currentUser?.lastName}
        </div>
        <div className="text-color-quaternary">Phone: {currentUser?.phone}</div>
      </div>
    </div>
  );
}
