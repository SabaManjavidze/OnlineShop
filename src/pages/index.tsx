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
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { LOREM_IPSUM, SIZES_PROP } from "@/utils/constants";
import UserReviewCard from "@/components/general/UserReviewCard";
import type { UserReview } from "@/utils/types/types";
import { nanoid } from "nanoid";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AiOutlineCloudUpload } from "react-icons/ai";

const pricingPlans = [
  {
    id: 1,
    title: "Standart",
    price: 10,
    highlited: false,
    features: [
      {
        id: 1,
        title: "Unlimited Images",
      },
      {
        id: 2,
        title: "Unlimited Images",
      },
      {
        id: 3,
        title: "Unlimited Images",
      },
      {
        id: 4,
        title: "Unlimited Images",
      },
      {
        id: 5,
        title: "Unlimited Images",
      },
      {
        id: 6,
        title: "Unlimited Images",
      },
    ],
  },
  {
    id: 2,
    title: "Proffesional",
    price: 20,
    highlited: true,
    features: [
      {
        id: 1,
        title: "Unlimited Images",
      },
      {
        id: 2,
        title: "Unlimited Images",
      },
      {
        id: 3,
        title: "Unlimited Images",
      },
      {
        id: 4,
        title: "Unlimited Images",
      },
      {
        id: 5,
        title: "Unlimited Images",
      },
      {
        id: 6,
        title: "Unlimited Images",
      },
    ],
  },
  {
    id: 1,
    title: "Expert",
    price: 30,
    highlited: false,
    features: [
      {
        id: 1,
        title: "Unlimited Images",
      },
      {
        id: 2,
        title: "Unlimited Images",
      },
      {
        id: 3,
        title: "Unlimited Images",
      },
      {
        id: 4,
        title: "Unlimited Images",
      },
      {
        id: 5,
        title: "Unlimited Images",
      },
      {
        id: 6,
        title: "Unlimited Images",
      },
    ],
  },
];
const styles = [
  {
    title: "Creative",
    id: 1,
  },
  {
    title: "Space",
    id: 2,
  },
  {
    title: "Galaxy",
    id: 3,
  },
  {
    title: "Dog",
    id: 4,
  },
];
const userReviews: UserReview[] = [
  {
    desc: LOREM_IPSUM,
    rating: 5,
    user: {
      picture:
        "https://images-api.printify.com/mockup/63fe7544bdb6399f6f0c91a7/32912/98424/unisex-heavy-blend-hooded-sweatshirt.jpg?camera_label=front",
      name: "gela",
    },
  },
  {
    desc: LOREM_IPSUM,
    rating: 5,
    user: {
      picture:
        "https://images-api.printify.com/mockup/63fe7544bdb6399f6f0c91a7/32912/98424/unisex-heavy-blend-hooded-sweatshirt.jpg?camera_label=front",
      name: "gocha",
    },
  },
  {
    desc: LOREM_IPSUM,
    rating: 5,
    user: {
      picture:
        "https://images-api.printify.com/mockup/63fe7544bdb6399f6f0c91a7/32912/98424/unisex-heavy-blend-hooded-sweatshirt.jpg?camera_label=front",
      name: "geimeri",
    },
  },
  {
    desc: LOREM_IPSUM,
    rating: 5,
    user: {
      picture:
        "https://images-api.printify.com/mockup/63fe7544bdb6399f6f0c91a7/32912/98424/unisex-heavy-blend-hooded-sweatshirt.jpg?camera_label=front",
      name: "geimeri",
    },
  },
  {
    desc: LOREM_IPSUM,
    rating: 4,
    user: {
      picture:
        "https://images-api.printify.com/mockup/63fe7544bdb6399f6f0c91a7/32912/98424/unisex-heavy-blend-hooded-sweatshirt.jpg?camera_label=front",
      name: "geimeri",
    },
  },
  {
    desc: LOREM_IPSUM,
    rating: 1,
    user: {
      picture:
        "https://images-api.printify.com/mockup/63fe7544bdb6399f6f0c91a7/32912/98424/unisex-heavy-blend-hooded-sweatshirt.jpg?camera_label=front",
      name: "geimeri",
    },
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
      <div className="radial-gradient relative flex h-screen w-full flex-col items-center">
        <div className="flex w-full flex-col items-center text-center">
          <h1 className="mt-52 w-1/2 text-7xl font-medium leading-snug">
            Art it up , but we are still working on it
          </h1>
          <p className="w-2/5 py-3 text-sm text-muted-foreground">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s
          </p>
        </div>
        <div className="flex w-full justify-center pt-2">
          <div className="relative flex w-2/5 flex-col">
            <div className="relative">
              <Input
                className="rounded-3xl bg-primary py-8 text-secondary-foreground"
                placeholder="Describe what you want"
              />
              <Button
                variant={"outline"}
                className="absolute right-5 top-1/2 -translate-y-1/2 rounded-xl bg-background text-primary"
              >
                Generate
              </Button>
            </div>
            <div className="flex w-full justify-between px-2 pt-2">
              <Button
                variant={"outline"}
                className="text-md rounded-2xl bg-background py-6 text-primary-foreground"
              >
                <AiOutlineCloudUpload className="mr-2" size={25} />
                Upload a photo
              </Button>
              <div className="flex items-center">
                <p className="mr-3">Styles:</p>
                <div>
                  {styles.map((style) => (
                    <Button
                      key={style.id}
                      className="mx-1 rounded-xl bg-background/20 text-primary-foreground before:inset-0 hover:bg-background/40"
                    >
                      {style.title}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="min-h-screen bg-background text-primary-foreground">
        {/* Second section - Gallery of products */}
        <div className="py-20">
          <h2 className="py-10 text-center text-4xl font-semibold text-primary-foreground">
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
                    className={`${
                      hasNext ? "block" : "hidden"
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
                    className={`${
                      hasPrev ? "block" : "hidden"
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

        {/* Third section - user reviews */}
        <div className="gradient-section pb-10">
          <div className="container">
            <div className="flex w-full justify-start">
              <h2 className="py-10 text-center text-4xl font-semibold text-primary-foreground">
                Customer Feedback
              </h2>
            </div>
            <div className="grid w-full grid-cols-3 grid-rows-2 gap-5">
              {userReviews.map((review) => (
                <UserReviewCard review={review} key={nanoid()} />
              ))}
            </div>
          </div>
        </div>
        {/* Fourth section - pricing plans*/}
        <div className="pb-10">
          <div className="container-xl">
            <div className="flex w-full flex-col items-center">
              <h2 className="pt-10 text-center text-4xl font-semibold text-primary-foreground">
                Pricing Plans
              </h2>
              <p className="mt-1 w-56 text-center text-sm text-muted-foreground">
                Choose the type of payment that is more acceptable to you
              </p>
            </div>
            <div className="container mx-auto md:px-6">
              <section>
                <div className="my-6 flex justify-center">
                  <Button
                    className="mr-1 rounded-xl px-6 font-light"
                    size="slim"
                    variant={"accent"}
                  >
                    Monthly
                  </Button>
                  <Button
                    className="ml-1 rounded-xl border-primary"
                    variant="outline"
                    size="slim"
                  >
                    Annual
                    <p className="pl-1 text-accent-foreground">-20%</p>
                  </Button>
                </div>

                <div className="mt-10">
                  <div
                    className="hidden opacity-100 transition-opacity duration-150 ease-linear data-[te-tab-active]:block"
                    role="tabpanel"
                    aria-labelledby="pills-home-tab02"
                    data-te-tab-active
                  >
                    <div className="grid gap-6 lg:grid-cols-3 lg:gap-x-12">
                      {pricingPlans.map((plan) => (
                        <div className="mb-6 lg:mb-0" key={plan.id}>
                          <div
                            className={`relative block h-full rounded-[55px] bg-white dark:bg-neutral-700 ${
                              plan.highlited
                                ? "shadow-2xl shadow-accent/50"
                                : "shadow-xl shadow-primary/20"
                            }`}
                          >
                            <div className="border-b-2 border-neutral-100 border-opacity-100 p-6 text-center dark:border-opacity-10">
                              <p className="mb-4 text-sm uppercase">
                                <strong>{plan.title}</strong>
                              </p>
                              <h3 className="mb-6 text-3xl">
                                <strong>$ {plan.price}</strong>
                                <small className="text-base text-neutral-500 dark:text-neutral-300">
                                  /mo
                                </small>
                              </h3>
                            </div>
                            <div className="p-6">
                              <ol className="mb-20 list-inside">
                                {plan.features.map((feature) => (
                                  <li className="mb-4 flex" key={feature.id}>
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke-width="2"
                                      stroke="currentColor"
                                      className="dark:text-primary-400 mr-3 h-5 w-5 text-primary"
                                    >
                                      <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M4.5 12.75l6 6 9-13.5"
                                      />
                                    </svg>
                                    {feature.title}
                                  </li>
                                ))}
                              </ol>

                              <div className="absolute bottom-6 left-10 right-10">
                                <Button
                                  type="button"
                                  variant={
                                    plan.highlited ? "accent" : "outline"
                                  }
                                  className="w-full rounded-xl border-primary py-6"
                                >
                                  Upgrade to {plan.title}
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div
                    className="hidden opacity-0 transition-opacity duration-150 ease-linear data-[te-tab-active]:block"
                    id="pills-profile02"
                    role="tabpanel"
                    aria-labelledby="pills-profile-tab02"
                  >
                    <div className="grid gap-6 lg:grid-cols-3 lg:gap-x-12">
                      <div className="mb-6 lg:mb-0">
                        <div className="block h-full border-2 border-primary bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                          <div className="p-6 pt-6 pb-10 text-center">
                            <p className="mb-4 text-sm uppercase">
                              <strong>3 users</strong>
                            </p>
                            <h3 className="mb-6 text-3xl">
                              <strong>$ 799</strong>
                              <small className="text-base text-neutral-500 dark:text-neutral-300">
                                /year
                              </small>
                            </h3>

                            <button
                              type="button"
                              className="text-primary-700 inline-block w-full rounded bg-[hsl(0,0%,95%)] px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal transition duration-150 ease-in-out hover:bg-[hsl(0,0%,93%)] focus:bg-[hsl(0,0%,95%)] focus:outline-none focus:ring-0 active:bg-[hsl(0,0%,90%)]"
                              data-te-ripple-init
                              data-te-ripple-color="light"
                            >
                              Buy
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="mb-6 lg:mb-0">
                        <div className="rondedbg-white rounded-x  border-primaryl block h-full border-2 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                          <div className="p-6 pt-6 pb-10 text-center">
                            <p className="mb-4 text-sm uppercase">
                              <strong>4 users</strong>
                            </p>
                            <h3 className="mb-6 text-3xl">
                              <strong>$ 999</strong>
                              <small className="text-base text-neutral-500 dark:text-neutral-300">
                                /year
                              </small>
                            </h3>

                            <button
                              type="button"
                              className="text-primary-700 inline-block w-full rounded bg-[hsl(0,0%,95%)] px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal transition duration-150 ease-in-out hover:bg-[hsl(0,0%,93%)] focus:bg-[hsl(0,0%,95%)] focus:outline-none focus:ring-0 active:bg-[hsl(0,0%,90%)]"
                              data-te-ripple-init
                              data-te-ripple-color="light"
                            >
                              Buy
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="mb-6 lg:mb-0">
                        <div className="block h-full border-2 border-primary bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                          <div className="p-6 pt-6 pb-10 text-center">
                            <p className="mb-4 text-sm uppercase">
                              <strong>More users</strong>
                            </p>
                            <h3 className="mb-6 text-3xl">
                              <strong>Custom offer</strong>
                            </h3>

                            <button
                              type="button"
                              className="hover:bg-primary-600 focus:bg-primary-600 active:bg-primary-700 inline-block w-full rounded bg-primary px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                              data-te-ripple-init
                              data-te-ripple-color="light"
                            >
                              Contact us
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
