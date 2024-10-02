import { Button, HStack, Icon, Text } from '@chakra-ui/react';
import { FaCalendarAlt } from 'react-icons/fa';

import { useColorMode } from '@chakra-ui/react'; // Import du hook


const WeekSelector = ({ semainesDuMois, selectedWeek, setSelectedWeek }) => {

  const { colorMode } = useColorMode(); // Utilise le hook pour détecter le mode
  const isDarkMode = colorMode === 'dark'; // Vérifie si le mode sombre est activé

  return (
    <HStack justify="center"   mb={10}>
      {semainesDuMois.map((week) => (
        <Button
          display="block"
          height="full"
          py={3}
          w="full"
          px={{ base: '0px' , md: '2px', lg: '22px'}}
          maxW={{ base: '140px' , md: '322px', lg: '100px'}}
          key={week.number}
          onClick={() => setSelectedWeek(week.number)}
          // Gestion des couleurs en fonction du mode
          bg={selectedWeek === week.number ? '#CE0033' : isDarkMode ? 'gray.700' : 'gray.700'}
          border="none"
          borderRadius="lg"
          shadow="md"
          _focus={{ outline: 'none' }}
          _hover={{
            bg: '#CE0033',
            color: 'white',
          }}
          _active={{
            bg: '#CE0033',
            color: 'white',
          }}
          lineHeight="1"
          transition="all 0.3s ease-in-out"
          _text={{
            color: selectedWeek === week.number ? 'white' : isDarkMode ? 'gray.600' : 'gray.800',
          }}
          _disabledText={{ color: 'gray.300' }}
          _icon
          color={selectedWeek === week.number ? 'white' : isDarkMode ? 'gray.400' : 'gray.400'}
        >
          <Icon size="xl" as={FaCalendarAlt} />
          {/* <Text ml="">Semaine</Text> */}
          <Text fontSize={{base: '12px' , md : '12px', lg: '18px'}} ml={{base: '0' , md : '0', lg: '-10px'}}>Semaine</Text>

        </Button>
      ))}
    </HStack>
  );
};

export default WeekSelector;
