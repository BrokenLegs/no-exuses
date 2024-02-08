// AuthContext.js
import { createContext } from "react";

const AuthContext = createContext({
    userId: 0,
    // jwt: {
    accessToken: null,
    // },
});

export default AuthContext;
