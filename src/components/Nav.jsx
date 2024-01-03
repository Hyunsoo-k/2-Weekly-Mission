import styled from 'styled-components';
import logo from '../assets/logo.svg';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useAsync from '../hook/useAsync';


const NavContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: ${({ $position }) => ($position ? 'static' : 'fixed')};
  left: 0;
  top: 0;
  z-index: 10;
  width: 100%;
  height: 9.4rem;
  padding: 0 20rem;
  background-color: var(--bg);

  @media screen and (max-width: 1124px) {
    padding: 0 3.2rem;
  }

  @media screen and (min-width: 375px) and (max-width: 768px) {
    padding: 0 3.2rem;
    height: 6.3rem;
  }
`;

const Logo = styled.h1`
  display: block;
`;

const LogoImg = styled.img`
  @media screen and (min-width: 375px) and (max-width: 768px) {
    width: 8.8rem;
  }
`;

const Email = styled.div`
  a {
    display: flex;
    align-items: center;
    padding: 0 0 0 0.6rem;
    font-size: 1.4rem;
    line-height: 1.6rem;
    color: var(--gray100);
  }

  img {
    width: 2.8rem;
    height: 2.8rem;
    border-radius: 100%;
  }

  p {
    padding: 0 0 0 0.6rem;
    font-size: 1.4rem;
    line-height: 1.6rem;
    color: var(--gray100);

    @media screen and (min-width: 375px) and (max-width: 768px) {
      display: none;
    }
  }
`;

const Login = styled.div`
  span {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 12.8rem;
    height: 5.4rem;
    cursor: pointer;
    background-image: linear-gradient(135deg, #6d6afe 0%, #6ae3fe 100%);
    border-radius: 0.8rem;
    color: var(--gray-f5f5);
    font-size: 2.8rem;
    font-weight: 600;
  }

  @media screen and (min-width: 375px) and (max-width: 768px) {
    width: 8rem;
    height: 3.7rem;
    font-size: 2.4rem;
  }
`;

function Nav({ position }) {
  const [profileImg, setProfileImg] = useState(null);
  const [profileEmail, setProfileEmail] = useState('');

  const [getProfile] = useAsync('/users', '/1', '', '');

  const handleLoadProfile = async () => {
    const { data } = await getProfile();
    setProfileImg(data[0].image_source);
    setProfileEmail(data[0].email);
  };

  useEffect(() => {
    handleLoadProfile();
  }, []);

  return (
    <NavContainer $position={position}>
      <Logo>
        <Link to="/">
          <LogoImg src={logo} alt="홈으로 연결된 abrary 로고" />
        </Link>
      </Logo>
      <div>
        {profileEmail ? (
          <Email>
            <Link to="/">
              <img src={profileImg} alt="프로필 이미지" />
              <p>{profileEmail}</p>
            </Link>
          </Email>
        ) : (
          <Login>
            <Link to="/">
              <span>로그인</span>
            </Link>
          </Login>
        )}
      </div>
    </NavContainer>
  );
}

export default Nav;