import Layout from "../components/common/Layout";
import Cards from "../components/home/Cards";

function Home(){
  return(
    <Layout>
      <div className='home-content'>
        <h1>Dashboard</h1>

        <Cards/>
      </div>
    </Layout>
  );
}

export default Home;
