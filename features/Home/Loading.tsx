export default function Loading() {
  return (
    <div className="bg-cyan-600 w-full min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center justify-center bg-white px-8 py-16 rounded-2xl w-fit gap-12">
        {/* アニメーションインディケータ */}
        <div className="relative">
          {/* 外側の回転する円 */}
          <div className="w-20 h-20 border-4 border-blue-200 rounded-full animate-spin border-t-blue-600"></div>
          {/* 中央のパルスする円 */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-blue-600 rounded-full animate-pulse"></div>
        </div>

        {/* メッセージ */}
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-gray-800 animate-bounce">採点中...</h2>
          <p className="text-gray-600 text-lg">結果を計算しています。しばらくお待ちください。</p>

          {/* 進行中のドット */}
          <div className="flex justify-center space-x-1 pt-4">
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
