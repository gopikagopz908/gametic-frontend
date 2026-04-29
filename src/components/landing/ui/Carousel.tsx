import CategoryCard from "./CategoryCard";

interface SportData {
  title: string;
  subtitle: string;
  category: string;
  imageUrl: string;
  categoryColor: string;
}

const Carousel = () => {
  const sportsData: SportData[] = [
    {
      title: "Cricket",
      subtitle: "Explore the world of cricket with latest matches and updates",
      category: "Sports",
      imageUrl:
        "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      categoryColor: "#998869",
    },
    {
      title: "Football",
      subtitle:
        "Experience the thrill of football with live scores and highlights",
      category: "Sports",
      imageUrl:
        "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      categoryColor: "#2E7D32",
    },
    {
      title: "Basketball",
      subtitle: "Slam dunk into the exciting world of basketball action",
      category: "Sports",
      imageUrl:
        "https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      categoryColor: "#FF6B35",
    },
    {
      title: "Tennis",
      subtitle: "Serve up some excitement with professional tennis coverage",
      category: "Sports",
      imageUrl:
        "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      categoryColor: "#7B1FA2",
    },
    {
      title: "Swimming",
      subtitle: "Dive into competitive swimming and aquatic sports",
      category: "Aquatic",
      imageUrl:
        "https://images.unsplash.com/photo-1530549387789-4c1017266635?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      categoryColor: "#0277BD",
    },
    {
      title: "Baseball",
      subtitle: "Home run into America's favorite pastime",
      category: "Sports",
      imageUrl:
        "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      categoryColor: "#D32F2F",
    },
    {
      title: "Golf",
      subtitle: "Tee off with professional golf tournaments and courses",
      category: "Sports",
      imageUrl:
        "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      categoryColor: "#388E3C",
    },
    {
      title: "Boxing",
      subtitle: "Step into the ring with intense boxing matches",
      category: "Combat",
      imageUrl:
        "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      categoryColor: "#BF360C",
    },
    {
      title: "Cycling",
      subtitle: "Pedal through exciting cycling races and tours",
      category: "Endurance",
      imageUrl:
        "https://images.unsplash.com/photo-1545575439-3261931f52f1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGN5Y2xpbmd8ZW58MHx8MHx8fDA%3D",
      categoryColor: "#F57C00",
    },
    {
      title: "Volleyball",
      subtitle: "Spike your way through beach and indoor volleyball",
      category: "Team Sport",
      imageUrl:
        "https://images.unsplash.com/photo-1547347298-4074fc3086f0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      categoryColor: "#E91E63",
    },
  ];

  return (
    <div className="carousel carousel-center w-full space-x-4 p-4 bg-transparent pl-20 mb-20">
      {sportsData.map((sport, index) => {
        return (
          <div className="carousel-item" key={index}>
            <CategoryCard
              title={sport.title}
              subtitle={sport.subtitle}
              imageUrl={sport.imageUrl}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Carousel;
