import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { PostAuthor } from './PostEntity';

interface SelectableAuthorProps {
  author: PostAuthor;
  selected: boolean;
  onTouch(id: string): void;
}

export default function SelectableAuthor(props: SelectableAuthorProps) {
  return (
    <TouchableOpacity onPress={() => props.onTouch(props.author.id)}>
      <Text
        style={
          props.selected ? { backgroundColor: '#335', color: 'white' } : {}
        }
      >
        {props.author.name}
      </Text>
    </TouchableOpacity>
  );
}
