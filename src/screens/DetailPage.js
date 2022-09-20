import { AntDesign, Ionicons } from "@expo/vector-icons";
import {
  Text,
  Image,
  View,
  Button,
  TouchableOpacity,
  Dimensions,
  TextInput,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from "react-native";
import tw from "twrnc";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import axios from "axios";

const DetailPage = ({ navigation, route }) => {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const { pokemonName } = route.params;
  const [indicator, setIndicator] = useState("Stats");
  const [pokeDet, setPokeDet] = useState({});

  const fetchDetails = async () => {
    try {
      let { data } = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
      );

      let {data: moves} = await axios.get(`https://pokeapi.co/api/v2/move/${data.moves[0].move.name}`)

      let types = data.types.map((el) => {
        return el.type.name;
      });
      let abilities = data.abilities.map((el) => {
        return el.ability.name;
      });

      let result = {
        image: data.sprites.other["official-artwork"].front_default,
        types,
        height: data.height,
        weight: data.weight,
        abilities,
        stats: data.stats,
        movesDetail: {
            name: moves.name,
            pp: moves.pp,
            priority: moves.priority,
            power: moves.power
        }
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
        return `w-full h-full bg-red-400`;
      } else if (pokeDet.types[0] === "grass") {
        return `w-full h-full bg-emerald-400`;
      } else if (pokeDet.types[0] === "water") {
        return `w-full h-full bg-sky-400`;
      } else {
        return `w-full h-full bg-slate-800`;
      }
  };
  const buttonStyle = () => {
    if (pokeDet.types[0] === "fire") {
      return `text-white font-bold text-xs bg-red-300 px-2 py-1 w-16 text-center rounded-full ml-1`;
    } else if (pokeDet.types[0] === "grass") {
      return `text-white font-bold text-xs bg-emerald-300 px-2 py-1 w-16 text-center rounded-full ml-1`;
    } else if (pokeDet.types[0] === "water") {
      return `text-white font-bold text-xs bg-sky-300 px-2 py-1 w-16 text-center rounded-full ml-1`;
    } else {
      return `text-white font-bold text-xs bg-slate-700 px-2 py-1 w-16 text-center rounded-full ml-1`;
    }
  };

  return (
    <SafeAreaView>
      {pokeDet.image && (
        <>
          <View style={tw`${style()}`}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("HomePage");
              }}
              style={tw`bg-white p-0.5 content-center w-8 h-8 justify-center items-center ml-2 mt-2 rounded-lg`}
            >
              <AntDesign name="left" size={16} color="blue" />
            </TouchableOpacity>
            <View style={tw`w-full h-1/2`}>
              <Text style={tw`text-white font-bold text-6xl mt-6 ml-6`}>
                {pokemonName}
              </Text>
              <View style={tw`flex flex-row ml-6 mt-1`}>
                {pokeDet.types.map((el) => (
                  <Text
                    key={el}
                    style={tw`${buttonStyle()}`}
                  >
                    {el}
                  </Text>
                ))}
              </View>
            </View>
            <View
              style={{
                width: windowWidth,
                height: windowHeight * 0.5,
                backgroundColor: "white",
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
              }}
            >
              <Image
                source={{
                  uri: pokeDet.image,
                }}
                style={tw`w-3/4 h-3/4 m-auto -mt-56`}
              />
              <View style={tw`w-full h-full`}>
                <View style={tw`flex flex-row mt-10 justify-center`}>
                  <TouchableOpacity onPress={() => setIndicator("About")}>
                    <Text style={tw`text-lg ml-4 font-bold`}>About</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setIndicator("Stats")}>
                    <Text style={tw`text-lg ml-4 font-bold`}>Base Stats</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setIndicator("Moves")}>
                    <Text style={tw`text-lg ml-4 font-bold`}>Moves</Text>
                  </TouchableOpacity>
                </View>
                {indicator === "About" && pokeDet.image && (
                  <View style={tw`m-4`}>
                    <View style={tw`flex flex-row mt-2`}>
                      <Text style={tw`font-bold text-gray-400 text-lg mr-8`}>
                        Species:
                      </Text>
                      <Text style={tw`text-gray-700 font-bold text-lg`}>
                        Seed
                      </Text>
                    </View>

                    <View style={tw`flex flex-row mt-2`}>
                      <Text style={tw`font-bold text-gray-400 text-lg mr-8`}>
                        Height:
                      </Text>
                      <Text style={tw`text-gray-700 font-bold text-lg`}>
                        {pokeDet.height}
                      </Text>
                    </View>

                    <View style={tw`flex flex-row mt-2`}>
                      <Text style={tw`font-bold text-gray-400 text-lg mr-8`}>
                        Weight:
                      </Text>
                      <Text style={tw`text-gray-700 font-bold text-lg`}>
                        {pokeDet.weight}
                      </Text>
                    </View>
                    <View style={tw`flex flex-row mt-2`}>
                      <Text style={tw`font-bold text-gray-400 text-lg mr-8`}>
                        Abilities:
                      </Text>
                      <Text style={tw`text-gray-700 font-bold text-lg`}>
                        {pokeDet.abilities.join(", ")}
                      </Text>
                    </View>
                  </View>
                )}
                {indicator === "Stats" && (
                  <View style={tw`m-4`}>
                    <View style={tw`flex flex-row mt-2`}>
                      <Text style={tw`font-bold text-gray-400 text-lg mr-8`}>
                        HP:
                      </Text>
                      <Text style={tw`text-gray-700 font-bold text-lg`}>
                        {pokeDet.stats[0].base_stat}
                      </Text>
                    </View>

                    <View style={tw`flex flex-row mt-2`}>
                      <Text style={tw`font-bold text-gray-400 text-lg mr-8`}>
                        Attack:
                      </Text>
                      <Text style={tw`text-gray-700 font-bold text-lg`}>
                        {pokeDet.stats[1].base_stat}
                      </Text>
                    </View>

                    <View style={tw`flex flex-row mt-2`}>
                      <Text style={tw`font-bold text-gray-400 text-lg mr-8`}>
                        Defense:
                      </Text>
                      <Text style={tw`text-gray-700 font-bold text-lg`}>
                        {pokeDet.stats[2].base_stat}
                      </Text>
                    </View>
                    <View style={tw`flex flex-row mt-2`}>
                      <Text style={tw`font-bold text-gray-400 text-lg mr-8`}>
                        S-Att:
                      </Text>
                      <Text style={tw`text-gray-700 font-bold text-lg`}>
                        {pokeDet.stats[3].base_stat}
                      </Text>
                    </View>
                    <View style={tw`flex flex-row mt-2`}>
                      <Text style={tw`font-bold text-gray-400 text-lg mr-8`}>
                        S-Def:
                      </Text>
                      <Text style={tw`text-gray-700 font-bold text-lg`}>
                        {pokeDet.stats[4].base_stat}
                      </Text>
                    </View>
                  </View>
                )}
                {indicator === "Moves" && (
                  <View style={tw`m-4`}>
                    <View style={tw`flex flex-row mt-2`}>
                      <Text style={tw`font-bold text-gray-400 text-lg mr-8`}>
                        Name:
                      </Text>
                      <Text style={tw`text-gray-700 font-bold text-lg`}>
                        {pokeDet.movesDetail.name}
                      </Text>
                    </View>

                    <View style={tw`flex flex-row mt-2`}>
                      <Text style={tw`font-bold text-gray-400 text-lg mr-8`}>
                        PP:
                      </Text>
                      <Text style={tw`text-gray-700 font-bold text-lg`}>
                        {pokeDet.movesDetail.pp}
                      </Text>
                    </View>

                    <View style={tw`flex flex-row mt-2`}>
                      <Text style={tw`font-bold text-gray-400 text-lg mr-8`}>
                        Priority:
                      </Text>
                      <Text style={tw`text-gray-700 font-bold text-lg`}>
                        {pokeDet.movesDetail.priority}
                      </Text>
                    </View>
                    <View style={tw`flex flex-row mt-2`}>
                      <Text style={tw`font-bold text-gray-400 text-lg mr-8`}>
                        Power:
                      </Text>
                      <Text style={tw`text-gray-700 font-bold text-lg`}>
                        {pokeDet.movesDetail.power}
                      </Text>
                    </View>
                  </View>
                )}
              </View>
            </View>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};
export default DetailPage;
