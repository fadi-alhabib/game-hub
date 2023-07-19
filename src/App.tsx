import { Box, Grid, GridItem, HStack, Show } from '@chakra-ui/react';
import NavBar from './components/NavBar';
import GameGrid from './components/GameGrid';
import GenreList from './components/GenreList';
import { useState } from 'react';
import { GameQuery } from './types';
import PlatformSelector from './components/PlatformSelector';
import SortSelector from './components/SortSelector';
import GameHeading from './components/GameHeading';

function App() {
  const [gameQuery, setGameQuery] = useState<GameQuery>({} as GameQuery);
  return (
    <>
      <Grid
        templateAreas={{ base: `"nav" "main"`, lg: `"nav nav" "aside main"` }}
        templateColumns={{
          base: '1fr',
          lg: '250px 1fr',
        }}
      >
        <GridItem area={'nav'}>
          <NavBar
            onSearch={(searchText) =>
              setGameQuery({ ...gameQuery, searchText })
            }
          />
        </GridItem>
        <Show above="lg">
          <GridItem area={'aside'} paddingX={5}>
            <GenreList
              selectedGenre={gameQuery.genre}
              onSelectGenre={(genre) => setGameQuery({ ...gameQuery, genre })}
            />
          </GridItem>
        </Show>
        <GridItem area={'main'}>
          <HStack justifyContent={'space-between'} marginX={10}>
            <GameHeading gameQuery={gameQuery} />
            <HStack>
              <PlatformSelector
                selectedPlatform={gameQuery.platform}
                onSelectPlatform={(platform) =>
                  setGameQuery({ ...gameQuery, platform })
                }
              />
              <SortSelector
                selectedSortOrder={gameQuery.sortOrder}
                onSelectSortOrder={(sortOrder) =>
                  setGameQuery({ ...gameQuery, sortOrder })
                }
              />
            </HStack>
          </HStack>
          <GameGrid gameQuery={gameQuery} />
        </GridItem>
      </Grid>
    </>
  );
}

export default App;
