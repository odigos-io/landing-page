import ImageUrlBuilder from "@sanity/image-url";
import { createClient, groq } from "next-sanity";
import clientConfig from "./config/client-config";

export async function getPosts() {
  return createClient(clientConfig).fetch(groq`*[_type == "post"] {
    title,
    metadata,
    slug,
    tags,
    author->{
      _id,
      name,
      slug,
      image,
      bio
    },
    mainImage,
    publishedAt,
    body
  }`);
}

export async function getPost(slug: string) {
  return createClient(clientConfig).fetch(
    groq`*[_type == "post" && slug.current == $slug] {
      _id,
      title,
      metadata,
      slug,
      tags,
      author->{
        _id,
        name,
        slug,
        image,
        bio
      },
      mainImage,
      publishedAt,
      body
    }[0]`,
    { slug }
  );
}

export function imageBuilder(source) {
  return ImageUrlBuilder(clientConfig).image(source);
}
  