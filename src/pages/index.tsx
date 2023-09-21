import { type NextPage } from "next";
import { ReactNode, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import CategoryCard from "../components/CategoryCard";
import { api } from "../utils/api";
import { Loader2 } from "lucide-react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  BsChevronLeft,
  BsChevronRight,
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { SIZES_PROP } from "@/utils/constants";

const categories = [
  {
    title: "Hoodies",
    href: "/search-results/_?tags=hoodies",
    src: "https://images-api.printify.com/mockup/63fe7544bdb6399f6f0c91a7/32912/98424/unisex-heavy-blend-hooded-sweatshirt.jpg?camera_label=front",
  },
  {
    title: "Blankets",
    href: "/search-results/_?tags=Blankets",
    src: "https://images-api.printify.com/mockup/6496bec0143df791e501b7c6/61281/2907/hooded-blanket.jpg?camera_label=front",
  },
  {
    title: "Puzzles",
    href: "/search-results/_?tags=Puzzles",
    src: "https://images-api.printify.com/mockup/63efe2a05b70b9af05008ed9/72664/16363/puzzle-120-252-500-piece.jpg?camera_label=front",
  },
];
const Home: NextPage = () => {
  const [selectedItem, setSelectedItem] = useState(0);
  const router = useRouter();
  const { data, isLoading } = api.product.getPrintifyShopProducts.useQuery();

  if (isLoading)
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-background">
        <Loader2 size={50} />
      </div>
    );
  return (
    <>
      <Head>
        <title>Online Shop</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-screen bg-background text-primary-foreground">
        {/* First section - Gallery of products */}
        <div className="py-20">
          <h2 className="text-center text-3xl font-medium ">
            Featured Products
          </h2>
          <div className="bg-whiterst:w-full flex flex-wrap justify-center first:w-full">
            {!isLoading && data ? (
              <Carousel
                showArrows={true}
                selectedItem={selectedItem}
                swipeable
                className="w-[90%] px-5"
                showThumbs={false}
                renderArrowNext={(clickHandler, hasNext, label) => (
                  <button
                    type="button"
                    onClick={clickHandler}
                    className={`${hasNext ? "block" : "hidden"
                      } absolute top-1/2 bottom-0 right-0 z-10 mt-0 -translate-y-1/2 p-1`}
                  >
                    <BsChevronRight
                      size={30}
                      className="text-primary duration-150 hover:scale-110"
                    />
                  </button>
                )}
                renderArrowPrev={(clickHandler, hasPrev, label) => (
                  <button
                    type="button"
                    onClick={clickHandler}
                    className={`${hasPrev ? "block" : "hidden"
                      } absolute top-1/2 bottom-0 left-0 z-10 mt-0 -translate-y-1/2 p-1`}
                  >
                    <BsChevronLeft
                      size={30}
                      className="text-primary duration-150 hover:scale-110"
                    />
                  </button>
                )}
                renderIndicator={(e, isSelected, index) => {
                  return (
                    <li
                      value={index}
                      role="button"
                      onClick={() => {
                        setSelectedItem(index);
                      }}
                      className={`${isSelected ? "border-2 border-white" : null
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
                    <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
                      <div className="aspect-h-4 aspect-w-5 relative hidden overflow-hidden rounded-lg lg:block">
                        <Image
                          src={product.images?.[1]?.src || ""}
                          alt={product.images?.[1]?.src || ""}
                          className="h-full w-full object-contain object-center"
                          fill
                          sizes={SIZES_PROP}
                        />
                      </div>

                      <div className="aspect-h-5 aspect-w-4 relative sm:overflow-hidden sm:rounded-lg lg:aspect-h-4 lg:aspect-w-3">
                        <Image
                          src={product.images?.[0]?.src || ""}
                          alt={product.images?.[0]?.src || ""}
                          className="h-full w-full object-contain object-center"
                          sizes={SIZES_PROP}
                          fill
                        />
                      </div>
                    </div>
                  </Link>
                ))}
              </Carousel>
            ) : (
              <div className="w-1/3 p-4">
                <Loader2 />
              </div>
            )}
          </div>
        </div>

        {/* Second section - Categories of clothing */}
        <div className="py-20">
          <h2 className="text-center text-3xl font-medium ">Categories</h2>
          <div className="mt-5 flex flex-wrap justify-center">
            {categories.map((category) => (
              <CategoryCard
                key={category.title}
                href={category.href}
                title={category.title}
                src={category.src}
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
                src={
                  "https://img.freepik.com/free-photo/portrait-dark-skinned-cheerful-woman-with-curly-hair-touches-chin-gently-laughs-happily-enjoys-day-off-feels-happy-enthusiastic-hears-something-positive-wears-casual-blue-turtleneck_273609-43443.jpg"
                }
                alt="User 1"
                width={500}
                height={500}
                className="h-64 w-full object-contain"
              />
            </div>
            <div className="p-4 md:w-2/3">
              <h3 className="w-1/2 border-b pb-3 text-xl font-medium">Leila</h3>
              <p className="mt-10 max-w-xl">
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
                src={
                  "https://st3.depositphotos.com/1017228/18878/i/450/depositphotos_188781580-stock-photo-handsome-cheerful-young-man-standing.jpg"
                }
                alt="User 2"
                height={500}
                width={500}
                className="h-64 w-full object-contain"
              />
            </div>
            <div className="p-4 md:w-2/3">
              <h3 className="w-1/2 border-b pb-3 text-xl font-medium">
                Baxmaro
              </h3>
              <p className="mt-10 max-w-xl">
                "I love shopping at this store! They always have the latest
                styles and the prices are very reasonable. I have never had any
                issues with their customer service and the shipping is always
                fast. I highly recommend this store!"
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
