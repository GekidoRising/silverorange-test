import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { PostEntity } from './PostEntity';

interface PostProps {
  post: PostEntity;
}

export default function Post(props: PostProps) {
  //Ideally, I would have a markdown package take care of rendering the body of the post
  // but unfortunately, I was running into significant difficulty getting any of the packages
  // I yarned in to work, so I had to leave it as is.
  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.title}>{props.post.title}</Text>
        <View>
          <Text>{props.post.author.name}</Text>
          <Text>{props.post.publishedAt.toLocaleString()}</Text>
        </View>
      </View>
      <ScrollView style={styles.bodyWrapper}>
        <Text>{props.post.body}</Text>
      </ScrollView>
    </View>
  );

  //As it currently stands, there's no touch interaction of even a separate screen for posts.
  // Last I knew of react native, I would be using TouchableHighlights or TouchableOpacity to add
  // onTouch functionality that would navigate to the new page discussed on App.tsx, but from what
  // I recall researching, there's now a Pressable element which seems a lot more robust.
}

const styles = StyleSheet.create({
  title: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 18,
    margin: 10,
  },

  header: {
    borderTopWidth: 3,
    borderTopColor: '#000',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    flexDirection: 'row',
    alignContent: 'center',
  },

  bodyWrapper: {
    height: 200,
    margin: 20,
    padding: 10,
    backgroundColor: '#eee',
  },
});
