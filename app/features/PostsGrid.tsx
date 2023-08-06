// posts-grid component by category or position

import React from "react";

import { Post } from "@/types";

import { Card } from "../components/Card";
import { CardGridWithSwiper } from "../components/CardGridWithSwiper";
import { Heading } from "../components/Heading";

interface PostsGridProps {
  posts: Post[];
  title: string;
  extended?: boolean;
}

export const PostsGrid: React.FC<PostsGridProps> = ({ posts, title }) => {
  return (
    <div>
      {posts.length > 0 ? (
        <Heading title={title} link={`/noticias/${posts[0].category?.slug}`} />
      ) : null}
      <CardGridWithSwiper data={posts} />
    </div>
  );
};
