import { Link } from "react-router-dom";
import DOMAIN from "../../services/endpoint";
import axios from "axios";
import { Skeleton, Button, Text, Container, Group, Stack, Image } from '@mantine/core';
import React from "react";
import { useLoaderData } from "react-router-dom";
import useBoundStore from "../../store/Store";



function PostDetailsPage() {
  const {user} = useBoundStore((state) => state);
  
  const data = useLoaderData().result;
  const userName = data.user.split('@')[0];
  const p = data.post;
  //console.log(data.user);
  const handleEdit = (p) => {
    
  }
  return (
    <>
      <Container>
        <Group>
          <Stack>
            <Text
              placeholder="Input placeholder"
            />Author: {userName}<Text
              placeholder="Input placeholder"
            />Title: {p.title}<Text
              placeholder="Input placeholder"
            />Category: {p.category}<Text
              placeholder="Input placeholder"
            />Content: {p.content}<Text
              placeholder="Input placeholder"
            />
          </Stack>
          <Image h={400} radius="md" src={p.image} />
        </Group>
        <Group mt="md">
          <Button>
            <Link to="/posts">Back to Posts</Link>
          </Button>
          {user.id == p.userId && <Button color="red">
            <Link onClick={handleEdit(p)} to='edit'>Edit</Link>
          </Button>}
        </Group>
      </Container>
    </>
  );
}

export const postDetailsLoader = async ({ params }) => {
  //console.log(params.id);
  const res = await axios.get(`${DOMAIN}/api/posts/${params.id -1}`);
  console.log("Details loader ran!");
  return res.data;
};

export default PostDetailsPage;
