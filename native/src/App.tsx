import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PostList from './components/PostList/PostList';

//I'm 2 hours, 40 minutes into this test and I'm running into a lot of difficulties (namely the
// fact that every package I try to install through yarn or npm is throwing a variety of errors),
// so instead I'm going to just spend the remainder of my time leaving comments on how how I would
// handle some of the given solutions

//Here, the app merely displays the post list, but ideally, I would have react-navigation working
// which displays the app on a MainScreen. Clicking a post inside of the post list would then
// add a PostScreen to the stack, allowing the user to click the back button on the header or the android
// back button to navigate back
export function App() {
  return <PostList src="http://localhost:4000/posts" />;
}

//In terms of implementing snapshot regression testing, unfortunately I'm currently not familiar
// with the concept and based on my time restrictions, I'm not sure I can follow through with it
// in a reasonable matter of time, but it does sound really neat.
