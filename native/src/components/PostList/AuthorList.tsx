import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { PostEntity } from './PostEntity';
import SelectableAuthor from './SelectableAuthor';

interface AuthorListProps {
  posts: PostEntity[];
}

export default function AuthorList(props: AuthorListProps) {
  const [selectedId, setSelectedId] = useState<string>('');

  function renderSelectableAuthor(post: PostEntity) {
    return (
      <SelectableAuthor
        author={post.author}
        selected={post.author.id == selectedId}
        onTouch={(id) => setSelectedId(selectedId == id ? '' : id)}
      />
    );
  }

  return <View>{props.posts.map((post) => renderSelectableAuthor(post))}</View>;
}
