export default async function handler(req, res) {

  const { url } = req.query;

  if (!url) {
    return res.status(400).json({
      success: false,
      message: "Instagram URL required"
    });
  }

  try {

    const api = `https://api.instagram.com/oembed/?url=${encodeURIComponent(url)}`;

    const response = await fetch(api, {
      headers: {
        "user-agent": "Mozilla/5.0"
      }
    });

    const data = await response.json();

    res.status(200).json({
      success: true,
      title: data.title,
      author: data.author_name,
      thumbnail: data.thumbnail_url,
      html: data.html
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      error: error.toString()
    });

  }

}
