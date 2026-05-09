<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="3.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:atom="http://www.w3.org/2005/Atom"
                xmlns:dc="http://purl.org/dc/elements/1.1/"
                xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="zh-CN">
      <head>
        <title><xsl:value-of select="/rss/channel/title"/> RSS Feed</title>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <style type="text/css">
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            line-height: 1.6;
            max-width: 800px;
            margin: 0 auto;
            padding: 2rem;
            color: #333;
            background-color: #fafaf8;
          }
          header {
            background-color: #f2f1ea;
            padding: 2rem;
            border-radius: 4px;
            margin-bottom: 2rem;
            border: 1px solid #e6e4dd;
          }
          h1 {
            margin-top: 0;
            font-family: "Tiempos Headline", serif;
            color: #2d2d2d;
          }
          .description {
            color: #666;
            margin-bottom: 1.5rem;
          }
          .copy-box {
            background: #fff;
            padding: 1rem;
            border: 1px solid #ddd;
            border-radius: 4px;
            display: flex;
            align-items: center;
            gap: 1rem;
          }
          .copy-box input {
            flex: 1;
            padding: 0.5rem;
            border: 1px solid #eee;
            border-radius: 4px;
            font-family: monospace;
            background: #f9f9f9;
          }
          .item {
            margin-bottom: 2rem;
            padding-bottom: 2rem;
            border-bottom: 1px solid #eee;
          }
          .item h3 {
            margin-bottom: 0.5rem;
            font-family: "Tiempos Headline", serif;
          }
          .item h3 a {
            color: #2d2d2d;
            text-decoration: none;
          }
          .item h3 a:hover {
            text-decoration: underline;
            color: #d97757;
          }
          .item-meta {
            font-size: 0.85rem;
            color: #888;
            margin-bottom: 0.5rem;
            font-family: monospace;
          }
        </style>
      </head>
      <body>
        <header>
          <h1>RSS 订阅预览</h1>
          <p class="description">
            这是一个 RSS 订阅文件。你可以复制下面的链接，粘贴到任何 RSS 阅读器中来订阅我的博客。
          </p>
          <div class="copy-box">
            <span>订阅链接:</span>
            <input type="text" value="{/rss/channel/link}/rss.xml" readonly="readonly" onclick="this.select()"/>
          </div>
        </header>
        
        <main>
          <h2>最新文章</h2>
          <xsl:for-each select="/rss/channel/item">
            <div class="item">
              <h3>
                <a href="{link}" target="_blank">
                  <xsl:value-of select="title"/>
                </a>
              </h3>
              <div class="item-meta">
                发布于: <xsl:value-of select="pubDate"/>
              </div>
              <p>
                <xsl:value-of select="description"/>
              </p>
            </div>
          </xsl:for-each>
        </main>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
