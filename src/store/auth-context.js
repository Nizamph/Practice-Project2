import react,{ useState,useEffect } from "react";

const AuthContext = react.createContext({
    isLoggedIn: false,
    onLogout: () => {},//just for accessing with IDE nothing much
    onLogin: (email, password) => {} //just for accessing with IDE nothing much
})

export const AuthContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn')
    
        if(storedUserLoggedInInformation === '1') {
          setIsLoggedIn(true);
        }
      }, []);

    const logoutHandler = () => {
        localStorage.removeItem('isLoggedIn')
        setIsLoggedIn(false);
    }

    const loginHandler = () => {
        localStorage.setItem('isLoggedIn', '1')
        setIsLoggedIn(true)
    }
    return <AuthContext.Provider value={{
        isLoggedIn: isLoggedIn, 
        onLogout: logoutHandler, 
        onLogin: loginHandler}}
        >
            {props.children}
            </AuthContext.Provider>
}
export default AuthContext
