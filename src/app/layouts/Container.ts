import styled from 'styled-components';
import background from '../../assets/img/background.jpg';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 375px;
  min-height: 600px;
  height: 100%;
  background-image: url(${background});
  background-size: cover;
  background-attachment: fixed;
  position: relative;
`;

export default Container;
