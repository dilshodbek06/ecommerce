import Header from "@/components/shared/Header";
import Hero from "@/components/shared/Hero";
import HomeCategories from "@/components/shared/HomeCategories";
import HomeProducts from "@/components/shared/HomeProducts";

function Home() {
  return (
    <div>
      <Header />
      <Hero />
      <HomeCategories />
      <HomeProducts />
    </div>
  );
}

export default Home;
