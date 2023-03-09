import Head from "next/head";
import { Box, Button } from "@mui/material";
import Link from "next/link";
// import Image from "next/image";

// import pizzaBanner from "../src/images/pizzaBanner.png";
import Header from "../src/components/header";

export default function Home() {

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <main>
        <Header />
        <Box
          sx={{            
            display: "flex",
            width: "100%",
            height: "100vh",
          }}
        >
          <Button
            sx={{
              color: "white",
              borderColor: "white",
              display: "flex",
              alignSelf: "end",
            }}
            variant="outlined"
          >
            <Link href={'/pizzas'}>Menu</Link>
          </Button>
        </Box>
      </main>
    </>
  );
}
