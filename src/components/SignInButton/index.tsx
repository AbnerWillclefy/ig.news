import { FaGithub } from 'react-icons/fa'
import {FiX} from 'react-icons/fi'
import { signIn, signOut, useSession } from 'next-auth/client'

import Styles from './styles.module.scss'

export function SignInButton() {
  const [ session ] = useSession()

  console.log(session)

  return session ? (
    <button 
      type='button'
      className={Styles.signInButton}
      onClick={() => signOut()}>
      <FaGithub color="#04d361" />
      {session.user.name}
      <FiX color="#737380" className={Styles.closeIcon} />
    </button>
  ) : (
    <button 
      type='button'
      className={Styles.signInButton}
      onClick={() => signIn('github')}>
      <FaGithub color="#eba417" />
      Sign in with Github
    </button>
  )
}