import { Avatar, Typography } from '@material-ui/core';
import React from 'react';
import styles from './profile.module.css';

function Profile(props) {
  const { user } = props;

  return (
    <div className={styles.container}>
      <Avatar className={styles.avatar} src={user.avatarUrl} />
      <div className={styles.textContainer}>
        <div>
          <Typography variant='h4'>
            {user.name}
          </Typography>
          <Typography variant='body1'>
            {user.login}
          </Typography>
          <Typography variant='body2'>
            Member since {user.createdAt.split('T', 1)[0]}
          </Typography>
        </div>
      </div>
    </div>
  );
}

export default Profile;
