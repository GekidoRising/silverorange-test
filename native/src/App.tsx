import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PostList from './components/PostList/PostList';

export function App() {
  return <PostList src="http://localhost:4000/posts" />;
}
