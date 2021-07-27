import { GetServerSidePropsContext } from "next";
import { useAuth } from "../hooks/useAuth";
import { useCan } from "../hooks/useCan";
import { setupAPIClient } from "../services/api";
import { withSSRAuth } from "../utils/withSSRAuth";

export default function Dashboard() {
  const { user } = useAuth();

  const userCanSeeMetrics = useCan({
    permissions: ['metrics.list']
  });

  return (
    <h1>Dashboard: {user.email}</h1>
  );
}

export const getServerSideProps = withSSRAuth(async (context: GetServerSidePropsContext) => {
  const apiClient = setupAPIClient(context);

  return {
    props: {}
  }
});