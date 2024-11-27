// ProtectedRoute.js

import React, { useContext, useState } from 'react';
import { AuthContext } from './AuthContext';
import LoginModal from './LoginModal';

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const { currentUser } = useContext(AuthContext);
  const [showLoginModal, setShowLoginModal] = useState(false);

  // If the user is not authenticated, show the login modal
  if (!currentUser) {
    return (
      <>
        <Component {...rest} />
        <LoginModal onClose={() => setShowLoginModal(false)} />
      </>
    );
  }

  // If the user is authenticated, render the component
  return <Component {...rest} />;
};

export default ProtectedRoute;
