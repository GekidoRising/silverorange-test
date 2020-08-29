import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';
import { stringify } from 'querystring';
import { PostAuthor, PostEntity } from './PostEntity';
import { JSXElement } from '@babel/types';
import Post from './Post';

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
  const [posts, setPosts] = useState<PostEntity[]>([]);
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
          setPosts(json.map((entity: any) => toPostEntity(entity)));
        }
      });
  }

  function toPostEntity(entity: any) {
    var post: PostEntity = entity;
    post.publishedAt = new Date(entity.publishedAt);

    return post;
  }

  function getContent(): JSX.Element | JSX.Element[] {
    switch (dataState) {
      case DataState.Unloaded:
        return <Text>The posts have not been loaded yet</Text>;
      case DataState.Loading:
        return <Text>The posts are loading</Text>;
      case DataState.Loaded:
        return renderPosts();
      case DataState.Failed:
        return renderRetry();
      default:
        return <Text>INVALID STATE</Text>;
    }
  }

  function renderRetry() {
    return (
      <View>
        <Text>The posts have failed to load</Text>
        <Button onPress={() => tryLoad()} title="Try again" />
      </View>
    );
  }

  function renderPosts() {
    return (
      <ScrollView>
        {posts
          .sort(
            (first, second) =>
              second.publishedAt.getTime() - first.publishedAt.getTime()
          )
          .map((post) => (
            <Post post={post} />
          ))}
      </ScrollView>
    );
  }

  return <View style={styles.container}>{getContent()}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexShrink: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
