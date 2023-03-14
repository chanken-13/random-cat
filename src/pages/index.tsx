import { useState } from "react";
import type { NextPage, GetServerSideProps } from "next";

// Type
interface CatCategory {
  id: number;
  name: string;
}
interface SearchCatImage {
  breeds: string[];
  categories: CatCategory[];
  id: string;
  url: string;
  width: number;
  height: number;
}
type SearchCatImageResponse = SearchCatImage[];

const fetchCatImage = async (): Promise<SearchCatImage> => {
  const res = await fetch("https://api.thecatapi.com/v1/images/search");
  const result = (await res.json()) as SearchCatImageResponse;
  return result[0];
};

// // export
// const IndexPage = () => {
//   // 画像URL
//   const [catImageUrl, setCatImageUrl] = useState(
//     "https://cdn2.thecatapi.com/images/bpc.jpg"
//   );
//   // クリック処理
//   const handleClick = async () => {
//     const image = await fetchCatImage();
//     setCatImageUrl(image.url);
//   };
//   // return
//   return (
//     <div>
//       <button onClick={handleClick}>きょうのにゃんこ🐱</button>
//       <div style={{ marginTop: 8 }}>
//         <img src={catImageUrl} width={500} height="auto" />
//       </div>
//     </div>
//   );
// };
// export default IndexPage;

// getServerSidePropsで初期画像もランダムに表示
interface IndexPageProps {
  initialCatImageUrl: string;
}

const IndexPage: NextPage<IndexPageProps> = ({ initialCatImageUrl }) => {
  const [catImageUrl, setCatImageUrl] = useState(initialCatImageUrl);

  // クリック処理
  const handleClick = async () => {
    const image = await fetchCatImage();
    setCatImageUrl(image.url);
  };

  return (
    <div>
      <button onClick={handleClick}>きょうのにゃんこ🐱</button>
      <div style={{ marginTop: 8 }}>
        <img src={catImageUrl} width={500} height="auto" />
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<IndexPageProps> = async () => {
  const image = await fetchCatImage();
  return {
    props: {
      initialCatImageUrl: image.url,
    },
  };
};

export default IndexPage;
