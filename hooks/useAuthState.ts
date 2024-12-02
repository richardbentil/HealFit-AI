import { onAuthStateChanged, User } from "firebase/auth";
import { useState, useEffect } from "react";
import { auth } from "../utils/firebaseConfig";

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null); // Explicitly typing the user state
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { user, loading };
};

export default useAuth;