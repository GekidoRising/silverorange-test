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

//Here, we have a formatted list of authors where each author is selectable. Unfortunately
// I ran out of time prior to being able to implement the filtering, but ideally, I would
// move the selectedId state up to the PostList element, where it could then be:
//  A) Passed to this as a prop and
//  B) Used in the PostList to filter properties

export default function AuthorList(props: AuthorListProps) {
  const [selectedId, setSelectedId] = useState<string>('');

  //From the posts, we get a list of authors that we then make distinct and order. Hilariously,
  // I have forgetten that first names often come first, so unfortunately, the authors are sorted
  // by first names and I'm unfortunately too short on time constraints to fix this
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
