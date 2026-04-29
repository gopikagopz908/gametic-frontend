import Carousel from "./ui/Carousel";

const Category = () => {
  return (
    <>
      <div className="w-full max-w-8xl mx-auto px-4 md:px-20 pt-10">
        {/* Header Section */}
        <div className="mb-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Our Categories
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            We offer a unique blend of inspiring stories and exhilarating sports
            content. We highlight the journeys of athletes who have overcome
            challenges
          </p>
        </div>
      </div>
      <Carousel />
    </>
  );
};

export default Category;
