import React, { useState,useEffect } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const Login = (props) => {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [emailIsValid, setEmailIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [enteredCollegeName, setCollegeName] = useState('')
  const [collegeNameIsValid, setCollegeNameIsValid] = useState()
  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {
    console.log("use effect running")//only run when this component function is executed initially and unmounted from the DOM(which menas deleted from the screen(once we logged in))

    return () => {
      console.log("cleaned upp")//this would run when this component is removed from the unmount from the DOM(which means once logged in is succcess)and
                                //also will run when this component render initially because we didnt mention anything as dependency
   }
  },[])

  useEffect(() => {
   const identifier = setTimeout( () => {
      console.log('checking form validity')//this will run once we type anything on input field and chnange the state according to the below condtion 
                                          //Since we are using timeout over here we clean up function would collect all the unneccesary check after each 0.5
                                          //milli second and clear that time out and it will check only after we finish typing(or will take a break on typing)
                                          //and 'checking form validity' only run after we finsh typing because this will execute after every clean up function and we could say vise-versa
      setFormIsValid(
        enteredEmail.includes('@') && enteredPassword.trim().length > 6 && enteredCollegeName.trim().length > 0
      );
    },500)
    
    
   return () => {
    console.log('CLEANED UPP')
    clearTimeout(identifier)
   }

  }, [enteredEmail,enteredPassword,enteredCollegeName])

  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);

  };

  const collegeNameChangeHandler = (event) => {
    setCollegeName(event.target.value);
  }
  
  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
  };
  
  const validateEmailHandler = () => {
    setEmailIsValid(enteredEmail.includes('@'));
  };

  const validateCollegeNameHandler=() => {
    setCollegeNameIsValid(enteredCollegeName.trim().length > 0)
  }
  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(enteredEmail, enteredPassword, enteredCollegeName);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={enteredEmail}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div className={`${classes.control} ${
          collegeNameIsValid === false ? classes.invalid : ''}`}>
          <label htmlFor="collegeName">College Name</label>
          <input
            type="collegeName"
            id="collegeName"
            value={enteredCollegeName}
            onChange={collegeNameChangeHandler}
            onBlur={validateCollegeNameHandler}
          />
          </div>
        <div
          className={`${classes.control} ${
            passwordIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
