import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { withAuth } from '../../Context/AuthContext';

function AnonRoute({ component: Comp, isLoggedin, ...rest }) {
  console.log(isLoggedin);
  return (
    <Route
      {...rest}
      render={props =>
        !isLoggedin ? (
          <Comp {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/map',
            }}
          />
        )
      }
    />
  );
}

export default withAuth(AnonRoute);
