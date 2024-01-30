import React from "react";
import { View, Text, Image } from "react-native";

import styles from "./company.style";
import { COLORS, SIZES, icons } from "../../../constants";
import { checkImageURL } from "../../../utils";

const Company = ({ companyName, jopTitle, companyLogo, loacation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.logoBox}>
        <Image
          source={{
            uri: checkImageURL(companyLogo)
              ? companyLogo
              : "https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NNICW7diNmGXJfMicpY9eXHKV4sqz05H.jpg",
          }}
          style={styles.logoBox}
        />
      </View>

      <View style={styles.jobTitleBox}>
        <Text style={styles.jobTitle}>{jopTitle}</Text>
      </View>

      <View style={styles.companyInfoBox}>
        <Text style={styles.companyName}>{companyName} /</Text>
        <View style={styles.locationBox}>
          <Image
            source={icons.location}
            resizeMode="contain"
            style={styles.locationImage}
          />
          <Text style={styles.locationName}>{loacation}</Text>
        </View>
      </View>
    </View>
  );
};

export default Company;
