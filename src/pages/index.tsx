import { type NextPage } from "next";
import { ReactNode, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import CategoryCard from "../components/CategoryCard";
import { api } from "../utils/api";
import { ClipLoader } from "react-spinners";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Link from "next/link";
import { useRouter } from "next/router";

const categories = [
  { title: "Hoodies", href: "/search-results/_?tags=hoodies" },
  { title: "Blankets", href: "/search-results/_?tags=Blankets" },
  { title: "Puzzles", href: "/search-results/_tags=Puzzles" },
];
const Home: NextPage = () => {
  const [selectedItem, setSelectedItem] = useState(0);
  const router = useRouter();
  const { data, isLoading } = api.printify.getPrintifyShopProducts.useQuery();

  if (isLoading)
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-skin-main">
        <ClipLoader size={200} color={"white"} />
      </div>
    );
  return (
    <>
      <Head>
        <title>Online Shop</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-screen bg-skin-main text-white">
        {/* First section - Gallery of products */}
        <div className="py-20">
          <h2 className="text-center text-3xl font-medium ">
            Featured Products
          </h2>
          <div className="flex flex-wrap justify-center bg-white">
            {!isLoading && data ? (
              <Carousel
                showArrows={true}
                selectedItem={selectedItem}
                swipeable
                className="w-3/4 xl:w-1/4"
                showThumbs={false}
                renderIndicator={(e, isSelected, index) => {
                  return (
                    <li
                      value={index}
                      role="button"
                      onClick={() => {
                        setSelectedItem(index);
                      }}
                      className={`${
                        isSelected ? "border-2 border-white" : null
                      } mx-2 inline-block h-2 w-2 rounded-full bg-black duration-150`}
                    ></li>
                  );
                }}
                autoPlay
                infiniteLoop
                onClickItem={(_, product) => {
                  const prod = product as { props: { href: string } };
                  router.push(prod.props.href);
                }}
                emulateTouch
              >
                {data.data.map((product) => (
                  <Link href={`/product/${product.id}`} key={product.id}>
                    <Image
                      src={product.images[0]?.src as string}
                      alt={product.title}
                      className="w-full object-cover"
                      width={1920}
                      height={1080}
                    />
                  </Link>
                ))}
              </Carousel>
            ) : (
              <div className="w-1/3 p-4">
                <ClipLoader color="white" />
              </div>
            )}
          </div>
        </div>

        {/* Second section - Categories of clothing */}
        <div className="py-20">
          <h2 className="text-center text-3xl font-medium ">Categories</h2>
          <div className="flex flex-wrap justify-center">
            {categories.map((category) => (
              <CategoryCard
                key={category.title}
                href={category.href}
                title={category.title}
                src={
                  "https://images-api.printify.com/mockup/63efefd567339f06780ed876/75760/54942/canvas-gallery-wraps.jpg"
                }
              />
            ))}
          </div>
        </div>

        {/* Third section - User reviews */}
        <div className="py-20">
          <h2 className="text-center text-3xl font-medium ">User Reviews</h2>
          <div className="flex flex-col justify-center md:flex-row">
            <div className="p-4 md:w-1/3">
              <Image
                src={data?.data[1]?.images[0]?.src as string}
                alt="User 1"
                width={500}
                height={500}
                className="h-64 w-full object-cover"
              />
            </div>
            <div className="p-4 md:w-2/3">
              <h3 className="text-xl font-medium ">User 1</h3>
              <p className="">
                "I recently purchased a hoodie from this store and I am very
                happy with the quality of the product. The material is soft and
                comfortable, and the sizing was accurate. I would definitely
                recommend this store to anyone looking for great clothing
                items."
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-center md:flex-row">
            <div className="p-4 md:w-1/3">
              <Image
                src={data?.data[1]?.images[0]?.src as string}
                alt="User 2"
                height={500}
                width={500}
                className="h-64 w-full object-cover"
              />
            </div>
            <div className="p-4 md:w-2/3">
              <h3 className="text-xl font-medium ">User 2</h3>
              <p className="">
                "I love shopping at this store! They always have the latest
                styles and the prices are very reasonable. I have never had any
                issues with their customer service and the shipping is always
                fast. I highly recommend this store!"
              </p>
            </div>
          </div>
        </div>
        {/* Footer */}
        <div className="bg-gray-900 py-10 ">
          <div className="mx-auto flex max-w-4xl justify-between px-4">
            <div className="text-sm ">
              <a href="#" className="mx-2 hover:text-white">
                Facebook
              </a>
              <a href="#" className="mx-2 hover:text-white">
                Twitter
              </a>
              <a href="#" className="mx-2 hover:text-white">
                Instagram
              </a>
            </div>
            <div className="text-sm">&copy; 2023 Online Clothing Store</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
