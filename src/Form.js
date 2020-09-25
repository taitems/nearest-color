import React, { useState } from 'react';
import { Input, Flex, Box, Text } from "@chakra-ui/core";
import { JsonEditor as Editor } from 'jsoneditor-react';
import 'jsoneditor-react/es/editor.min.css';
import defaultColors from './defaultColors';
const contrast = require('./contrast');


function Form() {

    const placeholderColor = '#DFE0F0';

    const [list, setList] = useState(defaultColors);
    const nearestColor = require('nearest-color').from(list);

    const [color, setColor] = useState(placeholderColor);
    const [safeColor, setSafeColor] = useState(placeholderColor);
    // const [safeTextColor, setSafeTextColor] = useState(contrast(placeholderColor))
    const [match, setMatch] = useState(nearestColor(placeholderColor));

    const isHex = str => {
        return /^#[A-F0-9]{6}$/i.test(str)
    }

    const onListChange = e => {
        console.log(e.target.value);
    }

    const onColorChange = e => {
        console.log(e.target.value);
        const localColor = e.target.value;
        setColor(localColor);
        if (isHex(localColor)) {
            console.log('isHex true!')
            setSafeColor(localColor);
            const newColor = nearestColor(localColor);
            setMatch(newColor);
        } else {
            console.log('isHex false!')
            setSafeColor(null);
            setMatch(null);
        }
    }

    const ROW_SIZE = 175;


    // const Col = props => <Box
    //     flex={1}
    //     height={ROW_SIZE}
    //     position="relative"
    //     fontSize={16}
    //     display="inline-block"
    //     verticalAlign="top"
    //     textAlign="center"
    //     {...props} />

    const Arrow = props => <Box
        width={ROW_SIZE}
        height={ROW_SIZE}
        bg={safeColor}
        position="absolute"
        right={-(ROW_SIZE / 2)}
        top={0}
        transform="rotate(45deg)"
        zIndex={1}
    />

    return (<>
        <Box fontSize={0} overflow="hidden" mb={4} borderRadius={6} style={{ filter: "drop-shadow(0 5px 10px rgba(0,0,0,0.1)), drop-shadow(0 0 20px rgba(0,0,0,0.1))" }}>
            <Box
                flex={1}
                height={ROW_SIZE}
                position="relative"
                fontSize={16}
                fontFamily="Roboto Mono"
                display="inline-block"
                verticalAlign="top"
                textAlign="center"
                width={`calc(50% - ${ROW_SIZE / 3}px)`}
                bg={safeColor}>
                <Flex width="100%" height="100%" justifyItems="center" zIndex={2} position="relative" pt="3.25rem" px={4}>
                    <Input value={color} onChange={onColorChange} bg="transparent" textAlign="center" fontSize={28} borderColor="rgba(0,0,0,0.05)" color={contrast(color)} />
                </Flex>
                <Arrow />
            </Box>
            <Box
                flex={1}
                height={ROW_SIZE}
                position="relative"
                fontSize={16}
                display="inline-block"
                fontFamily="Roboto Mono"
                verticalAlign="top"
                textAlign="center"
                width={`calc(50% + ${ROW_SIZE / 3}px)`}
                bg={match && match.value}>
                <Flex width="100%" height="100%" justifyItems="center" zIndex={2} position="relative" flexDirection="column" pt="3.25rem" px={4}>
                    <Input value={match ? match.value : ''} bg="transparent" isReadOnly textAlign="center" fontSize={28} border="none" color={match && contrast(match.value)} />
                    {match && (
                        <Box color={match && contrast(match.value)}>
                            <Text fontFamily="Roboto Mono" fontSize={16} mb={1}>{match.name}</Text>
                            <Text fontFamily="Roboto Mono" fontSize={13}>Distance {Math.round(match.distance)}</Text>
                        </Box>
                    )}
                </Flex>
            </Box>
        </Box>

        <Editor
            value={list}
            onChange={onListChange}
            mode="text"
        />
    </>)
}

export { Form };