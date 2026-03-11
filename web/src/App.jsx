import './App.css'
import { Show, SignInButton, SignUpButton, UserButton } from '@clerk/react'


function App() {
  return (
    <>
      <h1>hello, i am running ok!</h1>
      <header>
        <Show when="signed-out">
          <SignInButton />
          <SignUpButton />
        </Show>
        <Show when="signed-in">
          <UserButton />
        </Show>
      </header>
    </>
  )
}

export default App