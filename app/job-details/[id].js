import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { Stack, useRouter, useSearchParams } from "expo-router";
import { useCallback, useState } from "react";

import {
  Company,
  JobAbout,
  JobFooter,
  JobTabs,
  ScreenHeaderBtn,
  Specifics,
} from "../../components";
import { COLORS, icons, images, SIZES } from "../../constants";
import useFetch from "../../hook/useFetch";

const tabs = ["About", "Quelification", "Responsibilities", "Skills"];

const jopDetails = () => {
  const params = useSearchParams();
  const router = useRouter();
  
  const [refreshing, setrefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const onRefresh = () => {};

  const { data, isLoading, error, refetch } = useFetch(`job-details`, {
    job_id: params.id,
  });

  console.log(data[0])

  const displayTabContent = () => {
    switch (activeTab) {
      case "About":
        return <JobAbout info={data[0]?.job_description ?? "No Data Prov"} />;
      break;

      case "Quelification":
        return <Specifics title="Quelification" points={data[0].job_highlights?.Qualifications ?? ['N/A']}/>;
      break;

      case "Responsibilities":
        return <Specifics title="Responsibilities" points={data[0].job_highlights?.Responsibilities ?? ['N/A']}/>;
      break;

      case "skills":
        return <Text>Skills</Text>
      break;

      default:
      break;
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerTitle: "",
          headerBackVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension="60%"
              handlePress={() => router.back()}
            />
          ),
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={icons.share} dimension="60%" />
          ),
        }}
      />

      <>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          >
          {isLoading ? (
            <ActivityIndicator size="large" color={COLORS.primary} />
            ): error ?(
              <Text>something went wrong.</Text>
              ): data.lenght === 0 ?(
                <Text>no data found.</Text>
                ): (
                  <View style={{padding: SIZES.medium, paddingBottom: 100}}>
              <Company 
                companyLogo={data[0]?.employer_logo}
                jopTitle={data[0]?.job_title}
                companyName={data[0]?.employer_name}
                loacation={data[0]?.job_country}
                />
              <JobTabs 
                tabs={tabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                />

              {displayTabContent()}
            </View>
          )}
        </ScrollView>

        <JobFooter url={data[0]?.job_google_link ?? 'https://careers.google.com/jobs/results'}/>

      </>
    </SafeAreaView>
  );
};

export default jopDetails;
