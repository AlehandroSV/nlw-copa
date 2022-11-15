interface HomeProps {
  poolCount: number;
  guessCount: number;
  userCount: number;
}

// Libs
import { api } from "../lib/axios";
import { FormEvent, useState } from "react";
import Image from "next/image";

// IMGs/Icons
import appPreviewImg from "../assets/app-nlw-copa-preview.png";
import logoImg from "../assets/logo.svg";
import userAvataresExamplesImg from "../assets/avatares.png";
import iconCheckImg from "../assets/check-icon.svg";

export default function Home(props: HomeProps) {
  const [poolTitle, setPoolTitle] = useState("");

  async function createPool(e: FormEvent) {
    e.preventDefault();

    try {
      const response = api.post("/pools", {
        title: poolTitle,
      });

      const { code } = (await response).data;

      await navigator.clipboard.writeText(code);

      alert(
        "Bolão criado com sucesso, o código foi copiado para a área de transferência!"
      );
      setPoolTitle("");
    } catch (erro) {
      console.log(erro);
      alert("Falha a criar bolão");
    }
  }

  return (
    <div className="max-w-[1124px] h-screen mx-auto grid grid-cols-2 gap-28 items-center">
      <main>
        <Image src={logoImg} alt="NLW Copa" />

        <h1 className="mt-14 text-white text-5xl font-bold leading-tight">
          Crie seu próprio bolão da copa e compartilhe entre amigos!
        </h1>

        <div className="mt-10 flex items-center gap-2">
          <Image src={userAvataresExamplesImg} alt="" />
          <strong className="text-gray-100 text-xl">
            <span className="text-ignite-500">+{props.userCount}</span> pessoas
            já estão usando
          </strong>
        </div>

        <form onSubmit={createPool} className="mt-10 flex gap-2">
          <input
            className="flex-1 px-6 py-4 rounded bg-gray-800 border border-gray-600 text-sm text-gray-100"
            type="text"
            required
            placeholder="Qual nome do seu bolão?"
            onChange={(e) => setPoolTitle(e.target.value)}
            value={poolTitle}
          />
          <button
            type="submit"
            className="bg-nlw-500 px-6 py-4 rounded font-bold text-gray-900 text-sm uppercase hover:bg-nlw-700"
          >
            Criar meu bolão
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-300 leading-relaxed">
          Após criar seu bolão, você receberá um código único que poderá usar
          para convidar outras pessoas 🚀
        </p>

        <div className="mt-10 pt-10 border-t border-gray-600 flex justify-between text-gray-100 items-center">
          <div className="flex items-center gap-6">
            <Image src={iconCheckImg} alt="" />
            <div className="flex flex-col">
              <span className="font-bold text-xl">+{props.poolCount}</span>
              <span>Bolões criados</span>
            </div>
          </div>

          <div className="w-px h-14 bg-gray-600"></div>

          <div className="flex items-center gap-6">
            <Image src={iconCheckImg} alt="" />
            <div className="flex flex-col">
              <span className="font-bold text-xl">+{props.guessCount}</span>
              <span>Palpites enviados</span>
            </div>
          </div>
        </div>
      </main>

      <Image
        src={appPreviewImg}
        alt="Dois celulares exibindo uma prévia da aplicação"
        quality={100}
      />
    </div>
  );
}

export const getServerSideProps = async () => {
  const [poolCountResponse, guessesCountResponse, usersCountResponse] =
    await Promise.all([
      api.get("pools/count"),
      api.get("guesses/count"),
      api.get("users/count"),
    ]);

  return {
    props: {
      poolCount: poolCountResponse.data.count,
      guessCount: guessesCountResponse.data.count,
      userCount: usersCountResponse.data.count,
    },
  };
};
