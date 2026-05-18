import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Search, ExternalLink, Calendar } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { pageVariants, staggerContainer, staggerItem } from "@/lib/motion"

export default function HealthNews() {
  const [searchQuery, setSearchQuery] = useState("")
  const [newsData, setNewsData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  // Fetch scraped data from backend API
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const apiUrl = import.meta.env.VITE_NEWS_API || "http://localhost:5006/api/news"
        const res = await fetch(apiUrl)
        const data = await res.json()

        // Keep only valid news items
        const validArticles = data.filter(
          (article: any) => article.title && article.description && article.news_url
        )

        setNewsData(validArticles)
      } catch (err) {
        console.error("Error fetching news:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchNews()
  }, [])

  // Filter by search
  const filteredNews = newsData.filter(article =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen bg-background"
    >
      <div className="container py-8 space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold">Health News</h1>
          <p className="text-xl text-muted-foreground">
            Stay informed with the latest medical research, health discoveries, and wellness insights
          </p>
        </div>

        {/* Search Box */}
        <Card>
          <CardContent className="p-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search health news..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* News Grid */}
        {loading ? (
          <p className="text-center text-muted-foreground">Loading news...</p>
        ) : filteredNews.length === 0 ? (
          <Card className="p-8 text-center">
            <div className="space-y-4">
              <div className="text-muted-foreground">
                <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-medium">No articles found</h3>
                <p>Try adjusting your search terms</p>
              </div>
              <Button variant="outline" onClick={() => setSearchQuery("")}>
                Clear Search
              </Button>
            </div>
          </Card>
        ) : (
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredNews.map((article, index) => (
              <motion.div key={index} variants={staggerItem} className="group">
                <Card className="h-full hover-lift shadow-soft overflow-hidden">
                  <CardHeader className="space-y-3">
                    <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors">
                      {article.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <CardDescription className="text-sm leading-relaxed">
                      {article.description}
                    </CardDescription>

                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-3 w-3" />
                        <span>{article.date}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <Button asChild variant="ghost" size="sm" className="h-8 text-xs">
                        <a href={article.news_url} target="_blank" rel="noopener noreferrer">
                          Read More <ExternalLink className="ml-1 h-3 w-3" />
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
