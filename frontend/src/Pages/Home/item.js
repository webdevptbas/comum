import slide1 from "../../Images/Carousel/slide1.png";
import slide2 from "../../Images/Carousel/slide2.jpeg";
import slide3 from "../../Images/Carousel/slide3.png";
import slide4 from "../../Images/Carousel/slide4.png";
import slide1_mobile from "../../Images/Carousel/slide1_mobile.png";
import slide2_mobile from "../../Images/Carousel/slide2_mobile.jpeg";
import slide3_mobile from "../../Images/Carousel/slide3_mobile.png";
import slide4_mobile from "../../Images/Carousel/slide4_mobile.png";
import CyclingIcon from "../../Icons/Category/new_cycling_icon.svg";
import RunningIcon from "../../Icons/Category/new_running_icon.svg";
import TriathlonIcon from "../../Icons/Category/new_triathlon_icon.svg";
import PadelIcon from "../../Icons/Category/padel_icon.svg";
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
import Adidas from "../../Icons/Brand/Adidas.png";
import Siux from "../../Icons/Brand/Siux.png";
import Babolat from "../../Icons/Brand/Babolat.png";
import Bullpadel from "../../Icons/Brand/Bullpadel.png";
import Head from "../../Icons/Brand/Head.png";
import Nox from "../../Icons/Brand/Nox.png";
import Oxdog from "../../Icons/Brand/Oxdog.png";
import RoyalPadel from "../../Icons/Brand/RoyalPadel.png";
import Odea from "../../Icons/Brand/Odea.png";
import Pulse from "../../Icons/Brand/Pulse.png";
import Spectrum from "../../Icons/Brand/Spectrum.png";
import Sram from "../../Icons/Brand/Sram.png";
import SweetProtection from "../../Icons/Brand/SweetProtection.png";

const slides = [
  {
    src: slide1,
  },
  {
    src: slide2,
  },
  {
    src: slide3,
  },
  {
    src: slide4,
  },
];

const slidesMobile = [
  { src: slide1_mobile },
  { src: slide2_mobile },
  { src: slide3_mobile },
  { src: slide4_mobile },
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
    src: PadelIcon,
    alt: "Padel Products",
    type: "padel",
    title: "PADEL PRODUCTS",
    subtitle:
      "Find high-quality padel equipment to support every step toward the finish line.",
  },
  // {
  //   src: RunningIcon,
  //   alt: "Running Products",
  //   type: "running",
  //   title: "RUNNING PRODUCTS",
  //   subtitle:
  //     "Find high-quality running equipment to support every step toward the finish line.",
  // },
  // {
  //   src: TriathlonIcon,
  //   alt: "Triathlon Products",
  //   type: "triathlon",
  //   title: "TRIATHLON PRODUCTS",
  //   subtitle:
  //     "Gear up with premium triathlon essentials to achieve your best in all three disciplines.",
  // },
];

const brands = [
  { src: Adidas, alt: "Adidas", igUrl: null, type: "padel", priority: true },
  { src: Babolat, alt: "Babolat", igUrl: null, type: "padel", priority: true },
  {
    src: Bont,
    alt: "Bont",
    igUrl: "https://www.instagram.com/bontcycling_id/",
    type: "cycling",
    priority: true,
  },
  {
    src: Bullpadel,
    alt: "Bullpadel",
    igUrl: null,
    type: "padel",
    priority: true,
  },
  { src: CBear, alt: "CBear", igUrl: null, type: "cycling", priority: false },
  {
    src: Campagnolo,
    alt: "Campagnolo",
    igUrl: null,
    type: "cycling",
    priority: true,
  },
  {
    src: Castelli,
    alt: "Castelli",
    igUrl: "https://www.instagram.com/castelliindonesia/",
    type: "cycling",
    priority: true,
  },
  {
    src: CeramicSpeed,
    alt: "Ceramic Speed",
    igUrl: null,
    type: "cycling",
    priority: false,
  },
  {
    src: Colnago,
    alt: "Colnago",
    igUrl: null,
    type: "cycling",
    priority: false,
  },
  {
    src: Continental,
    alt: "Continental",
    igUrl: null,
    type: "cycling",
    priority: false,
  },
  { src: Fizik, alt: "Fizik", igUrl: null, type: "cycling", priority: false },
  { src: Garmin, alt: "Garmin", igUrl: null, type: "cycling", priority: false },
  // { src: Guee, alt: "Guee", igUrl: null, type: "cycling", priority: false },
  { src: Head, alt: "Head", igUrl: null, type: "padel", priority: true },
  {
    src: Met,
    alt: "Met Helmet",
    igUrl: "https://www.instagram.com/met_helmets_id/",
    type: "cycling",
    priority: true,
  },
  { src: Moon, alt: "Moon", igUrl: null, type: "cycling", priority: false },
  {
    src: MucOFF,
    alt: "Muc-OFF",
    igUrl: null,
    type: "cycling",
    priority: false,
  },
  {
    src: NovaRide,
    alt: "Nova Ride",
    igUrl: null,
    type: "cycling",
    priority: false,
  },
  { src: Nox, alt: "Nox", igUrl: null, type: "padel", priority: true },
  { src: Oxdog, alt: "Oxdog", igUrl: null, type: "padel", priority: true },
  // { src: Odea, alt: "Odea", igUrl: null, type: "padel", priority: true },
  {
    src: Pinarello,
    alt: "Pinarello",
    igUrl: true,
    type: "cycling",
    priority: false,
  },
  {
    src: Pirelli,
    alt: "Pirelli",
    igUrl: null,
    type: "cycling",
    priority: false,
  },
  { src: Pulse, alt: "Pulse", igUrl: null, type: "padel", priority: true },
  {
    src: RoyalPadel,
    alt: "Royal Padel",
    igUrl: null,
    type: "padel",
    priority: true,
  },
  {
    src: Santini,
    alt: "Santini",
    igUrl: "https://www.instagram.com/santini_id/",
    type: "cycling",
    priority: true,
  },
  {
    src: Shimano,
    alt: "Shimano",
    igUrl: null,
    type: "cycling",
    priority: false,
  },
  { src: Siux, alt: "Siux", igUrl: null, type: "padel", priority: true },
  { src: Smith, alt: "Smith", igUrl: null, type: "cycling", priority: false },
  {
    src: Specialized,
    alt: "Specialized",
    igUrl: null,
    type: "cycling",
    priority: false,
  },
  {
    src: Spectrum,
    alt: "Spectrum",
    igUrl: "",
    type: "cycling",
    priority: false,
  },
  {
    src: Sram,
    alt: "Sram",
    igUrl: "",
    type: "cycling",
    priority: false,
  },
  {
    src: SweetProtection,
    alt: "Sweet Protection",
    igUrl: "",
    type: "cycling",
    priority: false,
  },
  { src: Velox, alt: "Velox", igUrl: null, type: "cycling", priority: false },
  {
    src: Vittoria,
    alt: "Vittoria",
    igUrl: null,
    type: "cycling",
    priority: false,
  },
  { src: Wahoo, alt: "Wahoo", igUrl: null, type: "cycling", priority: false },
];

export { slides, slidesMobile, categories, brands };
