
interface BannerProps {
  title: string;
}

const Banner = ({title}: BannerProps) => (
  <h1 className = "text-4xl p-5 font-bold">
    { title }
  </h1>
);

export default Banner;
