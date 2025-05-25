function HomePage() {
  // Updated posts with title, description, and link
  const posts = [
    {
      id: 1,
      profileImg: "https://i.pravatar.cc/40?img=1", // placeholder avatar
      title: "John Doe",
      description: "This is the description for Post 1. Check out this link!",
      link: "https://example.com/post1",
    },
    {
      id: 2,
      profileImg: "https://i.pravatar.cc/40?img=2",
      title: "Jane Smith",
      description: "Another interesting post description goes here.",
      link: "https://example.com/post2",
    },
    {
      id: 3,
      profileImg: "https://i.pravatar.cc/40?img=3",
      title: "Alex Johnson",
      description: "Yet another post with a link to something cool.",
      link: "https://example.com/post3",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100  flex justify-center py-8">
      {/* Container with margins on large screen, full width on small */}
      <div className="w-full max-w-4xl px-4 md:px-0 md:w-3/5">
        {/* Feed container */}
        <div className="space-y-6">
          {posts.map(({ id, profileImg, title, description, link }) => (
            <div
              key={id}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
            >
              <div className="flex items-center mb-4">
                <img
                  src={profileImg}
                  alt={`${title} profile`}
                  className="w-10 h-10 rounded-full mr-3"
                />
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {title}
                </h2>
              </div>
              <p className="text-gray-800 dark:text-gray-200 mb-3">
                {description}
              </p>
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Read more
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
