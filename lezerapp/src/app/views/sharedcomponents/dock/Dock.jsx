/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { memo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LockIcon from '@material-ui/icons/Lock';
import { GoogleLogout } from 'react-google-login';
import { useDispatch } from 'react-redux';
import { setSelectedTags } from '../../../../store/tagSlice';
import { closeWebSocket, openWebSocket } from '../../../../utils/websocketCommunication';

const Dock = ({ profilePicture }) => {
  const dispatch = useDispatch();
  const onLogout = () => {
    closeWebSocket();
    localStorage.clear();
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  useEffect(() => {
    openWebSocket();
  }, [profilePicture]);

  const clickHandler = () => {
    dispatch(setSelectedTags([]));
  };

  return (
    <section id="dock" className="flex flex-col justify-between min-h-screen md:sticky md:top-0">
      <div className="w-full text-center pt-4">
        <Link to="/app" onClick={clickHandler}>
          <img className="m-auto w-16" alt="logo" src="/logo512.png" />
        </Link>
      </div>

      <div className="pb-8">
        <GoogleLogout
          clientId="366910807736-j7einmtbo7udt56fvfs9hdmvsc1puv5u.apps.googleusercontent.com"
          buttonText="Logout"
          onLogoutSuccess={onLogout}
          onFailure={onLogout}
          render={({ onClick, disabled }) => (
            <button onClick={onClick} disabled={disabled} type="button" className="focus:outline-none text-center w-full mb-4"><LockIcon /></button>
          )}
        />
        <img className="m-auto rounded-full w-16" alt="profilePicture" src={`${profilePicture || 'https://cdn.discordapp.com/attachments/775300546122612767/781448294924025856/unknown.png'} `} />
      </div>
    </section>
  );
};

export default memo(Dock, (prevProps, nextProps) => prevProps === nextProps);
