import React, { Suspense } from 'react'; // Importation de React et du composant Suspense.
import { Box, Center, Spinner, Text } from '@chakra-ui/react'; // Importation des composants Chakra UI.
import MonthPagination from './MonthPagination'; // Composant pour changer de mois.
import WeekSelector from './WeekSelector'; // Composant pour sélectionner la semaine.
import ListePointage from '../func/formateur/ListePointage'; // Composant pour afficher la liste des pointages.
import AttendanceSummary from './AttendanceSummary'; // Composant pour afficher le résumé des présences.

const PointageBox = ({ // Définition du composant PointageBox avec des props.
  date, // Date actuelle.
  handleMonthChange, // Fonction pour changer de mois.
  semainesDuMois, // Semaines du mois actuel.
  selectedWeek, // Semaine sélectionnée.
  setSelectedWeek, // Fonction pour changer la semaine sélectionnée.
  pointagesData, // Données des pointages.
  pointagesError, // Erreur potentielle.
  attendanceSummary, // Résumé des présences.
}) => (
  <Box as="section" display="flex" flexDirection="column" // Conteneur principal avec styles.
       w="full" maxW={{ base: '366px', md: '500px', lg: '100%' }} // Largeur maximale en fonction de l'écran.
       borderBottom="2px solid" borderTop="2px solid" borderColor="red.700" // Styles de bordure.
       borderRadius="md" shadow="lg" bg="whiteAlpha.80" fontFamily="Nunito Sans"> 
       {/* // Autres styles. */}

    <Suspense mt fallback={<Spinner />}> 
    {/*  Chargement du composant MonthPagination. */}
      <MonthPagination
        mois={date.format('MM')} // Mois actuel.
        annee={date.year()} // Année actuelle.
        handlePreviousMonth={() => handleMonthChange(-1)} // Changer au mois précédent.
        handleNextMonth={() => handleMonthChange(1)} // Changer au mois suivant.
      />
    </Suspense>

    <Suspense fallback={<Spinner />}> 
    {/*  Chargement du composant WeekSelector. */}
      <WeekSelector
        // Semaines du mois.
        semainesDuMois={semainesDuMois} 
        // Semaine sélectionnée.
        selectedWeek={selectedWeek} 
        // Fonction pour changer la semaine.
        setSelectedWeek={setSelectedWeek}
      />
    </Suspense>


    {/*  Si erreur lors de la récupération des pointages. */}

    {pointagesError ? ( 
      <Center mt={4}>
        <Text fontSize="lg" color="gray.600">Erreur lors de la récupération des pointages.</Text>
      </Center>
    ) : pointagesData?.pointages.length === 0 ? ( // Si pas de pointages trouvés.
      <Center mt={4}>
        <Text fontSize="lg" color="gray.600">Aucun pointage trouvé pour cette période.</Text>
      </Center>
    ) : ( // Si des pointages sont disponibles.
      <>
        <Suspense fallback={<Spinner />}> 
         {/* Chargement de la liste des pointages. */}
          <ListePointage pointages={pointagesData.pointages} />
        </Suspense>
        <Suspense fallback={<Spinner />}> 
        {/*  Chargement du résumé des présences. */}
          <AttendanceSummary summary={attendanceSummary} />
        </Suspense>
      </>
    )}
  </Box>
);

export default PointageBox; // Exportation du composant.
