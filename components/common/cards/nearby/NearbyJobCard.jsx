import { View, Text, TouchableOpacity, Image } from "react-native";

import styles from "./nearbyjobcard.style";
import { checkImageURL } from "../../../../utils";


const NearbyJobCard = ({ jop, handleNavigate }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handleNavigate}
    >

      <TouchableOpacity style={styles.logoContainer}>
        <Image
          source={{
            uri: checkImageURL(jop.employer_logo)? 
            jop.employer_logo :
            'https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NNICW7diNmGXJfMicpY9eXHKV4sqz05H.jpg',
          }}
          resizeMode="contain"
          style={styles.logImage}
        />
      </TouchableOpacity>

      <View style={styles.textContainer}>
        <Text style={styles.jobName} numberOfLines={1}>
          {jop.job_title}
        </Text>
        <Text style={styles.jobType}>
          {jop.job_employment_type}
        </Text>
      </View>

    </TouchableOpacity>
  );
};

export default NearbyJobCard;
