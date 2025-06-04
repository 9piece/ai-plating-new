
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { prompt } = req.body;

  try {
    const response = await fetch("https://ark.cn-beijing.volces.com/api/v3/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer 0bce1539-21ee-486d-acdd-95ecc559e984"  // 
      },
      body: JSON.stringify({
        endpoint_id: "ep-20250603194600-lxnmn",
        inputs: {
          prompt,
        }
      })
    });

    const data = await response.json();
    const imageUrl = data?.output?.image_url || null;

    if (imageUrl) {
      res.status(200).json({ image: imageUrl });
    } else {
      res.status(500).json({ error: "生成失败：未返回图片链接", detail: data });
    }
  } catch (error) {
    res.status(500).json({ error: "接口错误", detail: error.message });
  }
}
