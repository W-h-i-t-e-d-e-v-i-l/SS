import { AnimatePresence } from "framer-motion";

import { useAuth } from "./AuthContext";
import Login from "./Login";
import Signup from "./Signup";

export default function AuthModal() {
  const {
    showLogin,
    showSignup,
  } = useAuth();

  return (
    <AnimatePresence mode="wait">
      {showLogin && <Login key="login" />}

      {showSignup && <Signup key="signup" />}
    </AnimatePresence>
  );
}