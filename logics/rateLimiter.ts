import { SupabaseClient } from "@supabase/supabase-js";

// レート制限の設定を一箇所で管理
const RATE_LIMIT_CONFIG = {
  count: 1, // 許可するリクエスト数
  duration: 10, // 期間（秒）
};

// レート制限の結果を伝えるための型定義
type RateLimitResult = {
  success: boolean;
  limit: number; // 現在設定されているリクエスト可能数
  remaining: number; // 残りのリクエスト可能回数
};

/**
 * Supabaseを使用してレート制限をチェックし、ログを記録する関数
 * @param supabase - Supabaseのクライアントインスタンス
 * @param requestIp - リクエストのIPアドレス
 * @returns レート制限の結果オブジェクト
 * @throws DB読み取り中にエラーが発生した場合はエラーをスロー
 */
export async function checkRateLimit(supabase: SupabaseClient, requestIp: string): Promise<RateLimitResult> {
  const { count: limit, duration } = RATE_LIMIT_CONFIG;

  // 1. 期間の開始時刻を計算
  const durationAgo = new Date(Date.now() - duration * 1000).toISOString();

  // 2. 期間内のリクエスト数をカウント
  const { count: currentCount, error: countError } = await supabase
    .from("rate_limit_logs")
    .select("*", { count: "exact", head: true })
    .eq("request_ip", requestIp)
    .gt("created_at", durationAgo);

  if (countError) {
    console.error("DB読みとり中にエラー: ", countError.message);
    throw new Error("DB読みとり中にエラー: " + countError.message);
  }

  // 3. 制限を超えているかチェック
  if (currentCount !== null && currentCount >= limit) {
    return {
      success: false,
      limit,
      remaining: 0,
    };
  }

  // 4. 制限内でなければ、今回のリクエストをログに記録
  // この処理はバックグラウンドで実行される
  supabase
    .from("rate_limit_logs")
    .insert({ request_ip: requestIp })
    .then(({ error: insertError }) => {
      if (insertError) {
        // ログの書き込み失敗はAPIの成功に影響させない
        console.error("Rate limit insert error:", insertError.message);
      }
    });

  const remaining = limit - (currentCount ?? 0) - 1;

  return {
    success: true,
    limit,
    remaining,
  };
}
