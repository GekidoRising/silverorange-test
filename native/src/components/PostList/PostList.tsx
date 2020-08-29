import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  Button,
  Platform,
} from 'react-native';
import { stringify } from 'querystring';
import { PostAuthor, PostEntity } from './PostEntity';
import { JSXElement } from '@babel/types';
import Post from './Post';
import AuthorList from './AuthorList';

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
        //Ideally, I would have liked to put in some more fancy type checking here than
        // merely checking if the status existed (unique to the error), but I'll have to
        // refamiliarize myself with typescript before I can do it properly.
        if (json.status != null) {
          setDataState(DataState.Failed);
        } else {
          setDataState(DataState.Loaded);
          setPosts(json.map((entity: any) => toPostEntity(entity)));
        }
      });
  }

  //I was running into issues with the dates getting interpreted as actual dates,
  // (most likely since json() just doesn't handle that), so I had to manually set them
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
      <View>
        <Text style={{ margin: 10, fontWeight: 'bold', fontSize: 16 }}>
          Authors
        </Text>
        <ScrollView style={{ margin: 10, height: 100 }}>
          <AuthorList posts={posts} />
        </ScrollView>
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
      </View>
    );
  }

  return <View style={styles.container}>{getContent()}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexShrink: 1,
    backgroundColor: getOsColor(),
    alignItems: 'center',
    justifyContent: 'center',
  },
});

//While not the most complex, intricate demonstration of platform specific variance,
// it's at least something.
function getOsColor() {
  switch (Platform.OS) {
    case 'android':
      return '#fff2f2';
    case 'ios':
      return '#f2f2ff';
    case 'web':
      return '#f2fff2';
    default:
      return '#fff';
  }
}
