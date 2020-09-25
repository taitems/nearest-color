import React, { useState } from 'react';
import { ThemeProvider, CSSReset, Textarea, Input, Flex, Box, Text } from "@chakra-ui/core";
import defaultColors from './defaultColors';

function App() {

  const [list, setList] = useState(defaultColors);
  const [color, setColor] = useState();
  const [match, setMatch] = useState({});

  var nearestColor = require('nearest-color').from(list);

  const isHex = str => {
    return /^#[A-F0-9]{6}$/i.test(str)
  }

  const onChange = e => {
    const localColor = e.target.value;
    setColor(localColor);
    if (isHex(localColor)) {
      const newColor = nearestColor(localColor);
      setMatch(newColor);
    }
  }

  const makeRgb = obj => {
    return obj ? `rgb(${obj.r},${obj.g},${obj.b})` : null;
  }

  return (
    <ThemeProvider>
      <CSSReset />
      <Flex>
        <Box flex={1} p={2}>
          <Box>
            <Text>Input</Text>
            <Input type="text" onChange={onChange} />
          </Box>
          <Box
            bg={color}
            height={100}
            width="100%"
          />
        </Box>
        <Box flex={1} p={2}>
          <Text>Nearest Color</Text>
          <Input type="text" value={match.value} isReadOnly />
          <Box
            bg={match.value}
            height={100}
            width="100%"
          />
          <Box>Hex: {match.value}</Box>
          <Box>Match: {match.name}</Box>
          <Box>RGB: {makeRgb(match.rgb)}</Box>
          <Box>Distance: {match.distance}</Box>
        </Box>
      </Flex>
      <Textarea value={JSON.stringify(list)} isReadOnly />
    </ThemeProvider>
  );
}

export default App;
