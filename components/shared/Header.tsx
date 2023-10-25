import React, { FC } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { signOut, useSession } from "next-auth/react"
import { selectUser } from "../../redux/slices/auth"
import { store } from "../../redux/store"
import styled from "styled-components"
import { BsCheck, BsX } from "react-icons/bs"

const Header: FC = () => {
  const router = useRouter()
  const isActive: (pathname: string) => boolean = pathname => router.pathname === pathname
  const user = selectUser(store.getState())

  const { data: session, status } = useSession()

  return (
    <nav className="main-nav">
      <div className="btn-group">
        <Link href="/type-game" className="nav-item" data-active={isActive("/")}>
          Type Game
        </Link>
        {session && (
          <Link href="/bookings" className="nav-item" data-active={isActive("/drafts")}>
            bookings
          </Link>
        )}
      </div>
      <div className="btn-group nav-end">
        {status === "loading" && <p>Validating session ...</p>}
        {session && status !== "loading" ? (
          <AuthedContainer>
            <User>
              <UserName>
                {user.name}
                {user.emailVerified ? <BsCheck /> : <BsX />}
              </UserName>
              <UserRole>{user.role}</UserRole>
              <UserImage src={user.image} alt={user.name} />
            </User>
            <Link href="/create" className="btn btn--primary">
              Create Class
            </Link>
            <button className="btn" onClick={() => signOut()}>
              Log out
            </button>
          </AuthedContainer>
        ) : (
          <>
            <Link
              href="/api/auth/signin"
              className="btn btn--primary"
              data-active={isActive("/signup")}
            >
              Log in
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default Header

const AuthedContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`

const User = styled.div`
  display: grid;
  --avatar-size: 3rem;
  grid-template-columns: auto var(--avatar-size);
  grid-template-rows: auto auto;
  gap: 0.5rem;
  align-items: center;

  grid-template-areas: "name image" "role image";
`

const UserName = styled.span`
  font-weight: 900;
  grid-area: name;
`

const UserRole = styled.span`
  font-weight: 500;
  grid-area: role;
`

const UserImage = styled.img`
  width: var(--avatar-size);
  height: var(--avatar-size);
  border-radius: 50%;
  margin-left: 0.5rem;
  grid-area: image;
`
