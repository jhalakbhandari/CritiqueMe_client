function UserFeed() {
  const posts = [
    {
      id: 1,
      profileImg: "https://i.pravatar.cc/40?img=1",
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
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="flex flex-col md:flex-row justify-center">
        {/* Left side (1/5) - Add Post button on large screens */}
        <div className="hidden md:flex md:w-1/5 justify-start pr-4">
          <div className="sticky top-8 w-full space-y-1">
            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
              Add Post
            </button>
            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
              See Draft Post
            </button>
          </div>
        </div>

        {/* Center (3/5) - Feed */}
        <div className="w-full md:w-3/5">
          {/* Add Post button for small screens */}
          <div className="block md:hidden mb-4">
            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
              Add Post
            </button>
          </div>

          {/* Scrollable Feed Container */}
          <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-2 hide-scrollbar">
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

        {/* Right side (1/5) - Empty space */}
        <div className="hidden md:block md:w-1/5"></div>
      </div>
    </div>
  );
}

export default UserFeed;
