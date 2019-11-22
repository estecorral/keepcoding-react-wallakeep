/* NPM modules */
import React from 'react';
import { Redirect, Route } from 'react-router-dom';
/* Material UI */
/* Own modules */
import { UserConsumer } from '../../context/UserContext';
/* Assets */
/* CSS */

/**
 * Main App
 */
export default function PrivateRoute(props) {
  return (
    <UserConsumer>
      {({ session }) => {
        if (!session.name) {
          return <Redirect to="/register" />;
        }
        return <Route {...props} />;
      }}
    </UserConsumer>
  );
}
