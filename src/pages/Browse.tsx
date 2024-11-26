import { useState } from "react";
import Navigation from "@/components/landing/Navigation";
import ClassGrid from "@/components/landing/ClassGrid";
import Footer from "@/components/landing/Footer";

const Browse = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("featured");

  return (
    <div className="min-h-screen bg-neutral-100">
      <Navigation />
      <main className="pt-32 pb-16 container-padding">
        <h1 className="heading-lg mb-8">Browse Classes</h1>
        <div className="mb-8">
          <select 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 rounded-lg border border-neutral-200 bg-white"
          >
            <option value="featured">Featured Classes</option>
            <option value="Ceramics">Ceramics</option>
            <option value="Painting">Painting</option>
            <option value="Cooking">Cooking</option>
          </select>
        </div>
        <ClassGrid category={selectedCategory} />
      </main>
      <Footer />
    </div>
  );
};

export default Browse;