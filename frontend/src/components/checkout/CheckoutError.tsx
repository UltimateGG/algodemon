import styled, { keyframes } from "styled-components";
import { Icon, IconEnum, themeDefault } from "../../Jet";


const fade = keyframes`
  from {
    opacity: 0;
    transform: scale3D(0.95, 0.95, 0.95);
  }
  to {
    opacity: 1;
    transform: scale3D(1, 1, 1);
  }
`;

const ErrorContainer = styled.div`
  display: flex;
  align-items: center;
  color: #fff;
  margin-top: 1rem;
  font-size: 13px;
  width: 100%;
  max-width: 450px;
  opacity: 90;
  animation: ${fade} 150ms ease-out;
  animation-delay: 50ms;
  animation-fill-mode: forwards;
  will-change: opacity;

  & svg {
    margin-right: 10px;
  }
`;

const CheckoutError = ({ children }: { children?: React.ReactNode }) => (
  <ErrorContainer role="alert">
    <Icon icon={IconEnum.error} color={themeDefault.colors.danger[0]} size={24} />
    {children}
  </ErrorContainer>
);

export default CheckoutError;
