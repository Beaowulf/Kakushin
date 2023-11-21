axios
  .get("/api/contentful")
  .then((response) => {
    console.log("Data from Contentful:", response.data);
    const data = response.data;
    displayBlogPosts(data);
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });

function displayBlogPosts(data) {
  const blogContainer = document.getElementById("blog-container");

  data.items.forEach((post) => {
    const postElement = document.createElement("div");
    postElement.className = "blog-post";

    // Image
    const imageUrl = getImageUrl(post, data.includes);
    if (imageUrl) {
      const image = document.createElement("img");
      image.src = `https:${imageUrl}`;
      postElement.appendChild(image);
    }

    // Title
    const title = document.createElement("h2");
    title.textContent = post.fields.title;
    postElement.appendChild(title);

    // Content
    if (
      post.fields.blogBody &&
      post.fields.blogBody.content &&
      post.fields.blogBody.content[0] &&
      post.fields.blogBody.content[0].content
    ) {
      post.fields.blogBody.content[0].content.forEach((textContent) => {
        if (textContent.nodeType === "text") {
          const paragraph = document.createElement("p");
          paragraph.textContent = textContent.value;

          // Check if the text has a bold mark and add the class if it does
          if (
            textContent.marks &&
            textContent.marks.some((mark) => mark.type === "bold")
          ) {
            paragraph.classList.add("text_bold");
          }

          postElement.appendChild(paragraph);
        }
      });
    } else {
      const content = document.createElement("p");
      content.textContent = "Content not available";
      postElement.appendChild(content);
    }

    blogContainer.appendChild(postElement);
  });
}

function getImageUrl(post, includes) {
  if (!post.fields.blogMedia || !includes || !includes.Asset) {
    return null; // or a default image URL
  }
  const imageId = post.fields.blogMedia.sys.id;
  const asset = includes.Asset.find((asset) => asset.sys.id === imageId);
  return asset && asset.fields && asset.fields.file
    ? asset.fields.file.url
    : null; // or a default image URL
}
