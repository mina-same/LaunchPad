import React, {useState} from 'react'
import { 
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  FlatList
} from 'react-native'
import { useRouter } from "expo-router";
import styles from './welcome.style';
import { SIZES, icons } from '../../../constants';

const jobTypes= ["Full-Time", "part-Time", "internship", "freelance", "contractor"]

const Welcome = ({searchTerm, handleClick, setSearchTerm}) => {
  const router = useRouter();
  const [activeJobType, setActiveJobType] = useState("Full-Time")

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.userName}>Hello, Mina.</Text>
        <Text style={styles.welcomeMessage}>Find Your Perfect Job.</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput 
            style={styles.searchInput}
            value={searchTerm}
            onChangeText={(text) => setSearchTerm(text)}
            placeholder='what are ou looking for?'
            />
        </View>

        <TouchableOpacity style={styles.searchBtn} onPress={handleClick}>
          <Image
            source={icons.search}
            resizeMode='contain'
            style={styles.searchBtnImage}
            />
        </TouchableOpacity>
      </View>

      <View style={styles.tabsContainer}>
        <FlatList
          data={jobTypes}
          renderItem={({item}) =>(
            <TouchableOpacity
              style={styles.tab(activeJobType, item)}
              onPress={() => { 
                setActiveJobType(item);
                router.push(`/search/${item}`)
              }}
            >
              <Text style={styles.tabText(activeJobType,item)}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={item => item}
          contentContainerStyle={{ columnGap: SIZES.small }}
          horizontal
        />
      </View>

    </View>
  )
}

export default Welcome