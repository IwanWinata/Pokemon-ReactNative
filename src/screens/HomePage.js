import { SafeAreaView } from "react-native-safe-area-context";
import {
  Text,
  Image,
  View,
  Button,
  TouchableOpacity,
  TextInput,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from "react-native";
import tw from "twrnc";
import PokeCard from "../components/PokeCard";
import { useState, useEffect } from "react";
import axios from "axios";

const HomePage = ({ navigation }) => {
  const [pokemons, setPokemons] = useState([]);

  const fecthPoke = async () => {
    try {
        let {data} = await axios.get("https://pokeapi.co/api/v2/pokemon")
        setPokemons(data.results)
    } catch (error) {
        console.log(error);
    }
  }
  useEffect(() => {
    fecthPoke()
  }, [])
  const pokemonsDum = [
    {
      name: "Squirtle",
      type: "water",
      description:
        "When it retracts its long neck into its shell, it squirts out water with vigorous force.",
      weight: "19.8 lbs",
      image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/007.png",
      id: 4,
    },
    {
      name: "Impidimp",
      type: "fire",
      description:
        "Through its nose, it sucks in the emanations produced by people and Pokémon when they feel annoyed. It thrives off this negative energy.",
      weight: "12.1 lbs",
      image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/859.png",
      id: 5,
    },
    {
      name: "Spiritomb",
      type: "water",
      description:
        "Exactly 108 spirits gathered to become this Pokémon. Apparently, there are some ill-natured spirits in the mix.",
      weight: "238.1 lbs",
      image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/442.png",
      id: 6,
    },
    {
      name: "Virizion",
      type: "grass",
      description:
        "A legend tells of this Pokémon working together with Cobalion and Terrakion to protect the Pokémon of the Unova region.",
      weight: "440.6 lbs",
      image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/640.png",
      id: 7,
    },
    {
      name: "Virizion",
      type: "fighting",
      description:
        "A legend tells of this Pokémon working together with Cobalion and Terrakion to protect the Pokémon of the Unova region.",
      weight: "440.6 lbs",
      image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/640.png",
      id: 8,
    },
  ];
  const renderItem = ({ item }) => {
    return <PokeCard pokemon={item} navigation={navigation}/>;
  };
  return (
    <SafeAreaView>
      {/* HEADER */}
      <View style={tw`text-black font-bold m-4 mb-10 text-xl mt-4 flex-row`}>
        <View style={tw`flex-col`}>
          <Text style={tw`text-gray-700 font-bold text-4xl`}>Pokedex</Text>
        </View>
      </View>
      {
        pokemons.length !== 0 &&
      <FlatList
        data={pokemons}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
        numColumns={2}
        ListFooterComponent={<View style={tw`mb-32`} />}
      />
      }
    </SafeAreaView>
  );
};
export default HomePage;
