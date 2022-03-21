export default function SignUp() {
  return (
    <>
        <form action="/api/user" method="POST">
            <label for="uname">Username:</label>
            <input name="uname" type="text" placeholder="Enter Username" required></input>

            <label for="pwd">Password:</label>
            <input name="pwd" type="password" placeholder="Enter Password" required></input>

            <label for="email">Email:</label>
            <input name="email" type="email" placeholder="Enter Email" required></input>

            <button type="submit">Login</button>
        </form>
    </>
  )
}