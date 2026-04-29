const Footer = () => {
  return (
    <div className=" mt-10 text-center">
      <div>
        <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-16">
          <h1>Have any Questions?</h1>
          <h1>We are here</h1>
        </div>
        <button className="py-3 px-10 text-white bg-[#00423d] shadow-sm rounded-full font-medium">
          Get in touch
        </button>
      </div>
      <div className="w-full flex items-center overflow-hidden">
        <h1 className="w-full font-black text-[370px] leading-none text-center bg-[url('https://images.unsplash.com/photo-1609773335024-be4301497ea9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center bg-clip-text text-transparent ">
          Gametic
        </h1>
      </div>
    </div>
  );
};

export default Footer;
