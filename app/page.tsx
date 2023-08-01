import React, { useEffect } from "react";

import { PostsWithPagination } from "@/types";

import { Banner } from "./components/Banner";
import { CardHighlight } from "./components/CardHighlight";
import { Marquee } from "./components/Marquee";

import { CurrencyAndRiverSwiper } from "./features/CurrencyAndRiverSwiper";
import { PostsGrid } from "./features/PostsGrid";
import { PostsHighlight } from "./features/PostsHighlight";
import { PostsSuperHighlight } from "./features/PostsSuperHighlight";

const apiUrl = `https://k3gj5umrp4.execute-api.us-east-1.amazonaws.com/api`;

async function fetchPosts() {
  const res = await fetch(`${apiUrl}/posts`);

  if (!res.ok) {
    console.log("error");
    return;
  }

  return res.json();
}

async function fetchDataCurrency() {
  const res = await fetch(`https://www.dolarsi.com/api/api.php?type=dolar`);
  const res2 = await fetch(
    `https://www.dolarsi.com/api/api.php?type=cotizador`
  );

  if (!res.ok || !res2.ok) {
    console.log("error");
    return;
  }

  const data = await res.json();

  const data2 = await res2.json();

  return [
    ...data.filter(
      (curr: any) =>
        curr.casa?.nombre.includes("Oficial") ||
        curr.casa?.nombre?.includes("Blue")
    ),
    ...data2.filter(
      (curr: any) =>
        curr.casa?.nombre.includes("Peso Uruguayo") ||
        curr.casa?.nombre?.includes("Real")
    ),
  ];
}

export default async function Home() {
  const postsWithPagination = (await fetchPosts()) as PostsWithPagination;
  const dataCurrency = await fetchDataCurrency();

  return (
    <div className="flex flex-col gap-5">
      {/* SUPERHIGHLIGHT SECTION */}
      <section className="flex flex-col gap-5">
        <PostsSuperHighlight posts={postsWithPagination} />
      </section>

      {/* MARQUEE & BANNER SECTION */}
      <section className="flex flex-col gap-5">
        <Marquee
          titles={postsWithPagination.docs.map((post: any) => post.title)}
        />

        <Banner
          url="https://cms-el-heraldo-prod.s3.us-east-1.amazonaws.com/cartelera/2023/06/05__ELHERALDO_TPA_ABRIL.gif"
          title="titulo"
          className="container mx-auto"
        />
      </section>

      {/* HIGHLIGHT SECTION */}
      <section className="container mx-auto">
        <PostsHighlight posts={postsWithPagination} />
      </section>

      {/* BANNERS & CURRENCY SECTION */}
      <section className="flex flex-col gap-5 container mx-auto">
        <Banner
          url="https://cms-el-heraldo-prod.s3.us-east-1.amazonaws.com/cartelera/2023/06/05__bannerweb970x90px_GIF.gif"
          title="titulo"
          imageWidth="100%"
        />

        <CurrencyAndRiverSwiper dataCurrency={dataCurrency} dataRiver={[]} />

        <Banner
          url="https://cms-el-heraldo-prod.s3.us-east-1.amazonaws.com/avisos/2023/07/19_El-Heraldo_endulzate.gif"
          title="titulo"
          imageWidth="100%"
        />
      </section>

      {/* POSTS GRID SECTION */}
      <section className="container mx-auto">
        <PostsGrid
          {...postsWithPagination}
          aside={
            <Banner
              title="Publicidad"
              url="https://cms-el-heraldo-prod.s3.us-east-1.amazonaws.com/cartelera/2023/06/05_Banner265x620BotUn.jpg"
              className="max-h-[700px] object-contain px-5"
              sticky
              border
            />
          }
        />
      </section>
    </div>
  );
}
