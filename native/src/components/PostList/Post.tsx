import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { PostEntity } from './PostEntity';

interface PostProps {
  post: PostEntity;
}

export default function Post(props: PostProps) {
  return (
    <View>
      <View>
        <Text style={styles.title}>{props.post.title}</Text>
      </View>
      <ScrollView style={styles.bodyWrapper}>
        <Text style={styles.body}>{props.post.body}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    margin: 10,
    borderBottomWidth: 3,
    borderBottomColor: '#000',
  },

  bodyWrapper: { height: 200 },
  body: { padding: 10, backgroundColor: '#eee' },
});
