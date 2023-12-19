import '../assets/styles/Styles.css';

function SignUp(){

return(
    <>
        <div id='header-signup'>
            <div id="got-account">
                <h4>Already got an account?</h4><a href="/sign-up">Sign in!</a>
            </div>
        </div>
        
        <div id="sign-up">
            
            <div id="title-sup">
                <h1>Sign Up </h1>
                <h4>It's quick and easy!</h4>
            </div>
            

            <form>
                <div class="form-group">
                    <label for="fusername">Username</label>
                    <input type="text" id="fusername" name="fusername" />
                </div>
            
                <div class="form-group">
                    <label for="email">Email address</label>
                    <input type="email" id="email" name="email" />
                </div>
                <div class="form-group">
                    <label for="lpassword">Password</label>
                    <input type="password" id="lpassword" name="lpassword" />
                </div>
                <div class="form-group">
                    <label for="lcpassword">Confirm password</label>
                    <input type="password" id="lcpassword" name="lcpassword" />
                </div>

                <input type="submit" value="Create account" />
            </form>

        </div>
    
    
    </>
    
);
}

export default SignUp;