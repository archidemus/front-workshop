import styled from 'styled-components';
import HighlightedText from './HighlightedText';
import highlightProps from './highlightProps';

export function App() {
  return (
    <Wrapper>
      <h1>Front tools</h1>
      <HighlightedText {...highlightProps}/>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  font-family: Helvetica, sans-serif;
`;

export default App;
