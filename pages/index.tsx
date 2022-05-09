import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Toaster } from "react-hot-toast";
import { CheckoutCard } from "../components";

const Home = () => {
  return (
    <div className="relative flex min-h-screen w-screen flex-col-reverse items-center bg-darkBlue p-10 sm:flex-row sm:justify-evenly sm:p-20">
      <Head>
        <link rel="icon" href="/icon.svg" />
      </Head>
      <Toaster />
      <div className="absolute top-5 flex items-center justify-center">
        <Link href="/sponsors">
          <a className="text-2xl text-accent hover:underline">Past sponsors</a>
        </Link>
      </div>

      <div className="absolute bottom-0 mt-10 h-28 w-screen rounded-b-lg bg-darkerBlue sm:h-40"></div>
      <div className="mt-20 mb-12 sm:-mb-24 sm:mt-0">
        <Image
          src="/Illustration.svg"
          alt="logo"
          width={500}
          height={430}
          objectFit="contain"
        />
      </div>

      <div className="flex w-screen flex-col items-center sm:h-auto sm:w-auto sm:items-start">
        <div className="relative h-16 w-60">
          <Image src="/logo.svg" alt="logo" layout="fill" objectFit="contain" />
        </div>
        <CheckoutCard />
      </div>
    </div>
  );
};

export default Home;
