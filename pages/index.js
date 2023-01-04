import Head from "next/head";
import { useQuery, gql } from "@apollo/client";
import { Inter } from "@next/font/google";
import { Grid, GridItem, Heading, Text } from "@chakra-ui/react";

import ConfessionCard from "../components/ConfessionCard";
import ConfessionCardSkeleton from "../components/skeleton/ConfessionCardSkeleton";

const GET_CONFESSIONS = gql`
  query confessions(
    $first: Int
    $skip: Int
    $orderBy: String
    $orderDirection: String
    $where: Confession_filter
  ) {
    confessions(
      first: $first
      skip: $skip
      orderBy: $orderBy
      orderDirection: $orderDirection
      where: $where
    ) {
      id
      hash
      message
      category
      timestamp
      author
    }
  }
`;

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { loading, error, data } = useQuery(GET_CONFESSIONS, {
    variables: {
      first: 10,
      skip: 0,
      orderBy: "timestamp",
      orderDirection: "desc",
    },
  });

  if (error) return <p>Error :(</p>;

  return (
    <div>
      <Head>
        <title>Confesster Dapp</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Grid
          mt="10"
          templateColumns={{
            base: "repeat(1, 1fr)",
            md: "repeat(2, 1fr)",
          }}
          gap={6}
          justifyContent={"center"}
        >
          {loading
            ? new Array(6).fill(0).map((_, index) => (
                <GridItem key={index}>
                  <ConfessionCardSkeleton />
                </GridItem>
              ))
            : data?.confessions?.map((confession, index) => (
                <GridItem colSpan={1} key={confession.id}>
                  <ConfessionCard confession={confession} index={index} />
                </GridItem>
              ))}
        </Grid>
      </main>
    </div>
  );
}
