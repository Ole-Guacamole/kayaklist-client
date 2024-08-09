import ClubKayaksList from "../../components/ClubKayaksList.jsx";
import PrivateKayaksList from "../../components/PrivateKayaksList.jsx";

function KayakListPage() {
  return (
    <div>
      <h1>Home page</h1>
      <ClubKayaksList />
      <PrivateKayaksList />
    </div>
  );
}

export default KayakListPage;
