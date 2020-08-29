import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { stringify } from 'querystring';

interface PostListProps {
  src: string;
}

enum DataState {
  Unloaded,
  Loading,
  Loaded,
  Failed,
}

export default function PostList(props: PostListProps) {
  const [posts, setPosts] = useState<any>(null);
  const [dataState, setDataState] = useState<DataState>(DataState.Unloaded);

  useEffect(() => {
    if (dataState == DataState.Unloaded) {
      tryLoad();
    }
  });

  function tryLoad() {
    setDataState(DataState.Loading);

    fetch(props.src)
      .then((response) => response.json())
      .then((json) => {
        if (json.status != null) {
          setDataState(DataState.Failed);
        } else {
          setDataState(DataState.Loaded);
        }
      });
  }

  function getText(): string {
    switch (dataState) {
      case DataState.Unloaded:
        return 'The posts have not been loaded yet';
      case DataState.Loading:
        return 'The posts are loading';
      case DataState.Loaded:
        return 'The posts have loaded!';
      case DataState.Failed:
        return 'The posts failed to load';
      default:
        return 'INVALID STATE';
    }
  }

  return (
    <View style={styles.container}>
      <Text>{getText()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
