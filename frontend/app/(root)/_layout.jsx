import { View, Text } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'
import { Redirect, Stack } from 'expo-router'
import PageLoader from '../../components/PageLoader'

const Layout = () => {
  const {isSignedIn,isLoaded} = useUser()
  if(!isLoaded)return <PageLoader/>
  if(!isSignedIn)return <Redirect href={'/sign-in'}/>
  return (
    <Stack screenOptions={{headerShown:false}}>
      <Text>Layout</Text>
    </Stack>
  )
}

export default Layout