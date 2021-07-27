import { GetServerSidePropsContext } from "next";
import { Can } from "../components/Can";
import { useAuth } from "../hooks/useAuth";
import { setupAPIClient } from "../services/api";
import { withSSRAuth } from "../utils/withSSRAuth";

export default function Dashboard() {
  const { user, signOut } = useAuth();

  return (
    <>
      <button onClick={signOut}>Sign out</button>
      <Can permissions={['metrics.list']} roles={['administrator']}>
        <h1>Dashboard: {user?.email}</h1>
      </Can>
    </>
  );
}

export const getServerSideProps = withSSRAuth(async (context: GetServerSidePropsContext) => {
  const apiClient = setupAPIClient(context);

  return {
    props: {}
  }
});