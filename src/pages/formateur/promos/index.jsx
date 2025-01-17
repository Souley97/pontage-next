import { Box, Text, SimpleGrid } from '@chakra-ui/react';
import ProfileCardFormateur from '../../../components/layout/formateur/Navbar';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import PromoCard from '../../../components/common/PromoCard';
import PromoHeader from '../../../components/common/PromoHeader';
import CardBox from '../../../components/common/Card';
import CreatePromoForm from '../../../components/func/formateur/CreatePromoForm';

// Fonction de récupération des données
const fetcher = (url) =>
  fetch(url, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  }).then((res) => {
    if (!res.ok) throw new Error('Erreur lors de la récupération des données.');
    return res.json();
  });

const Dashboard = () => {
  // Récupérer les promos en cours et terminées
  const { data: promosData, error: promosError } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/promos/encours`,
    fetcher
  );
  const { data: promosDataTerminer, error: promosErrorTerminer } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/promos/terminer`,
    fetcher
  );
  const router = useRouter();

  // Rediriger vers la page de la promotion sélectionnée
  const handlePromoClick = (promoId) => {
    router.push(`/formateur/promos/${promoId}`);
  };

  // Récupérer les pointages du jour pour une promotion
  

  if (promosError && promosErrorTerminer) {
    return (
      <Box p={0}>
        {/* Profil Formateur et Header */}
        <ProfileCardFormateur />

        <SimpleGrid
          mx={{ base: '2px', md: '3px', lg: '12px' }}
          justifyContent="space-between"
          columns={[1, 2]}
          spacing={8}
        >
          <CardBox>
            {/* Component */}
            <CreatePromoForm />
          </CardBox>
          <CardBox as="section">
            {' '}
            <PromoHeader />
            <Text color="red.500">Aucune promotion</Text>{' '}
          </CardBox>
        </SimpleGrid>
      </Box>
    );
  }

  const promos = promosData ? promosData.promos : [];
  const promosTerminer = promosDataTerminer ? promosDataTerminer.promos : [];

  return (
    <Box p={0}>
      {/* Profil Formateur et Header */}
      <ProfileCardFormateur />

      <SimpleGrid
        mx={{ base: '2px', md: '3px', lg: '12px' }}
        justifyContent="space-between"
        columns={[1, 2]}
        spacing={8}
      >
        <CardBox
          as="section"
          // px={{ base: '2px', md: '3px', lg: '20px' }}
          // mx={{ base: '2px', md: '3px', lg: '10px' }}
          // py={8}
          // mt={7}
          w="full"
          maxW={{ base: '366px', md: '100%', lg: '90%' }}
          borderBottom="2px solid"
          borderTop="2px solid"
          borderColor="red.700"
          borderRadius="md"
          shadow="lg"
          bg="whiteAlpha.80"
          fontFamily="Nunito Sans"
          flex="2"
          display={{ base: 'none', md: 'none', lg: 'block' }}
        >
          {/* <ListePointage /> */}
          {/* {selectedPromoId && (
          <ListePointage
            pointages={pointages}
            promoId={selectedPromoId}
            fetchPointages={fetchPointages}
            isCompleted
          />
        )}
        ; */}

          {/* Component */}
          <CreatePromoForm />
        </CardBox>
        <CardBox as="section" flex="2">
          {' '}
          <PromoHeader />
          {promos.length > 0 ? (
            <PromoCard promos={promos} handlePromoClick={handlePromoClick} />
          ) : (
            <Text fontSize="lg" color="red.500">
              Aucune promotion en cours.
            </Text>
          )}{' '}
          {/* Liste des Promos terminées */}
          {promosTerminer.length > 0 ? (
            <PromoCard
              promos={promosTerminer}
              isCompleted
              handlePromoClick={handlePromoClick}
            />
          ) : (
            <Text fontSize="lg" color="red.500">
              Aucune promotion terminée.
            </Text>
          )}{' '}
        </CardBox>
      </SimpleGrid>
    </Box>
  );
};

export default Dashboard;
