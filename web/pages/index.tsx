interface HomeProps {
  count: number;
}

export default function Home(props: HomeProps) {
  return (
    <div className="">
      <h1>Contagem: {props.count}</h1>
    </div>
  );
}

// eslint-disable-next-line @next/next/no-typos
export const getSeverSideProps = async () => {
  const response = await fetch("http://localhost:3333/pools/count");
  const data = await response.json();

  return {
    props: {
      count: data.count,
    },
  };
};

getSeverSideProps();
