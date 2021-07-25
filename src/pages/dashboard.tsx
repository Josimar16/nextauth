import { GetServerSidePropsContext } from "next";
import { useAuth } from "../hooks/Auth";
import { withSSRAuth } from "../utils/withSSRAuth";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <h1>Dashboard: {user.email}</h1>
  );
}

export const getServerSideProps = withSSRAuth(async (context: GetServerSidePropsContext) => {
  return {
    props: {}
  }
});