import { FormCheck, FormInput, FormLabel } from "@/components/Base/Form";
import Tippy from "@/components/Base/Tippy";
import users from "@/fakers/users";
import Button from "@/components/Base/Button";
import Alert from "@/components/Base/Alert";
import Lucide from "@/components/Base/Lucide";
import { useDispatch } from 'react-redux';
import clsx from "clsx";
import _ from "lodash";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { loginUser, setLoading } from '../../stores/userSlice';
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';
import { MouseEvent, SyntheticEvent, useState } from "react";
// import { sign } from "crypto";
import FinalLogo from "../../assets/images/final-logo.png"



function Main() {

//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = (e: SyntheticEvent) => {

//     e.preventDefault();
//     // setError(null);
//     signInWithEmailAndPassword(auth, email, password)
//       .then(() => {
//         const user = auth.currentUser;

//         if (user) {
         

//           navigate("/");
//         }
//       })
     
// .catch((error) => {
//     if (error.code === "auth/invalid-credential") {
//         Toastify({
//             text: "Invalid credentials. Please double-check your email and password.",
//             duration: 3000,
//             close: true,
//             gravity: "top", // `top` or `bottom`
//             position: "right", // `left`, `center` or `right`
//             backgroundColor: "#FF6F61",
//         }).showToast();
//     } else if (error.code === "auth/too-many-requests") {
//         Toastify({
//             text: "Too many requests. Try again later.",
//             duration: 3000,
//             close: true,
//             gravity: "top",
//             position: "right",
//             backgroundColor: "#FF6F61",
//         }).showToast();
//     } else if (error.code === "auth/network-request-failed") {
//         Toastify({
//             text: "Network error. Try again later.",
//             duration: 3000,
//             close: true,
//             gravity: "top",
//             position: "right",
//             backgroundColor: "#FF6F61",
//         }).showToast();
//     } else if (error.code === "auth/user-disabled") {
//         Toastify({
//             text: "User disabled. Please contact support.",
//             duration: 3000,
//             close: true,
//             gravity: "top",
//             position: "right",
//             backgroundColor: "#FF6F61",
//         }).showToast();
//     } else if (error.code === "auth/weak-password") {
//         Toastify({
//             text: "Password should be at least 6 characters.",
//             duration: 3000,
//             close: true,
//             gravity: "top",
//             position: "right",
//             backgroundColor: "#FF6F61",
//         }).showToast();
//     } else if (email === "" || password === "") {
//         Toastify({
//             text: "Please fill in all fields.",
//             duration: 3000,
//             close: true,
//             gravity: "top",
//             position: "right",
//             backgroundColor: "#FF6F61",
//         }).showToast();
//     } else {
//         Toastify({
//             text: "Login failed: " + error.message,
//             duration: 3000,
//             close: true,
//             gravity: "top",
//             position: "right",
//             backgroundColor: "#FF6F61",
//         }).showToast();
//     }

//     console.error("Login failed:", error.message);
// });

//   };


const navigate = useNavigate();
const dispatch = useDispatch();
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

const handleLogin = (e: SyntheticEvent) => {
  e.preventDefault();
  dispatch(setLoading(true));
  
  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      const user = auth.currentUser;
      if (user) {
        dispatch(
          loginUser({
            uid: user.uid,
            username: user.displayName,
            email: user.email,
          })
        );
        dispatch(setLoading(false));
        navigate('/');
      }
    })
    .catch((error) => {
      dispatch(setLoading(false));
      let errorMessage = '';
      
      switch (error.code) {
        case 'auth/invalid-credential':
          errorMessage = 'Invalid credentials. Please double-check your email and password.';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Too many requests. Try again later.';
          break;
        case 'auth/network-request-failed':
          errorMessage = 'Network error. Try again later.';
          break;
        case 'auth/user-disabled':
          errorMessage = 'User disabled. Please contact support.';
          break;
        case 'auth/weak-password':
          errorMessage = 'Password should be at least 6 characters.';
          break;
        default:
          if (email === '' || password === '') {
            errorMessage = 'Please fill in all fields.';
          } else {
            errorMessage = 'Login failed: ' + error.message;
          }
      }

      Toastify({
        text: errorMessage,
        duration: 3000,
        close: true,
        gravity: 'top',
        position: 'right',
        backgroundColor: '#FF6F61',
      }).showToast();

      console.error('Login failed:', error.message);
    });
};



  return (
    <>
      <div className="container grid lg:h-screen grid-cols-12 lg:max-w-[1550px] 2xl:max-w-[1750px] py-10 px-5 sm:py-14 sm:px-10 md:px-36 lg:py-0 lg:pl-14 lg:pr-12 xl:px-24">
        <div
          className={clsx([
            "relative z-50 h-full col-span-12 p-7 sm:p-14 bg-white rounded-2xl lg:bg-transparent lg:pr-10 lg:col-span-5 xl:pr-24 2xl:col-span-4 lg:p-0",
            "before:content-[''] before:absolute before:inset-0 before:-mb-3.5 before:bg-white/40 before:rounded-2xl before:mx-5",
          ])}
        >
          <div className="relative z-10 flex flex-col justify-center w-full h-full py-2 lg:py-32">
            <div className="rounded-[0.8rem] h-[155px] border border-primary/30 flex items-center justify-center">
              {/* <div className="relative flex items-center justify-center w-[50px] rounded-[0.6rem] h-[50px] bg-gradient-to-b from-theme-1/90 to-theme-2/90 bg-white">
                <div className="w-[26px] h-[26px] relative -rotate-45 [&_div]:bg-white">
                  <div className="absolute w-[20%] left-0 inset-y-0 my-auto rounded-full opacity-50 h-[75%]"></div>
                  <div className="absolute w-[20%] inset-0 m-auto h-[120%] rounded-full"></div>
                  <div className="absolute w-[20%] right-0 inset-y-0 my-auto rounded-full opacity-50 h-[75%]"></div>
                </div>
              </div> */}

              <img src={FinalLogo} alt="" />
            </div>
            <div className="mt-10">
              <div className="text-2xl font-medium">Sign In</div>
              <div className="mt-2.5 text-slate-600">
                Don't have an account?{" "}
                <Link to="/register">
                <p className="font-medium text-primary">
                  Sign Up
                </p>
                </Link>
              </div>
              <Alert
                variant="outline-primary"
                className="flex items-center px-4 py-3 my-7 bg-primary/5 border-primary/20 rounded-[0.6rem] leading-[1.7]"
              >
                {({ dismiss }) => (
                  <>
                    <div className="">
                      <Lucide
                        icon="Lightbulb"
                        className="stroke-[0.8] w-7 h-7 mr-2 fill-primary/10"
                      />
                    </div>
                    <div className="ml-1 mr-8">
                      Welcome to <span className="font-medium">ShivAi</span>{" "}
                      demo! Simply click{" "}
                      <span className="font-medium">Sign In</span> to explore
                      and access our documentation.
                    </div>
                    <Alert.DismissButton
                      type="button"
                      className="btn-close text-primary"
                      onClick={dismiss}
                      aria-label="Close"
                    >
                      <Lucide icon="X" className="w-5 h-5" />
                    </Alert.DismissButton>
                  </>
                )}
              </Alert>
              <div className="mt-6">
                <FormLabel>Email*</FormLabel>
                <FormInput
                  onChange={(e) => setEmail(e.target.value)}
                  type="text"
                  name="email"
                  className="block px-4 py-3.5 rounded-[0.6rem] border-slate-300/80"
                  placeholder={users.fakeUsers()[0].email}
                />
                <FormLabel className="mt-4">Password*</FormLabel>
                <FormInput
                 onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  className="block px-4 py-3.5 rounded-[0.6rem] border-slate-300/80"
                  placeholder="************"
                />
                <div className="flex mt-4 text-xs text-slate-500 sm:text-sm">
                  <div className="flex items-center mr-auto">
                    <FormCheck.Input
                      id="remember-me"
                      type="checkbox"
                      className="mr-2.5 border"
                    />
                    <label
                      className="cursor-pointer select-none"
                      htmlFor="remember-me"
                    >
                      Remember me
                    </label>
                  </div>
                  <Link to="/forgot-password">
                  <p>Forgot Password?</p>
                  </Link>
                </div>
                <div className="mt-5 text-center xl:mt-8 xl:text-left">
                  <Button
                    variant="primary"
                    rounded
                    className="bg-gradient-to-r from-theme-1/70 to-theme-2/70 w-full py-3.5 xl:mr-3"
                    onClick={(e: MouseEvent<HTMLButtonElement>) => handleLogin(e)}
                  >
                    Sign In
                  </Button>

                  {/* <Link to="/register">
                  <Button
                    variant="outline-secondary"
                    rounded
                    className="bg-white/70 w-full py-3.5 mt-3"
                  
                  >
                    Sign Up
                  </Button>
                  </Link> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed container grid w-screen inset-0 h-screen grid-cols-12 lg:max-w-[1550px] 2xl:max-w-[1750px] pl-14 pr-12 xl:px-24">
        <div
          className={clsx([
            "relative h-screen col-span-12 lg:col-span-5 2xl:col-span-4 z-20",
            "after:bg-white after:hidden after:lg:block after:content-[''] after:absolute after:right-0 after:inset-y-0 after:bg-gradient-to-b after:from-white after:to-slate-100/80 after:w-[800%] after:rounded-[0_1.2rem_1.2rem_0/0_1.7rem_1.7rem_0]",
            "before:content-[''] before:hidden before:lg:block before:absolute before:right-0 before:inset-y-0 before:my-6 before:bg-gradient-to-b before:from-white/10 before:to-slate-50/10 before:bg-white/50 before:w-[800%] before:-mr-4 before:rounded-[0_1.2rem_1.2rem_0/0_1.7rem_1.7rem_0]",
          ])}
        ></div>
        <div
          className={clsx([
            "h-full col-span-7 2xl:col-span-8 lg:relative",
            "before:content-[''] before:absolute before:lg:-ml-10 before:left-0 before:inset-y-0 before:bg-gradient-to-b before:from-theme-1 before:to-theme-2 before:w-screen before:lg:w-[800%]",
            "after:content-[''] after:absolute after:inset-y-0 after:left-0 after:w-screen after:lg:w-[800%] after:bg-texture-white after:bg-fixed after:bg-center after:lg:bg-[25rem_-25rem] after:bg-no-repeat",
          ])}
        >
          <div className="sticky top-0 z-10 flex-col justify-center hidden h-screen ml-16 lg:flex xl:ml-28 2xl:ml-36">
            <div className="leading-[1.4] text-[2.6rem] xl:text-5xl font-medium xl:leading-[1.2] text-white">
              Embrace Excellence <br /> in Dashboard Development
            </div>
            <div className="mt-5 text-base leading-relaxed xl:text-lg text-white/70">
              Unlock the potential of ShivAi, where developers craft
              meticulously structured, visually stunning dashboards with
              feature-rich modules. Join us today to shape the future of your
              application development.
            </div>
            <div className="flex flex-col gap-3 mt-10 xl:items-center xl:flex-row">
              <div className="flex items-center">
                <div className="w-9 h-9 2xl:w-11 2xl:h-11 image-fit zoom-in">
                  <Tippy
                    as="img"
                    alt="Tailwise - Admin Dashboard Template"
                    className="rounded-full border-[3px] border-white/50"
                    src={users.fakeUsers()[0].photo}
                    content={users.fakeUsers()[0].name}
                  />
                </div>
                <div className="-ml-3 w-9 h-9 2xl:w-11 2xl:h-11 image-fit zoom-in">
                  <Tippy
                    as="img"
                    alt="Tailwise - Admin Dashboard Template"
                    className="rounded-full border-[3px] border-white/50"
                    src={users.fakeUsers()[0].photo}
                    content={users.fakeUsers()[0].name}
                  />
                </div>
                <div className="-ml-3 w-9 h-9 2xl:w-11 2xl:h-11 image-fit zoom-in">
                  <Tippy
                    as="img"
                    alt="Tailwise - Admin Dashboard Template"
                    className="rounded-full border-[3px] border-white/50"
                    src={users.fakeUsers()[0].photo}
                    content={users.fakeUsers()[0].name}
                  />
                </div>
                <div className="-ml-3 w-9 h-9 2xl:w-11 2xl:h-11 image-fit zoom-in">
                  <Tippy
                    as="img"
                    alt="Tailwise - Admin Dashboard Template"
                    className="rounded-full border-[3px] border-white/50"
                    src={users.fakeUsers()[0].photo}
                    content={users.fakeUsers()[0].name}
                  />
                </div>
              </div>
              <div className="text-base xl:ml-2 2xl:ml-3 text-white/70">
                Over 7k+ strong and growing! Your journey begins here.
              </div>
            </div>
          </div>
        </div>
      </div>
      <ThemeSwitcher />
    </>
  );
}

export default Main;
