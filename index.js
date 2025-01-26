import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 4000;

let posts = [
  {
    id: 1,
    title: "The Rise of Islamic Finance in Saudi Arabia",
    content:
      "Islamic Finance is a cornerstone of Saudi Arabia's financial ecosystem, rooted in Shariah-compliant principles. As the Kingdom diversifies its economy under Vision 2030, Islamic Finance is poised to play a significant role in fostering economic stability and growth. From sukuk (Islamic bonds) to halal investment funds, the sector is innovating to meet the needs of both domestic and global markets.",
    author: "Ali Al-Fahad",
    date: "2023-08-01T10:00:00Z",
  },
  {
    id: 2,
    title: "The Role of Artificial Intelligence in Saudi's Digital Transformation",
    content:
      "Artificial Intelligence (AI) is at the heart of Saudi Arabia's Vision 2030, driving innovation and enhancing government services. From smart cities like NEOM to AI-powered healthcare solutions, the Kingdom is leveraging AI to modernize its industries and improve quality of life. With significant investments in research and development, Saudi Arabia is positioning itself as a leader in AI within the region.",
    author: "Mona Al-Shehri",
    date: "2023-08-05T14:30:00Z",
  },
  {
    id: 3,
    title: "Sustainable Living: Embracing Eco-Friendly Practices in Saudi Arabia",
    content:
      "Sustainability is a key focus in Saudi Arabia as the Kingdom aims to balance economic development with environmental preservation. Initiatives such as the Saudi Green Initiative highlight the nation's commitment to reducing carbon emissions, increasing green cover, and promoting renewable energy. This post explores practical tips for adopting sustainable habits, such as reducing water consumption, minimizing waste, and supporting local eco-friendly businesses.",
    author: "Salman Al-Harbi",
    date: "2023-08-10T09:15:00Z",
  },
];

let lastId = 3;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/posts", (req, res) => {
  console.log(posts);
  res.json(posts);
});

app.get("/posts/:id", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ message: "Post not found" });
  res.json(post);
});

app.post("/posts", (req, res) => {
  const newId = lastId += 1;
  const post = {
    id: newId,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    date: new Date(),
  };
  lastId = newId;
  posts.push(post);
  res.status(201).json(post);
});

app.patch("/posts/:id", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ message: "Post not found" });

  if (req.body.title) post.title = req.body.title;
  if (req.body.content) post.content = req.body.content;
  if (req.body.author) post.author = req.body.author;

  res.json(post);
});

app.delete("/posts/:id", (req, res) => {
  const index = posts.findIndex((p) => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Post not found" });

  posts.splice(index, 1);
  res.json({ message: "Post deleted" });
});

app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});
