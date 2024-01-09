import styled from "styled-components";
import close from "../../images/close.svg";
import kakaoLogo from "../../images/kakaoLogo.svg";
import facebookLogo from "../../images/facebookLogo.svg";
import linkCopy from "../../images/linkCopy.svg";
import { Link } from "react-router-dom";
import { useContext, useRef } from "react";
import ButtonIdContext from "../context/ButtonIdContext";

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  box-shadow: 0px 4px 25px 0px rgba(0, 0, 0, 0.08);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  overflow: hidden;
`;
const ShareModalContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 360px;
  height: 239px;
  flex-shrink: 0;
  background: var(--white);

  border-radius: 15px;
  border: 1px solid var(--gray20);
  background: var(--white);

  overflow: hidden;
`;

const CloseButton = styled.button`
  background: inherit;
  position: absolute;
  top: 1.6rem;
  right: 1.6rem;
`;

const Span = styled.div`
  color: var(--gray100);
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-bottom: 8px;
`;

const StyledLink = styled(Link)`
  display: flex;
  padding: 12px;
  justify-content: center;
  align-items: center;
  gap: 10px;

  border-radius: 37.333px;
  background: ${({ $bgColor }) => ($bgColor === "Y" ? "#FEE500" : "#1877F2")};
  img {
    width: 18px;
    height: 18px;
  }
`;

const StyledButton = styled.button`
  display: flex;
  padding: 12px;
  justify-content: center;
  align-items: center;
  gap: 10px;

  border-radius: 37.333px;
  background: rgba(157, 157, 157, 0.04);
`;
const LinkContainer = styled.div`
  display: flex;
  gap: 32px;
  span {
    color: var(--gray100);
    text-align: center;
    font-family: Inter;
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: 15px; /* 115.385% */
  }
`;
const Links = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
  img {
    width: 18px;
    height: 18px;
  }
`;
const Title = styled.span`
  color: var(--gray60);
  text-align: center;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px;
  margin-bottom: 25px;
`;

function ShareModal({ setModalOpen }) {
  const { selectedButtonTitle } = useContext(ButtonIdContext);
  const modalRef = useRef(null);
  const modalClose = (e) => {
    if (modalRef.current === e.target) {
      setModalOpen({});
    }
  };

  //TODO 테스트 코드
  const userId = "kymgok1001";
  const currentFolderId = 1;
  const currentURL = window.location.href;
  const shareURL = `${currentURL}/shared?user=${userId}&folder=${currentFolderId}`;

  const handleCopyClipBoard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("클립보드에 링크가 복사되었어요.");
    } catch (e) {
      console.error("[LINK COPY ERROR]", e);
    }
  };

  return (
    <>
      <ModalContainer ref={modalRef} onClick={modalClose}>
        <ShareModalContainer>
          <Span>폴더 공유</Span>
          <Title>{selectedButtonTitle}</Title>
          <CloseButton onClick={() => setModalOpen({})}>
            <img src={close} alt="닫기" />
          </CloseButton>
          <LinkContainer>
            <Links>
              <StyledLink to="http://www.kakaotalk.com" $bgColor="Y">
                <img src={kakaoLogo} alt="카카오 로고" />
              </StyledLink>
              <span>카카오톡</span>
            </Links>
            <Links>
              <StyledLink to="http://www.facebook.com">
                <img src={facebookLogo} alt="페이스북 로고" />
              </StyledLink>
              <span>페이스북</span>
            </Links>
            <Links>
              <StyledButton onClick={() => handleCopyClipBoard(currentURL)}>
                <img src={linkCopy} alt="링크복사" />
              </StyledButton>
              <span>링크복사</span>
            </Links>
          </LinkContainer>
        </ShareModalContainer>
      </ModalContainer>
    </>
  );
}
export default ShareModal;