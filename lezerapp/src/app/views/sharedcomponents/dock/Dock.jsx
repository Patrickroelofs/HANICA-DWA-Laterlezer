/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import LockIcon from '@material-ui/icons/Lock';
import { GoogleLogout } from 'react-google-login';
import { selectProfilePicture } from '../../../../store/userSlice';

function Dock() {
  const profilePicture = useSelector(selectProfilePicture);

  const onLogout = () => {
    localStorage.clear();
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  return (
    <section id="dock" className="flex flex-col justify-between min-h-screen md:sticky md:top-0">
      <div className="w-full text-center pt-4">
        <Link to="/app">
          <img className="m-auto w-16" alt="" src="/logo512.png" />
        </Link>
      </div>

      <div className="pb-8">
        <GoogleLogout
          clientId="366910807736-j7einmtbo7udt56fvfs9hdmvsc1puv5u.apps.googleusercontent.com"
          buttonText="Logout"
          onLogoutSuccess={onLogout}
          onFailure={onLogout}
          render={(renderProps) => (
            <button onClick={renderProps.onClick} disabled={renderProps.disabled} type="button" id="logout" className="text-center w-full mb-4"><LockIcon /></button>
          )}
        />
        <img className="m-auto rounded-full w-16" alt="" src={`${profilePicture || 'https://cdn.discordapp.com/attachments/775300546122612767/781448294924025856/unknown.png'} `} />
      </div>
    </section>
  );
}

export default Dock;
