import React, { useState, useEffect, useReducer, useContext } from 'react'
import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../store/auth-context';
import Input from '../UI/Input/Input';
const emailReducer = (state, action) => {
  if(action.type === 'USER_INPUT') {
    return {value: action.val, isValid: action.val.includes('@') } 
  }
  if(action.type === 'INPUT_BLUR') {
    return {value: state.value, isValid: state.value.includes('@') }
  }
    return {value: '', isValid: false}
};

const passwordReducer = (state, action) => {
   if(action.type === 'INPUT_PASSWORD') {
    return {value: action.value, isValid: action.value.trim().length>6}
   }
   if(action.type === 'PASSWORD_BLUR') {
    return {value: state.value, isValid: state.value.trim().length>6}
   }

  return {value: '', isValid: false}
  }


const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [enteredCollegeName, setCollegeName] = useState('')
  const [collegeNameIsValid, setCollegeNameIsValid] = useState()
  const [formIsValid, setFormIsValid] = useState(false);
  
  const [emailState, dispatchEmail] =  useReducer(emailReducer,{value: '', isValid: null,})
  const [passwordState, dispatchPassword] = useReducer(passwordReducer,{value:'', isValid: null,})

  const authCtx = useContext(AuthContext)

  useEffect(() => {
    console.log("use effect running")//only run when this component function is executed initially and unmounted from the DOM(which menas deleted from the screen(once we logged in))

    return () => {
      console.log("cleaned upp")//this would run when this component is removed from the unmount from the DOM(which means once logged in is succcess)and
                                //also will run when this component render initially because we didnt mention anything as dependency
   }
  },[])

  const {isValid: emailIsValid } = emailState;
  const {isValid: passwordIsValid} = passwordState

  useEffect(() => {
   const identifier = setTimeout( () => {
      console.log('checking form validity')//this will run once we type anything on input field and chnange the state according to the below condtion 
                                          //Since we are using timeout over here we clean up function would collect all the unneccesary check after each 0.5
                                          //milli second and clear that time out and it will check only after we finish typing(or will take a break on typing)
                                          //and 'checking form validity' only run after we finsh typing because this will execute after every clean up function and we could say vise-versa
      setFormIsValid(
        emailIsValid && passwordIsValid && enteredCollegeName.trim().length > 0
      );
    },500)
    
    
   return () => {
    console.log('CLEANED UPP')
    clearTimeout(identifier)
   }

  }, [emailIsValid,passwordIsValid,enteredCollegeName])

  const emailChangeHandler = (event) => {
    dispatchEmail({type: 'USER_INPUT', val: event.target.value});

    // setFormIsValid(
    //   event.target.value.includes('@')&& passwordState.isValid && enteredCollegeName.trim().length > 0
    // );

  };

  const collegeNameChangeHandler = (event) => {
    setCollegeName(event.target.value);

    setFormIsValid(
      emailState.isValid && passwordState.isValid && event.target.value.trim().length > 0
    );
  }
  
  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    dispatchPassword({type:'INPUT_PASSWORD', value: event.target.value})

    // setFormIsValid(
    //   emailState.isValid && event.target.value.trim().length > 6 && enteredCollegeName
    // );
  };
  
  const validateEmailHandler = () => {
    dispatchEmail({type: 'INPUT_BLUR'});
  };

  const validateCollegeNameHandler=() => {
    setCollegeNameIsValid(enteredCollegeName.trim().length > 0)
  }
  const validatePasswordHandler = () => {
    // setPasswordIsValid(passwordState.isValid);
    dispatchPassword({type:'PASSWORD_BLUR'})
  };

  const submitHandler = (event) => {
    event.preventDefault();
    authCtx.onLogin(emailState.value, passwordState.value, enteredCollegeName);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
    
          <Input
            label="E-mail"
            htmlFor="email"
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        
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
        
        <Input
            label="Password"
            htmlFor="Password"
            type="Password"
            id="Password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
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
