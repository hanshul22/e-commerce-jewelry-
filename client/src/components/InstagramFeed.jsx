const instagramPosts = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400",
    likes: 1234,
    comments: 56
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400",
    likes: 987,
    comments: 43
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1635767798638-3e25273a8236?w=400",
    likes: 2345,
    comments: 89
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400",
    likes: 1567,
    comments: 67
  }
];

function InstagramFeed() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-on-scroll opacity-0">
          <h2 className="font-serif text-4xl mb-4">Follow Our Journey</h2>
          <p className="text-gray-600">@luxejewels on Instagram</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {instagramPosts.map((post, index) => (
            <a
              key={post.id}
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden rounded-xl animate-on-scroll opacity-0"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <img
                src={post.image}
                alt="Instagram Post"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="text-white text-center">
                  <div className="flex items-center gap-4">
                    <span>❤️ {post.likes}</span>
                    <span>💬 {post.comments}</span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default InstagramFeed;