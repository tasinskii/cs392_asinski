
interface BannerProps {
  title: string;
}


const Banner = ({title}: BannerProps) => {

  return (
    <div className="p-2 flex gap-4">
      <h1 className = "text-4xl p-5 font-bold">
        {title} 
      </h1>
    </div>
  );
};

export default Banner;



