import { useRouter } from 'next/router'
import Link from 'next/link'

import { SignInButton } from '../SignInButton'
import Styles from './styles.module.scss'
import { ActiveLink } from '../ActiveLink'

export function Header() {
  const { asPath } = useRouter()

  return (
    <header className={Styles.headerContainer}>
      <div className={Styles.headerContent}>
        <img src="/images/logo.svg" alt="ig.news" />
        <nav>
          <ActiveLink activeClassName={Styles.active} href="/">
            <a>Home</a>
          </ActiveLink>

          <ActiveLink activeClassName={Styles.active} href="/posts">
            <a>Posts</a>
          </ActiveLink>
        </nav>
        <SignInButton />
      </div>
    </header>
  )
}