import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { PostEntity, PostAuthor } from './PostEntity';
import SelectableAuthor from './SelectableAuthor';

interface AuthorListProps {
  posts: PostEntity[];
}

export default function AuthorList(props: AuthorListProps) {
  const [selectedId, setSelectedId] = useState<string>('');

  function getUniqueAuthors(): PostAuthor[] {
    return props.posts
      .map((post) => post.author)
      .filter(
        (a, index, authors) =>
          authors.findIndex((other) => other.id == a.id) == index
      )
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  function renderSelectableAuthor(author: PostAuthor) {
    return (
      <SelectableAuthor
        author={author}
        selected={author.id == selectedId}
        onTouch={(id) => setSelectedId(selectedId == id ? '' : id)}
      />
    );
  }

  return (
    <View>
      {getUniqueAuthors().map((author) => renderSelectableAuthor(author))}
    </View>
  );
}
