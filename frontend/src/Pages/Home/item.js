import slide1 from "../../Images/Carousel/slide1.png";
import slide2 from "../../Images/Carousel/slide2.png";
import slide3 from "../../Images/Carousel/slide3.png";
import slide4 from "../../Images/Carousel/slide4.png";
import slide5 from "../../Images/Carousel/slide5.png";
import CyclingIcon from "../../Icons/Category/new_cycling_icon.svg";
import RunningIcon from "../../Icons/Category/new_running_icon.svg";
import TriathlonIcon from "../../Icons/Category/new_triathlon_icon.svg";
import Castelli from "../../Icons/Brand/castelli.svg";
import Pirelli from "../../Icons/Brand/pirelli.svg";
import Campagnolo from "../../Icons/Brand/campagnolo.svg";
import Met from "../../Icons/Brand/met.svg";
import Bont from "../../Icons/Brand/Bont.png";
import Colnago from "../../Icons/Brand/Colnago.png";
import Shimano from "../../Icons/Brand/Shimano.png";
import Garmin from "../../Icons/Brand/Garmin.png";
import Vittoria from "../../Icons/Brand/Vittoria.png";
import Continental from "../../Icons/Brand/Continental.png";
import Wahoo from "../../Icons/Brand/wahoo.png";
import NovaRide from "../../Icons/Brand/Nova Ride.png";
import Specialized from "../../Icons/Brand/Specialized.png";
import Pinarello from "../../Icons/Brand/Pinarello.png";
import Fizik from "../../Icons/Brand/Fizik.png";
import Smith from "../../Icons/Brand/Smith.png";
import CeramicSpeed from "../../Icons/Brand/Ceramic Speed.png";
import Moon from "../../Icons/Brand/Moon.png";
import Santini from "../../Icons/Brand/Santini.png";
import CBear from "../../Icons/Brand/C bear.png";
import Velox from "../../Icons/Brand/Velox.png";
import MucOFF from "../../Icons/Brand/Muc-OFF.png";
import Guee from "../../Icons/Brand/Guee.png";

const slides = [
  // {
  //   src: slide1,
  //   title: "MET HELMET NEW COLOR",
  //   subtitle: "Met Helmet New Color - Motion Blur",
  //   tagType: "new",
  //   tagText: "New",
  // },
  {
    src: slide2,
    title: "MET HELMET NEW COLOR",
    subtitle: "Met Helmet New Colors - Ultra Lime",
    tagType: "new",
    tagText: "New",
  },
  {
    src: slide3,
    title: "Castelli Prologo 3",
    // subtitle: "Discount Special New Year 2025",
    // tagType: "discount",
    // tagText: "Discount up to 50%",
  },
  {
    src: slide4,
    title: "Bont vaypors",
    // subtitle: "Discount Special New Year 2025",
    // tagType: "discount",
    // tagText: "Discount up to 50%",
  },
  {
    src: slide5,
    title: "MET HELMET NEW COLOR",
    subtitle: "Met Helmet New Colors - Greige",
    tagType: "new",
    tagText: "New",
  },
];

const categories = [
  {
    src: CyclingIcon,
    alt: "Cycling Products",
    type: "cycling",
    title: "CYCLING PRODUCTS",
    subtitle:
      "Discover the best cycling gear to enhance your performance and comfort on every ride.",
  },
  {
    src: RunningIcon,
    alt: "Running Products",
    type: "running",
    title: "RUNNING PRODUCTS",
    subtitle:
      "Find high-quality running equipment to support every step toward the finish line.",
  },
  {
    src: TriathlonIcon,
    alt: "Triathlon Products",
    type: "triathlon",
    title: "TRIATHLON PRODUCTS",
    subtitle:
      "Gear up with premium triathlon essentials to achieve your best in all three disciplines.",
  },
];

const brands = [
  {
    src: Bont,
    alt: "Bont",
    igUrl: "https://www.instagram.com/bontcycling_id/",
  },
  { src: CBear, alt: "CBear" },
  { src: Campagnolo, alt: "Campagnolo" },
  { src: Castelli, alt: "Castelli", igUrl:"https://www.instagram.com/castelliindonesia/" },
  { src: CeramicSpeed, alt: "Ceramic Speed" },
  { src: Colnago, alt: "Colnago" },
  { src: Continental, alt: "Continental" },
  { src: Fizik, alt: "Fizik" },
  { src: Garmin, alt: "Garmin" },
  { src: Guee, alt: "Guee" },
  {
    src: Met,
    alt: "Met Helmet",
    igUrl: "https://www.instagram.com/met_helmets_id/",
  },
  { src: Moon, alt: "Moon" },
  { src: MucOFF, alt: "Muc-OFF" },
  { src: NovaRide, alt: "Nova Ride" },
  { src: Pinarello, alt: "Pinarello" },
  { src: Pirelli, alt: "Pirelli" },
  {
    src: Santini,
    alt: "Santini",
    igUrl: "https://www.instagram.com/santini_id/",
  },
  { src: Shimano, alt: "Shimano" },
  { src: Smith, alt: "Smith" },
  { src: Specialized, alt: "Specialized" },
  { src: Velox, alt: "Velox" },
  { src: Vittoria, alt: "Vittoria" },
  { src: Wahoo, alt: "Wahoo" },
];

export { slides, categories, brands };
