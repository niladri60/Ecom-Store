import Footer from '../common/Footer'
import { MainCarousel } from '../common/MainCarousel'
import TopHeader from '../common/TopHeader'
import CategoryList from '../common/CategoryList'
import ProductPreview from '../common/ProductPreview'
import PromoSection from '../common/PromoSection'
import BannerOffer from '../common/BannerOffer'
import IncentiveSection from '../common/incentiveSection'
import Service from '../common/Service'

const Home = () => {

  return (
    <>
      <TopHeader/>
      <MainCarousel/>
      <CategoryList/>
      <ProductPreview/>
      <PromoSection/>
      <BannerOffer/>
      <IncentiveSection/>
      <Service/>
      <Footer />
    </>
  );
}

export default Home