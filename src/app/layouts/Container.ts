import styled from 'styled-components';
import background from '../../assets/img/background.jpg';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 375px;
  height: auto;
  background-image: url(${background});
  background-size: cover;
  background-attachment: fixed;
`;

export default Container;
