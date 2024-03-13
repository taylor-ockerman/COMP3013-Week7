import DOMAIN from "../../services/endpoint";
import axios from "axios";
import { ArticleCardImage } from "../../components/misc/ArticleCardImage";
import { SimpleGrid, Container, Loader } from "@mantine/core";
import { useLoaderData, defer, Await } from "react-router-dom";
import React from "react";
import { Suspense } from "react";

// export const postsLoader = async () => {
//   const postPromise = () => axios.get(`${DOMAIN}/api/posts`).then((res) => res.data).catch((err) => err);
//   console.log("Posts loader ran!");
//   return defer({posts:postPromise()});
// };
// 
// export const PostGrid = () => {
//   const data = useLoaderData();
//   console.log(data.posts);
//   return (
//     <SimpleGrid cols={3}>
//       <Suspense fallback={<Loader color="blue" />}>
//         <Await resolve={data.posts} errorElement={<p>not loading</p>}>
//           {/* Why does Await not actually wait for the defer? it executes block right away.... */}
//           {console.log(data.posts)}
//           {data.posts.result?.map((post) => (
//             <ArticleCardImage key={post.title} {...post} />
//           ))}
//         </Await>
//       </Suspense>
//     </SimpleGrid>
//   )
// }

// export const PostPage = () => {
//   const data = useLoaderData();
//   console.log(data);
//   return (
//     <Container>
//       <PostGrid />
//     </Container>
//   );
// };

export const postsLoader = async () => {
  const res = await axios.get(`${DOMAIN}/api/posts`);
  console.log("Posts loader ran!");
  return res.data;
};

export const PostPage = () => {
  const posts = useLoaderData();
  return (
    <Container>
      <SimpleGrid cols={3}>
        {posts?.map((post) => (
          <ArticleCardImage key={post.title} {...post} />
        ))}
      </SimpleGrid>
    </Container>
  );
};
