import ClubKayaksList from "../../components/ClubKayaksList.jsx";
import PrivateKayaksList from "../../components/PrivateKayaksList.jsx";

function KayakListPage() {
  return (
    <div className="w-full p-4 m-4">
      <ClubKayaksList />
      <PrivateKayaksList />
    </div>
  );
}

export default KayakListPage;
