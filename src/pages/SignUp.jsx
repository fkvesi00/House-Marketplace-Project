import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {ReactComponent as ArrowRightIcon} from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'


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
 
  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">Welcome, Sign up</p>
        </header>

        <form>
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