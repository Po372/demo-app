"use client";

import Link from "next/link";
import Form from "next/form";
import { useRouter } from "next/navigation";

export default function UserName() {
  const router = useRouter();

  return (
    <div className="bg-cyan-600 min-h-screen flex flex-col items-center justify-center relative font-sans">
      <div className="bg-white rounded-2xl p-6 shadow-xl w-[350px] text-center">
        <h1 className="text-2xl font-bold mb-4">ユーザー名を入力</h1>
        <p className="text-gray-600 mb-6">あなたの名前を入力してください。</p>
        <Form action={(formData: FormData) => {
          const userName = formData.get("userName"); // ここでユーザー名を取得
          localStorage.setItem("userName", userName as string); // ローカルストレージに保存
          router.push("/"); // 次のページに遷移
        }}>
          <input
            type="text"
            name="userName"
            placeholder="例: 山田太郎"
            className="border border-gray-300 rounded-md px-4 py-2 w-full mb-4"
          />
          <button
            onClick={() => {}}
            className="bg-cyan-700 hover:bg-cyan-500 transition-colors duration-200 rounded-full w-full h-12 text-white font-semibold"
          >
            次へ
          </button>
        </Form>
      </div>
      <Link href="/">
        <button className="absolute top-4 left-4 bg-gray-200 hover:bg-gray-300 transition-colors duration-200 rounded-full w-10 h-10 flex items-center justify-center shadow-md">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#333">
            <path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z" />
          </svg>
        </button>
      </Link>
    </div>
  );
}
