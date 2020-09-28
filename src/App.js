import React from 'react';
import { ThemeProvider, CSSReset, Box, Text } from "@chakra-ui/core";
import { Form } from './Form';
import './App.css';

function App() {

  const Container = props => <Box p={4} maxWidth={960} margin="0 auto">{props.children}</Box>;

  return (
    <ThemeProvider>
      <CSSReset />
      <Container>

        <Box textAlign="center" py={4}>
          <Text as="h1" fontSize={32} fontWeight={900} letterSpacing="-.035em">Nearest Color</Text>
          <Text as="p">Finds the nearest color from a list of colors</Text>
        </Box>

        <Form />

      </Container>

    </ThemeProvider>
  );
}

export default App;
