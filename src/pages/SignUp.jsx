import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {ReactComponent as ArrowRightIcon} from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { db } from '../firebase.config'
import { doc, setDoc, serverTimestamp } from "firebase/firestore"; 

function SignUp() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name:'',
    email:'',
    password:''
  })

  const {name, email, password} = formData
  
  const navigate = useNavigate()

  const onChange = (e) => {
   setFormData(prevState => ({
    ...prevState,
    [e.target.id] : e.target.value
   })) 
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    
    try {
      const auth = getAuth()
      console.log(auth)
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      console.log(userCredential)
      const user = userCredential.user
      console.log(user)
      updateProfile(auth.currentUser, {
        displayName:name,
      })
      
      const formDataCopy = {...formData}
      delete formDataCopy.password
      formDataCopy.timestamp = serverTimestamp()

      await setDoc(doc(db, 'users', user.uid), formDataCopy)

      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }
 
  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">Welcome, Sign up</p>
        </header>

        <form onSubmit={onSubmit}>
        <input 
          type="text" 
          className="nameInput" 
          placeholder="name" 
          id='name'
          value={name}
          onChange={onChange}
          />

          <input 
          type="email" 
          className="emailInput" 
          placeholder="Email" 
          id='email'
          value={email}
          onChange={onChange}
          />

          <div className="passwordInputDiv">
            <input 
              type={showPassword ? 'text' : 'password'} 
              className="passwordInput"
              placeholder="password"
              id='password'
              value={password}
              onChange={onChange}
            />

            <img 
              src={visibilityIcon} 
              alt="show password"
              className="showPassword"
              onClick={() => setShowPassword(prevState => !prevState)}
            />
          </div>


          <div className="signUpBar">
            <div className="signUpText">
              Sign up
            </div>
            <button className="signUpButton">
              <ArrowRightIcon fill='#ffffff' width='34px' height='34px' />
            </button>
          </div>
        </form>

        {/* Google 0Auth */}

        <Link to='/sign-in' className="registerLink">
          Sign in insted
        </Link>
      </div>
    </>
  )
}

export default SignUp