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
import { useState, useEffect } from "react";
import axios from "axios";

const PokeCard = ({ pokemon, navigation }) => {
  const [pokeDet, setPokeDet] = useState({});
  const fetchDetails = async () => {
    try {
      let { data } = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
      );

      let types = data.types.map((el) => {
        return el.type.name;
      });

      let result = {
        image: data.sprites.other["official-artwork"].front_default,
        types,
      };
      setPokeDet(result);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchDetails();
  }, []);

  const style = () => {
    if (pokeDet.types[0] === "fire") {
      return `w-[156px] h-32 rounded-lg mt-2 ml-4 bg-red-400 shadow-xl flex flex-row border border-gray-100 p-4 relative`;
    } else if (pokeDet.types[0] === "grass") {
      return `w-[156px] h-32 rounded-lg mt-2 ml-4 bg-emerald-400 shadow-xl flex flex-row border border-gray-100 p-4 relative`;
    } else if (pokeDet.types[0] === "water") {
      return `w-[156px] h-32 rounded-lg mt-2 ml-4 bg-sky-400 shadow-xl flex flex-row border border-gray-100 p-4 relative`;
    } else {
      return `w-[156px] h-32 rounded-lg mt-2 ml-4 bg-slate-800 shadow-xl flex flex-row border border-gray-100 p-4 relative`;
    }
  };
  const buttonStyle = () => {
    if (pokeDet.types[0] === "fire") {
      return `text-white font-bold text-xs bg-red-300 w-full p-1 text-center rounded-full mt-2`;
    } else if (pokeDet.types[0] === "grass") {
      return `text-white font-bold text-xs bg-emerald-300 w-full p-1 text-center rounded-full mt-2`;
    } else if (pokeDet.types[0] === "water") {
      return `text-white font-bold text-xs bg-sky-300 w-full p-1 text-center rounded-full mt-2`;
    } else {
      return `text-white font-bold text-xs bg-slate-700 w-full p-1 text-center rounded-full mt-2`;
    }
  };

  return (
    <TouchableOpacity onPress={() => navigation.navigate("DetailPage", {
        pokemonName: pokemon.name
    })}>
        {pokeDet.image && 
      <View style={tw`${style()}`}>
        <View>
          <Text style={tw`text-white font-bold text-lg`}>{pokemon.name}</Text>
          {pokeDet.image && 
            pokeDet.types.map(el => <Text key={el} style={tw`${buttonStyle()}`}>{el}</Text>)
          }
        </View>
        {pokeDet.image && (
          <Image
            source={{
              uri: pokeDet.image,
            }}
            style={tw`w-1/2 h-3/4 mt-8`}
          />
        )}
      </View>
        }
    </TouchableOpacity>
  );
};
export default PokeCard;
