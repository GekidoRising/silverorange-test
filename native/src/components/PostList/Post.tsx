import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { PostEntity } from './PostEntity';

interface PostProps {
  post: PostEntity;
}

export default function Post(props: PostProps) {
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
